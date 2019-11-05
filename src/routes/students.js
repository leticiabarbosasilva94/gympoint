import express from 'express';
import StudentsController from '../app/controllers/StudentsController';
import authMiddleware from '../app/middlewares/auth';

const { Router } = express;
const router = new Router();

router.get('/', StudentsController.index);
router.get('/:id', StudentsController.show);

// Only logged users bellow
router.use(authMiddleware);

router.post('/', StudentsController.store);
router.put('/:id', StudentsController.update);
router.delete('/:id', StudentsController.delete);

export default router;
