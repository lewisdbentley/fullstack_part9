import { State } from './state';
import { Diagnosis, HealthCheckEntry, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSESE_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: HealthCheckEntry;
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi,
  };
};

export const setDiagnoseseList = (
  DiagnoseseListFromApi: Diagnosis[]
): Action => {
  return {
    type: 'SET_DIAGNOSESE_LIST',
    payload: DiagnoseseListFromApi,
  };
};

export const updatePatient = (patientFromApi: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patientFromApi,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSESE_LIST':
      return {
        ...state,
        diagnosese: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosese,
        },
      };
    case 'ADD_ENTRY':
      console.log('new entry:', action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          // add entry to the patient,
        },
      };
    default:
      return state;
  }
};
