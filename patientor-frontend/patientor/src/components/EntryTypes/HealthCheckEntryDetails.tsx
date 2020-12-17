import React from 'react';
import { HealthCheckEntry } from '../../types';
import { Header, Container, Icon } from 'semantic-ui-react';
import { useStateValue } from '../../state';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
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
        {entry.date} <Icon style={{ fontSize: '36px' }} name="doctor" />
      </Header>
      <p>{entry.description}</p>
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
      {entry.healthCheckRating > 2 ? (
        <Icon style={{ fontSize: '36px' }} name="heart outline" color="black" />
      ) : entry.healthCheckRating > 1 ? (
        <Icon style={{ fontSize: '36px' }} name="heart outline" color="red" />
      ) : entry.healthCheckRating > 0 ? (
        <Icon
          style={{ fontSize: '36px' }}
          name="heart outline"
          color="yellow"
        />
      ) : (
        <Icon style={{ fontSize: '36px' }} name="heart outline" color="green" />
      )}
    </Container>
  );
};

export default HealthCheckEntryDetails;
