module.exports = (sequelize, type, Sequelize) =>
  sequelize.define(
    'drink',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING(45),
      icon: type.STRING,
      unit_price: type.FLOAT,
    },
    {
      type,
      engine: 'InnoDB',
    }
  );
