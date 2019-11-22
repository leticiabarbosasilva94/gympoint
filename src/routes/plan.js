import express from 'express';
import PlanController from '../app/controllers/PlanController';
import authMiddleware from '../app/middlewares/auth';

const { Router } = express;
const router = new Router();

// For Administrators only
router.use(authMiddleware);

router.get('/', PlanController.index);
router.post('/', PlanController.store);
router.put('/:id', PlanController.update);
router.get('/:id', PlanController.show);
router.delete('/:id', PlanController.delete);

export default router;
