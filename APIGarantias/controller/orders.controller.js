const {Order, OrderHasDrink, Drink, sequelize, User} = require('./../model');
const {validationResult} = require('express-validator');

let save = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      error: errors.array(),
    });
  }
  let transaction = null;
  try {
    transaction = await sequelize.transaction();
    let user_id = req.user.id;
    let {tip, subtotal, total, drinks} = req.body;

    let order = await Order.create({tip, subtotal, total, user_id});
    await OrderHasDrink.bulkCreate([
      ...drinks.map((e) => ({...e, order_id: order.id})),
    ]);

    await transaction.commit();
    return res.status(200).json({
      status: true,
      data: order,
    });
  } catch (ex) {
    transaction.rollback();
    return res.status(500).json({
      status: false,
      error: ex.message,
    });
  }
};

let index = async (req, res) => {
  let orders = await Order.findAll({
    include: [{model: OrderHasDrink, include: [Drink]}, {model: User}],
  });
  return res.status(200).json({
      status: true,
      data: orders
  });
};

module.exports = {
  save,
  index
};
