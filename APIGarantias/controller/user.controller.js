const {User} = require('./../model');

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

module.exports = {
  list,
};
