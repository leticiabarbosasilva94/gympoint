import express from 'express';
import StudentsController from '../app/controllers/StudentsController';
import CheckinController from '../app/controllers/CheckinController';
import StudentHelpController from '../app/controllers/StudentHelpController';

import authMiddleware from '../app/middlewares/auth';

const { Router } = express;
const router = new Router();

// Checkin routes
router.post('/:student_id/checkins', CheckinController.store);
router.get('/:student_id/checkins', CheckinController.index);

// Help Orders
router.post('/:student_id/help-orders', StudentHelpController.store);
router.get('/:student_id/help-orders', StudentHelpController.index);

// Only logged users bellow
router.use(authMiddleware);

// Student Routes
router.get('/', StudentsController.index);
router.get('/:id', StudentsController.show);
router.post('/', StudentsController.store);
router.put('/:id', StudentsController.update);
router.delete('/:id', StudentsController.delete);

export default router;
