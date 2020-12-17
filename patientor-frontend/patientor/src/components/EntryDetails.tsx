import React from 'react';
import { Entry } from '../types';
import OccupationalHealthCareEntryDetails from './EntryTypes/OccupationalHealthcareEntryDetails';
import HealthCheckEntryDetails from './EntryTypes/HealthCheckEntryDetails';
import HospitalEntryDetails from './EntryTypes/HospitalEntryDetails';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
