import express from 'express';
import SessionController from '../app/controllers/SessionController';

const { Router } = express;
const router = new Router();

router.post('/', SessionController.store);

export default router;
