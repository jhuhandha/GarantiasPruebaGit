const {User} = require('./../model');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const redis = require('redis');
const JWTR = require('jwt-redis').default;

const list = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ['id', 'name', 'username', 'role'],
    });
    res.json({
      status: true,
      data: users,
    });
  } catch (ex) {
    res.json({
      status: true,
      data: ex.Message,
    });
  }
};

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      error: errors.array(),
    });
  }

  let {body} = req;
  try {
    let user = await User.create({
      name: body.name,
      username: body.username,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role,
    });
    return res.status(200).json({
      status: true,
      data: user.toJSON(),
    });
  } catch (ex) {
    return res.status(500).json({
      status: false,
      error: ex,
    });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      error: errors.array(),
    });
  }

  let {body} = req;
  try {
    let result = await User.findOne({
      where: {username: body.username},
    });
    if (!result) {
      return res.status(500).json({
        status: false,
        error: 'El usuario o clave no estan registrados en la base de datos',
      });
    }
    let {id, name, username, password, role} = result;

    if (!bcrypt.compareSync(body.password, password)) {
      return res.status(500).json({
        status: false,
        error: 'El usuario o clave no estan registrados en la base de datos',
      });
    }

    let redisClient = redis.createClient();
    let jwtr = new JWTR(redisClient);
    let token = await jwtr.sign(
      {
        id,
        name,
        username,
        role,
        jti: `data-${id}`,
      },
      process.env.SECRET,
      {expiresIn: '12h'}
    );

    return res.status(200).json({
      status: true,
      data: token,
    });
  } catch (ex) {
    return res.status(500).json({
      status: false,
      error: ex,
    });
  }
};

const logout = async (req, res) => {
  let redisClient = redis.createClient();
  let jwtr = new JWTR(redisClient);
  await jwtr.destroy(req.user.jti);
  return res.status(200).json({
    status: true,
  });
};

module.exports = {
  list,
  create,
  login,
  logout,
};
