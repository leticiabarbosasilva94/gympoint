import Sequelize, { Model } from 'sequelize';

export default class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        question: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [5, 255],
              msg: 'Questions must have between 5 and 255 characters'
            }
          }
        },
        answer: {
          type: Sequelize.STRING,
          defaultValue: null
        },
        answer_at: {
          type: Sequelize.DATE,
          defaultValue: null
        }
      },
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
