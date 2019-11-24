import ControllerBase from './ControllerBase';
import HelpOrder from '../models/HelpOrder';

class HelpOrderNoAnswerController extends ControllerBase {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
        answer_at: null
      },
      order: [['id', 'desc']]
    });
    res.json(helpOrders);
  }
}

export default new HelpOrderNoAnswerController();
