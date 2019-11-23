import { isValid, isBefore, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import ControllerBase from './ControllerBase';

class RegistrationController extends ControllerBase {
  startDateValidation(date) {
    if (!isValid(date)) return false;

    if (isBefore(date, new Date())) {
      return false;
    }

    return true;
  }

  async index(req, res) {
    res.json(true);
  }

  async store(req, res) {
    const start_date = new Date(req.body.start_date);
    const { plan_id, student_id } = req.body;

    if (!plan_id || !student_id) return this.error(req, res, 'Missing data');

    if (!this.startDateValidation(start_date)) {
      return this.error(req, res, 'Invalid start date.');
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) return this.error(req, res, 'Plan do not exists.');

    const student = await Student.findByPk(student_id);

    if (!student) return this.error(req, res, 'Student do not exists.');

    const end_date = addMonths(start_date, plan.duration);

    const registrationData = {
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.total_price
    };

    const registration = await Registration.create(registrationData);

    return res.json(registration);
  }

  async show(req, res) {
    res.json(true);
  }

  async update(req, res) {
    res.json(true);
  }

  async delete(req, res) {
    res.json(true);
  }
}

export default new RegistrationController();
