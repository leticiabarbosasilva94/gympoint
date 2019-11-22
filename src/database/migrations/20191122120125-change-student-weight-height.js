module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('students', 'peso', {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false
      }),
      queryInterface.changeColumn('students', 'altura', {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('students', 'peso', {
        type: Sequelize.FLOAT,
        allowNull: false
      }),
      queryInterface.changeColumn('students', 'altura', {
        type: Sequelize.FLOAT,
        allowNull: false
      })
    ]);
  }
};
