import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue, setPatientList, setDiagnoseseList } from './state';
import { Diagnosis, Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientDetailPage from './PatientDetailPage';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientAndDiagnoseseList = async () => {
      try {
        // get patients
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );

        console.log('patientListFromApi', patientListFromApi);

        dispatch(setPatientList(patientListFromApi));

        // get diagnosese
        const { data: diagnoseseListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosese`
        );

        console.log('diagnoseseListFromApi', diagnoseseListFromApi);

        dispatch(setDiagnoseseList(diagnoseseListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientAndDiagnoseseList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientDetailPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
