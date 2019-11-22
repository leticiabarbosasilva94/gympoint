import Plan from '../models/Plan';
import ControllerBase from './ControllerBase';

class PlanController extends ControllerBase {
  async index(req, res) {
    try {
      const plans = await Plan.findAll();
      return res.json(plans);
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
      const plan = await Plan.create(req.body);
      return res.send(plan);
    } catch (e) {
      return this.error(
        req,
        res,
        e.errors.map(err => `${err.path}: ${err.message}`)
      );
    }
  }

  async update(req, res) {
    try {
      const id = Number(req.params.id);
      if (!id) return this.error(req, res, 'ID must be integer');

      const plan = await Plan.findByPk(id);
      if (!plan) return this.error(req, res, 'Plan do not exists');
      plan.update(req.body);

      return res.json(200, plan);
    } catch (e) {
      return this.error(
        req,
        res,
        e.errors.map(err => `${err.path}: ${err.message}`)
      );
    }
  }

  async show(req, res) {
    try {
      const id = Number(req.params.id);
      if (!id) return this.error(req, res, 'ID must be integer');

      const plan = await Plan.findByPk(id);
      if (!plan) return this.error(req, res, 'Plan do not exists');

      return res.json(200, plan);
    } catch (e) {
      return this.error(
        req,
        res,
        e.errors.map(err => `${err.path}: ${err.message}`)
      );
    }
  }

  async delete(req, res) {
    try {
      const id = Number(req.params.id);
      if (!id) return this.error(req, res, 'ID must be integer');

      const plan = await Plan.findByPk(id);
      if (!plan) return this.error(req, res, 'Plan do not exists');
      plan.destroy();

      return res.json(200, null);
    } catch (e) {
      return this.error(
        req,
        res,
        e.errors.map(err => `${err.path}: ${err.message}`)
      );
    }
  }
}

export default new PlanController();
