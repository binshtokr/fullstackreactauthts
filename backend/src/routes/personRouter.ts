import express from 'express';
import { addPerson, checkPerson } from '../controllers/personController';

const router = express.Router();

router.post('/persons', addPerson);
router.post('/login', checkPerson);

export default router;
