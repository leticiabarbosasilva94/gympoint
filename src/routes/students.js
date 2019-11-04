import express from 'express';
import StudentsController from '../app/controllers/StudentsController';

const { Router } = express;
const router = new Router();

router.get('/', StudentsController.index);

export default router;
