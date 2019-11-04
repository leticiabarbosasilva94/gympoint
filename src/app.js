import express from 'express';
import homeRoutes from './routes/home';
import studentsRoutes from './routes/students';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/students', studentsRoutes);
  }
}

export default new App().app;
