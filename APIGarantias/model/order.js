module.exports = (sequelize, type, Sequelize) =>
  sequelize.define(
    'order',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: type.DATE,
        defaultValue: Sequelize.NOW,
      },
      tip: type.STRING(15),
      subtotal: type.FLOAT,
      total: type.FLOAT,
      user_id: {
        type: type.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      type,
      engine: 'InnoDB',
    }
  );
