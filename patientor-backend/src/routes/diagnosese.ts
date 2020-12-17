import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnosese());
});

router.post('/', (_req, res) => {
  res.send('adding diagnosis');
});

export default router;
