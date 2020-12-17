import {
  HealthCheckRating,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  EntryType,
} from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const isDischarge = (param: any): param is NewHospitalEntry['discharge'] => {
  return param.date !== undefined && param.criteria !== undefined;
};

const parseDischarge = (discharge: any): NewHospitalEntry['discharge'] => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

export const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
  return {
    type: parseEntryType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};

export const toNewOccupationalHealthcareEntry = (
  object: any
): NewOccupationalHealthcareEntry => {
  return {
    employerName: parseEmployerName(object.employerName),
    type: parseEntryType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };
};

export const toNewHospitalEntry = (object: any): NewHospitalEntry => {
  return {
    discharge: parseDischarge(object.discharge),
    type: parseEntryType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };
};
