import express from 'express';
import StudentsController from '../app/controllers/StudentsController';
import authMiddleware from '../app/middlewares/auth';

const { Router } = express;
const router = new Router();

router.get('/', StudentsController.index);

// Only logged users bellow
router.use(authMiddleware);

router.post('/', StudentsController.store);

export default router;
