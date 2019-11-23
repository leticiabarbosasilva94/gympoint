import express from 'express';
import RegistrationController from '../app/controllers/RegistrationController';

const { Router } = express;
const router = new Router();

router.get('/', RegistrationController.index);
router.post('/', RegistrationController.store);
router.put('/:id', RegistrationController.update);
router.delete('/:id', RegistrationController.delete);
router.get('/:id', RegistrationController.show);

export default router;
