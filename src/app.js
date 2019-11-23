import express from 'express';
import homeRoutes from './routes/home';
import studentsRoutes from './routes/students';
import sessionRoutes from './routes/session';
import planRoutes from './routes/plan';
import registrationRoutes from './routes/registration';
// Moved to students
// import checkinRoutes from './routes/chekin';

import './database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use((err, req, res, next) => {
      if (err) return res.status(400).json({ errors: ['Bad request'] });
      return next();
    });
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/session', sessionRoutes);
    this.app.use('/students', studentsRoutes);
    this.app.use('/plans', planRoutes);
    this.app.use('/registration', registrationRoutes);
    // Moved to students
    // this.app.use('/checkins', checkinRoutes);
  }
}

export default new App().app;
