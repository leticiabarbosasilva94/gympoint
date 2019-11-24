import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';
import ControllerBase from './ControllerBase';

class CheckinController extends ControllerBase {
  async index(req, res) {
    try {
      const { student_id } = req.params;

      if (!Number(student_id)) return this.error(req, res, 'Missing ID.');

      const student = await Student.findByPk(student_id);

      if (!student) return this.error(req, res, 'Student do not exists.');

      const checkins = await Checkin.findAll({
        where: {
          student_id
        },
        order: [['id', 'DESC']]
      });

      return res.json(checkins);
    } catch (e) {
      return this.error(
        req,
        res,
        e.errors.map(err => `${err.path}: ${err.message}`)
      );
    }
  }

  async store(req, res) {
    try {
      const { student_id } = req.params;

      if (!Number(student_id)) return this.error(req, res, 'Missing ID.');

      const student = await Student.findByPk(student_id);

      if (!student) return this.error(req, res, 'Student do not exists.');

      const checkins = await Checkin.count({
        where: {
          student_id,
          created_at: {
            [Op.between]: [subDays(new Date(), 7), new Date()]
          }
        }
      });

      if (checkins >= 5) return this.error(req, res, 'Checkin limit reached');

      const checkin = await Checkin.create({ student_id });
      return res.json(checkin);
    } catch (e) {
      return this.error(
        req,
        res,
        e.errors.map(err => `${err.path}: ${err.message}`)
      );
    }
  }
}

export default new CheckinController();
