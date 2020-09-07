const redis = require('redis');
const JWTR = require('jwt-redis').default;

const auth = async (req, res, next) => {
  const Authorization = req.get('Authorization');
  let redisClient = redis.createClient();
  let jwtr = new JWTR(redisClient);

  try {
    let user = await jwtr.verify(Authorization, process.env.SECRET);
    if (user) {
      req.user = user;
      return next();
    }
  } catch (ex) {
    console.log(ex);
  }
  return res.status(401).json({
    status: false,
    data: 'Token no valido',
  });
};

module.exports = {
  auth,
};
