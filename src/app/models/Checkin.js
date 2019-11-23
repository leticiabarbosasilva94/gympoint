import { Model } from 'sequelize';

export default class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student'
    });
  }
}
