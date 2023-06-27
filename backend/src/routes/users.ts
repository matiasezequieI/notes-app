import express from 'express';
import * as UserControllers from '../controllers/users';

const router = express.Router();

router.post('/signup', UserControllers.signUp);

export default router;