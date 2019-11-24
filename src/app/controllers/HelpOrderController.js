import ControllerBase from './ControllerBase';

class HelpOrderController extends ControllerBase {
  async index(req, res) {
    res.json('Implemented');
  }
}

export default new HelpOrderController();
