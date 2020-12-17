import diagnosese from '../../data/diagnosese';
import { Diagnosis } from '../types';

const getDiagnosese = (): Diagnosis[] => {
  return diagnosese;
};

const addDiagnosis = (): Diagnosis[] => {
  return [];
};

export default {
  getDiagnosese,
  addDiagnosis,
};
