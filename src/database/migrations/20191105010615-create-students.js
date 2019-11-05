module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      peso: {
        type: Sequelize.FLOAT(3, 2),
        allowNull: false
      },
      altura: {
        type: Sequelize.FLOAT(3, 2),
        allowNull: false
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('students');
  }
};
