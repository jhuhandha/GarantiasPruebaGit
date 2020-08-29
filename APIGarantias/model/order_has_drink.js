module.exports = (sequelize, type, Sequelize) =>
  sequelize.define(
    'order_has_drink',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: type.INTEGER,
        reference: {
          model: 'orders',
          key: 'id',
        },
      },
      drink_id: {
        type: type.INTEGER,
        reference: {
          model: 'drinks',
          key: 'id',
        },
      },
      amount: type.INTEGER,
      subtotal: type.FLOAT,
    },
    {
      type,
      engine: 'InnoDB',
    }
  );
