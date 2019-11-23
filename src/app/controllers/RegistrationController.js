import { isValid, isBefore, addMonths } from 'date-fns';
import { Op } from 'sequelize';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import ControllerBase from './ControllerBase';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController extends ControllerBase {
  startDateValidation(date) {
    if (!isValid(date)) return false;

    if (isBefore(date, new Date())) {
      return false;
    }

    return true;
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const limit = Number(process.env.PAGINATION_LIMIT);

      if (!Number(page) || !limit) {
        return this.error(req, res, 'Invalid page or pagination number');
      }

      const registrations = await Registration.findAll({
        limit,
        offset: (page - 1) * limit
      });

      return res.json(registrations);
    } catch (e) {
      return this.error(req, res, e.errors.map(err => err.message));
    }
  }

  async store(req, res) {
    try {
      const start_date = new Date(req.body.start_date);
      const { plan_id, student_id } = req.body;

      // Checking data before doing SQL queries
      if (!plan_id || !student_id) return this.error(req, res, 'Missing data');

      if (!this.startDateValidation(start_date)) {
        return this.error(req, res, 'Invalid start date.');
      }

      const plan = await Plan.findByPk(plan_id);
      if (!plan) return this.error(req, res, 'Plan do not exists.', 404);

      const student = await Student.findByPk(student_id);
      if (!student) return this.error(req, res, 'Student do not exists.', 404);

      // Add duration to start date
      const end_date = addMonths(start_date, plan.duration);

      // Checks if the student has a valid registration
      const alreadyRegistered = await Registration.findOne({
        where: {
          end_date: {
            [Op.gte]: start_date
          }
        },
        order: [['id', 'DESC']],
        limit: 1
      });

      if (alreadyRegistered) {
        return this.error(req, res, 'Student has an active registration.', 400);
      }

      const registrationData = {
        plan_id,
        student_id,
        start_date,
        end_date,
        price: plan.total_price
      };

      const registration = await Registration.create(registrationData);

      await Queue.add(RegistrationMail.key, {
        subject: 'Matricula criada',
        mailText: 'Sua matricula foi criada.',
        student,
        plan,
        start_date,
        end_date,
        price: plan.total_price
      });

      return res.json(registration);
    } catch (e) {
      return this.error(req, res, e.errors.map(err => err.message));
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!Number(id)) {
        return this.error(req, res, 'Invalid ID');
      }

      const registration = await Registration.findByPk(id);

      if (!registration) {
        return this.error(req, res, 'Registration do not exists.', 404);
      }

      return res.json(registration);
    } catch (e) {
      return this.error(req, res, e.errors.map(err => err.message));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const start_date = new Date(req.body.start_date);
      const { plan_id, student_id } = req.body;

      if (!Number(id)) {
        return this.error(req, res, 'Invalid ID');
      }

      if (!this.startDateValidation(start_date)) {
        return this.error(req, res, 'Invalid start date.');
      }

      const registration = await Registration.findByPk(id);

      if (!registration) {
        return this.error(req, res, 'Registration do not exists.', 404);
      }

      const plan = await Plan.findByPk(plan_id);
      if (!plan) return this.error(req, res, 'Plan do not exists.', 404);

      const student = await Student.findByPk(student_id);
      if (!student) return this.error(req, res, 'Student do not exists.', 404);

      // Add duration to start date
      const end_date = addMonths(start_date, plan.duration);

      const registrationData = {
        plan_id,
        student_id,
        start_date,
        end_date,
        price: plan.total_price
      };

      const newRegistration = await registration.update(registrationData);

      await Queue.add(RegistrationMail.key, {
        subject: 'Matricula atualizada',
        mailText: 'Sua matricula foi atualizada.',
        student,
        plan,
        start_date,
        end_date,
        price: plan.total_price
      });

      return res.json(newRegistration);
    } catch (e) {
      return this.error(req, res, e.errors.map(err => err.message));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!Number(id)) {
        return this.error(req, res, 'Invalid ID');
      }

      const registration = await Registration.findByPk(id);

      if (!registration) {
        return this.error(req, res, 'Registration do not exists.', 404);
      }

      registration.destroy();

      return res.json(null);
    } catch (e) {
      return this.error(req, res, e.errors.map(err => err.message));
    }
  }
}

export default new RegistrationController();
