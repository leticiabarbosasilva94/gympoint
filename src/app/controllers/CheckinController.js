import Checkin from '../models/Checkin';
import ControllerBase from './ControllerBase';

class CheckinController extends ControllerBase {
  async index(req, res) {
    try {
      await Checkin.create({ student_id: 6 });
      return res.json(true);
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
      await Checkin.create({ student_id: 6 });
      return res.json(true);
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
