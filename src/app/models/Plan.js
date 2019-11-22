import Sequelize, { Model } from 'sequelize';

export default class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 100],
              msg: 'Plans have to have between 3 to 100 characters.'
            }
          }
        },
        duration: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Empty values not allowed'
            },
            isInt: {
              msg: 'Only integer values allowed'
            }
          }
        },
        price: {
          type: Sequelize.DECIMAL(6, 2),
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Empty values not allowed'
            },
            isDecimal: {
              msg: 'Please, use a decimal value for price'
            },
            max: {
              args: [9999.99],
              msg: 'Max value allowed is 9999.99'
            }
          }
        },
        total_price: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.price * this.duration;
          }
        }
      },
      {
        sequelize
      }
    );

    return this;
  }
}
