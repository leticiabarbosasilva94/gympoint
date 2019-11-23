import Sequelize, { Model } from 'sequelize';

export default class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: {
          type: Sequelize.DATE,
          defaultValue: '',
          validate: {
            isDate: {
              msg: 'Invalid date'
            }
          }
        },
        end_date: {
          type: Sequelize.DATE,
          defaultValue: '',
          validate: {
            isDate: {
              msg: 'Invalid date'
            }
          }
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: '',
          validate: {
            isDecimal: {
              msg: 'Incorrect price value'
            }
          }
        }
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}
