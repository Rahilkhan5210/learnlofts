import express from 'express';
const router = express.Router();
import { submitForm } from '../Controllers/formController.js';

router.post('/submit-form', submitForm);

export default router; 