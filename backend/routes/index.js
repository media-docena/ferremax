import express from 'express';
import { sendOk } from '../utils/ResponseHelper.js';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  sendOk(res, '¡Bienvenidos a la REST API de FerreMax!')
});

export default router;
