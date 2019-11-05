import Student from '../models/Student';

class StudentsController {
  index(req, res) {
    res.send('Students controller');
  }

  store(req, res) {
    res.send('Hello world!');
  }
}

export default new StudentsController();
