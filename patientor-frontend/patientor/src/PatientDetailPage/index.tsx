import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { HealthCheckEntry, Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import { EntryFormValues } from '../AddEntryModal/addEntryForm';
import AddEntryModal from '../AddEntryModal/';
import { Button } from 'semantic-ui-react';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [{ patients, diagnosese }, dispatch] = useStateValue();

  const patient = id ? patients[id] : null;
  console.log('diagnosese in state:', diagnosese);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patient && !patient.ssn) {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(patientFromApi);

          dispatch(updatePatient(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, patient, id]);
  console.log('patient', patient);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patient && patient.entries) {
        const { data: newEntry } = await axios.post<HealthCheckEntry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        patient?.entries.push(newEntry);
        dispatch(updatePatient(patient));
        closeModal();
      }
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (patient && patient.entries) {
    return (
      <>
        <h2>
          {patient.name}
          {patient.gender === 'male' ? (
            <Icon style={{ fontSize: '46px' }} name="mars stroke" />
          ) : (
            <Icon style={{ fontSize: '46px' }} name="venus" />
          )}
        </h2>
        <p>{patient.ssn}</p>
        <p>{patient.occupation}</p>
        <h3>Entries</h3>
        {patient.entries?.map((e) => {
          return <EntryDetails entry={e} key={e.id} />;
        })}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </>
    );
  } else {
    return null;
  }
};

export default PatientDetailPage;
