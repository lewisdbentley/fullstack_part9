import patients from '../../data/patients';
import {
  PublicPatient,
  NewPatient,
  Patient,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckRating,
  Diagnosis,
} from '../types';

const getPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const newPatient = {
    id: `d2773${Math.floor(Math.random() * 1000)}-f723-11e9-8f0b-362b9e155667`,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addHealthCheckEntry = (
  patientId: string,
  description: string,
  date: string,
  specialist: string,
  healthCheckRating: HealthCheckRating,
  diagnosisCodes: Array<Diagnosis['code']>
): HealthCheckEntry => {
  const newEntry: HealthCheckEntry = {
    id: `fcd59${Math.floor(Math.random() * 1000)}-c4b4-4fec-ac4d-df4fe1f85f62`,
    description,
    date,
    specialist,
    healthCheckRating,
    type: 'HealthCheck',
    diagnosisCodes,
  };

  const patient = patients.find((p) => p.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

const addOccupationalHealthcareEntry = (
  patientId: string,
  description: string,
  date: string,
  specialist: string,
  employerName: string,
  diagnosisCodes: Array<Diagnosis['code']>
): OccupationalHealthcareEntry => {
  const newEntry: OccupationalHealthcareEntry = {
    id: `fcd59${Math.floor(Math.random() * 1000)}-c4b4-4fec-ac4d-df4fe1f85f62`,
    description,
    date,
    specialist,
    type: 'OccupationalHealthcare',
    employerName,
    diagnosisCodes,
  };

  const patient = patients.find((p) => p.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

const addHospitalEntry = (
  patientId: string,
  description: string,
  date: string,
  specialist: string,
  dischargeDate: string,
  criteria: string,
  diagnosisCodes: Array<Diagnosis['code']>
): HospitalEntry => {
  const newEntry: HospitalEntry = {
    id: `fcd59${Math.floor(Math.random() * 1000)}-c4b4-4fec-ac4d-df4fe1f85f62`,
    description,
    date,
    specialist,
    type: 'Hospital',
    discharge: {
      date: dischargeDate,
      criteria: criteria,
    },
    diagnosisCodes,
  };

  const patient = patients.find((p) => p.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  findById,
  addHealthCheckEntry,
  addOccupationalHealthcareEntry,
  addHospitalEntry,
};
