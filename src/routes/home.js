import express from 'express';
import HomeController from '../app/controllers/HomeController';

const { Router } = express;
const router = new Router();

router.get('/', HomeController.index);

export default router;
