import ControllerBase from './ControllerBase';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class StudentHelpController extends ControllerBase {
  async store(req, res) {
    try {
      const { student_id } = req.params;

      if (!student_id || !Number(student_id)) {
        return this.error(req, res, 'Missing ID');
      }

      const student = await Student.findByPk(student_id);
      if (!student) return this.error(req, res, 'Student do not exists');

      const { question } = req.body;

      const helpOrder = await HelpOrder.create({
        student_id,
        question
      });

      return res.json(helpOrder);
    } catch (e) {
      return this.error(req, res, e.errors.map(er => er.message));
    }
  }
}

export default new StudentHelpController();
