const {Sequelize, DataTypes} = require('sequelize');
const UserModel = require('./user.js');
const DrinkModel = require('./drink.js');
const OrderModel = require('./order.js');
const OrderHasDrinkModel = require('./order_has_drink.js');

const sequelize = new Sequelize(process.env.MYSQL, {
  define: {
    timestamps: false,
  },
});

const User = UserModel(sequelize, DataTypes, Sequelize);
const Drink = DrinkModel(sequelize, DataTypes, Sequelize);
const Order = OrderModel(sequelize, DataTypes, Sequelize);
const OrderHasDrink = OrderHasDrinkModel(sequelize, DataTypes, Sequelize);

User.hasMany(Order, {foreignKey: 'user_id'});
Order.belongsTo(User, {foreignKey: 'user_id'});
Order.hasMany(OrderHasDrink, {foreignKey: 'order_id'});
Drink.hasMany(OrderHasDrink, {foreignKey: 'drink_id'});
OrderHasDrink.belongsTo(Order, {foreignKey: 'order_id'});
OrderHasDrink.belongsTo(Drink, {foreignKey: 'drink_id'});

module.exports = {
  User,
  Drink,
  Order,
  OrderHasDrink,
  sequelize,
};
