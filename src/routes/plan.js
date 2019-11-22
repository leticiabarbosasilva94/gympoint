import express from 'express';
import PlanController from '../app/controllers/PlanController';
import authMiddleware from '../app/middlewares/auth';

const { Router } = express;
const router = new Router();

// For Administrators only
router.use(authMiddleware);

router.get('/', PlanController.index);

export default router;
