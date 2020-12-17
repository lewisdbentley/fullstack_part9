import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.name) {
    case 'Fundamentals':
      return (
        <ul>
          <li>
            <strong>{part.name}</strong>
          </li>
          <li>{part.description ? part.description : null}</li>
          <li>{part.exerciseCount}</li>
        </ul>
      );
    case 'Deeper type usage':
      return (
        <ul>
          <li>
            <strong>{part.name}</strong>
          </li>
          <li>{part.description ? part.description : null}</li>
          <li>{part.exerciseCount}</li>
          <li>{part.exerciseSubmissionLink}</li>
        </ul>
      );
    case 'Using props to pass data':
      return (
        <ul>
          <li>
            <strong>{part.name}</strong>
          </li>
          <li>{part.description ? part.description : null}</li>
          <li>{part.exerciseCount}</li>
          <li>{part.groupProjectCount}</li>
        </ul>
      );
    case 'Switches':
      return (
        <ul>
          <li>
            <strong>{part.name}</strong>
          </li>
          <li>{part.description ? part.description : null}</li>
          <li>{part.exerciseCount}</li>
          <li>{part.mdnSwitchReference}</li>
        </ul>
      );
    default:
      console.log('inside default');
      return assertNever(part);
  }
};

export default Part;
