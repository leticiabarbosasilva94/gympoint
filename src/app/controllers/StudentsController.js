import Student from '../models/Student';

class StudentsController {
  async index(req, res) {
    const students = await Student.findAll();
    res.json(students);
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ['Missing student ID'] });
      }

      const student = await Student.findOne({ where: { id: req.params.id } });

      if (!student) {
        return res.status(400).json({ errors: ['Student do not exists'] });
      }

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => `${err.path}: ${err.message}`)
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ['Missing student ID'] });
      }

      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(400).json({ errors: ['Student do not exists'] });
      }

      const destroyedStudent = student.destroy();
      return res.json(destroyedStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => `${err.path}: ${err.message}`)
      });
    }
  }

  async store(req, res) {
    try {
      const studentStored = await Student.create(req.body);
      return res.send(studentStored);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => `${err.path}: ${err.message}`)
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ['Missing student ID'] });
      }

      const student = await Student.findOne({ where: { id: req.params.id } });

      if (!student) {
        return res.status(400).json({ errors: ['Student do not exists'] });
      }

      const updatedStudent = await student.update(req.body);

      return res.json(updatedStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => `${err.path}: ${err.message}`)
      });
    }
  }
}

export default new StudentsController();
