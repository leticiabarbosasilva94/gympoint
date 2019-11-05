import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        peso: Sequelize.FLOAT(3, 2),
        altura: Sequelize.FLOAT(3, 2),
        idade: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
  }
}
