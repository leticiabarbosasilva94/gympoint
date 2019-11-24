import express from 'express';
import HelpOrderController from '../app/controllers/HelpOrderController';
import HelpOrderNoAnswerController from '../app/controllers/HelpOrderNoAnswerController';
import authMiddleware from '../app/middlewares/auth';

const { Router } = express;
const router = new Router();

// Only logged users bellow
router.use(authMiddleware);

router.post('/:id', HelpOrderController.store);
router.get('/no-answer', HelpOrderNoAnswerController.index);

export default router;
