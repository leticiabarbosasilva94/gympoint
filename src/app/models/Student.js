import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Empty value not allowed'
            }
          }
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'E-mail already exists'
          },
          validate: {
            notEmpty: {
              msg: 'Empty value not allowed'
            },
            isEmail: {
              msg: 'E-mail invalid'
            }
          }
        },
        peso: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Empty value not allowed'
            },
            isFloat: {
              msg: 'Must be float'
            }
          }
        },
        altura: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Empty value not allowed'
            },
            isFloat: {
              msg: 'Must be float'
            }
          }
        },
        idade: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Empty value not allowed'
            },
            isInt: {
              msg: 'Must be int.'
            }
          }
        }
      },
      {
        sequelize
      }
    );
  }
}
