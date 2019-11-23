// MOVED TO students.js
import express from 'express';
import CheckinController from '../app/controllers/CheckinController';

const { Router } = express;
const router = new Router();

router.get('/', CheckinController.index);

export default router;
