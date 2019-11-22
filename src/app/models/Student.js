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
              msg: 'Weight must be float'
            },
            max: {
              args: [635],
              msg: 'The heaviest person in the world weighs 635kg. Fix this.'
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
              msg: 'Height must be float'
            },
            max: {
              args: [2.51],
              msg: 'The tallest person in the world is 2.51m tall. Fix this.'
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
