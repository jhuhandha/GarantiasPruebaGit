module.exports = (sequelize, type, Sequelize) =>
  sequelize.define(
    'user',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING(60),
      username: type.STRING(45),
      password: type.STRING,
      role: type.STRING(10),
    },
    {
      type,
      engine: 'InnoDB',
    }
  );
