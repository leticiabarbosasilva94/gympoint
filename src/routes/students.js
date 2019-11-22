import express from 'express';
import StudentsController from '../app/controllers/StudentsController';
import authMiddleware from '../app/middlewares/auth';

const { Router } = express;
const router = new Router();

// Only logged users bellow
router.use(authMiddleware);

router.get('/', StudentsController.index);
router.get('/:id', StudentsController.show);
router.post('/', StudentsController.store);
router.put('/:id', StudentsController.update);
router.delete('/:id', StudentsController.delete);

export default router;
