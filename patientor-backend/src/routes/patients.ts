import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (_req, res) => {
  const id = _req.params.id;
  const returnedPatient = patientService.findById(id);
  returnedPatient ? res.send(returnedPatient) : res.sendStatus(404);
});

router.post('/:id/entries', (_req, res) => {
  const patientId = _req.params.id;
  if (_req.body.healthCheckRating) {
    const {
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    } = _req.body;
    const newHealthCheckEntry = patientService.addHealthCheckEntry(
      patientId,
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes
    );
    return res.json(newHealthCheckEntry);
  } else if (_req.body.employerName) {
    const {
      description,
      date,
      specialist,
      employerName,
      diagnosisCodes,
    } = _req.body;
    const newOccupationalHealthcareEntry = patientService.addOccupationalHealthcareEntry(
      patientId,
      description,
      date,
      specialist,
      employerName,
      diagnosisCodes
    );
    return res.json(newOccupationalHealthcareEntry);
  } else if (_req.body.dischargeDate && _req.body.criteria) {
    const {
      description,
      date,
      specialist,
      dischargeDate,
      criteria,
      diagnosisCodes,
    } = _req.body;
    const newHospitalEntry = patientService.addHospitalEntry(
      patientId,
      description,
      date,
      specialist,
      dischargeDate,
      criteria,
      diagnosisCodes
    );
    return res.json(newHospitalEntry);
  }
  return res
    .status(400)
    .json({ error: 'Please enter a valid entry type wololo!' });
});

export default router;
