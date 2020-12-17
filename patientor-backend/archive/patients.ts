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
  if (id) {
    res.send(patientService.findById(id));
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (_req, res) => {
  console.log('req.body', _req.body);
  try {
    const patientId = _req.params.id;
    const {
      description,
      date,
      specialist,
      type,
      healthCheckRating,
      employerName,
      discharge,
    } = _req.body;

    let newEntry;

    switch (type) {
      case 'HealthCheck':
        newEntry = patientService.addHealthCheckEntry(
          patientId,
          description,
          date,
          specialist,
          type as 'HealthCheck',
          healthCheckRating
        );
        res.json(newEntry);
        break;
      case 'OccupationalHealthcare':
        newEntry = patientService.addOccupationalHealthcareEntry(
          patientId,
          description,
          date,
          specialist,
          type as 'OccupationalHealthcare',
          employerName
        );
        res.json(newEntry);
        break;
      case 'Hospital':
        newEntry = patientService.addHospitalEntry(
          patientId,
          description,
          date,
          specialist,
          type as 'Hospital',
          discharge
        );
        res.json(newEntry);
        break;
      default:
        res
          .status(400)
          .json({ error: 'Please enter a valid entry type wololo!' });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
