import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';
import { Header, Container, Icon } from 'semantic-ui-react';
import { useStateValue } from '../../state';

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
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
        {entry.date} <Icon style={{ fontSize: '36px' }} name="stethoscope" />
        {entry.employerName}
      </Header>

      <span>{entry.description}</span>
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
    </Container>
  );
};

export default OccupationalHealthcareEntryDetails;
