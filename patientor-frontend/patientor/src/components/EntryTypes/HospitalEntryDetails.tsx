import React from 'react';
import { HospitalEntry } from '../../types';
import { Header, Container, Icon } from 'semantic-ui-react';
import { useStateValue } from '../../state';
const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  const [{ diagnosese }] = useStateValue();
  return (
    <Container
      style={{
        border: 'thick double #dcdcdc',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '8px',
      }}
    >
      <Header as="h2">
        {entry.date}
        <Icon style={{ fontSize: '36px' }} name="hospital symbol" />
      </Header>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          console.log(code);
          return (
            <li key={code}>
              {diagnosese[code]
                ? `${diagnosese[code].code} - ${diagnosese[code].name} - ${diagnosese[code].latin}`
                : null}
            </li>
          );
        })}
      </ul>
      <p>
        Discharged <strong>{entry.discharge.date}</strong> because{' '}
        <strong>{entry.discharge.criteria}</strong>
      </p>
    </Container>
  );
};

export default HospitalEntryDetails;
