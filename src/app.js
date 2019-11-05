import express from 'express';
import homeRoutes from './routes/home';
import studentsRoutes from './routes/students';
import sessionRoutes from './routes/session';

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
    this.app.use('/students', studentsRoutes);
    this.app.use('/session', sessionRoutes);
  }
}

export default new App().app;
