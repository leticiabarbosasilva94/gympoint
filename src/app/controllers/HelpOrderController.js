import ControllerBase from './ControllerBase';
import HelpOrder from '../models/HelpOrder';
import Queue from '../../lib/Queue';
import Student from '../models/Student';
import HelpOrderMail from '../jobs/HelpOrderMail';

class HelpOrderController extends ControllerBase {
  async store(req, res) {
    try {
      const { id } = req.params;

      if (!Number(id)) return this.error(req, res, 'Missing ID');

      const helpOrder = await HelpOrder.findByPk(id, {
        include: {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        }
      });
      if (!helpOrder) return this.error(req, res, 'Order do not exists', 404);

      const { answer } = req.body;
      if (!answer) return this.error(req, res, 'No answer provided', 400);

      // if (helpOrder.answer !== null) {
      //   return this.error(req, res, 'Help order is already answered', 400);
      // }

      const helpOrderAnswer = await helpOrder.update({
        answer,
        answer_at: new Date()
      });

      await Queue.add(HelpOrderMail.key, {
        subject: 'Pergunta respondida',
        mailText: 'Sua pergunta foi respondida.',
        student: helpOrder.student,
        question: helpOrder.question,
        answer
      });

      return res.json(helpOrderAnswer);
    } catch (e) {
      return this.error(req, res, e.errors.map(err => `${err.message}`));
    }
  }
}

export default new HelpOrderController();
