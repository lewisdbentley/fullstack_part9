import React from 'react';
import { useStateValue } from '../state';
import { Field, Formik, Form } from 'formik';
import { EntryFormValuesInterface } from '../types';
import {
  DiagnosisSelection,
  TextField,
  NumberField,
} from '../AddPatientModal/FormField';
import { Grid, Button } from 'semantic-ui-react';

/*
 * use healthCheckEntry, but omit id,
 * because those are irrelevant for new healthCheckEntry object.
 */
export type EntryFormValues = EntryFormValuesInterface;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosese }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: undefined,
        // type: 'HealthCheck',
        healthCheckRating: 0,
        employerName: '',
        dischargeDate: '',
        criteria: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required wololo!';
        const moreThanOneEntryError =
          'You must only provide one entry-specific value.';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (
          // Regex which checks format of date is YYYY-MM-DD
          !/^(?:(?:(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)(?:0?2\1(?:29)))|(?:(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[1,3-9]|1[0-2])\2(29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1\d|2[0-8]))))$/i.test(
            values.date
          )
        ) {
          errors.date = 'Date must be in YYYY-MM-DD format.';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        // You must only provide one entry-specific value.
        if (values.healthCheckRating && values.employerName) {
          errors.healthCheckRating = moreThanOneEntryError;
          errors.employerName = moreThanOneEntryError;
        }
        if (values.dischargeDate && values.employerName) {
          errors.dischargeDate = moreThanOneEntryError;
          errors.employerName = moreThanOneEntryError;
        }
        if (values.dischargeDate && values.healthCheckRating) {
          errors.dischargeDate = moreThanOneEntryError;
          errors.healthCheckRating = moreThanOneEntryError;
        }
        if (values.criteria && values.employerName) {
          errors.criteria = moreThanOneEntryError;
          errors.employerName = moreThanOneEntryError;
        }
        if (values.criteria && values.healthCheckRating) {
          errors.criteria = moreThanOneEntryError;
          errors.healthCheckRating = moreThanOneEntryError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {/* {!!status && <React.Fragment>{status}</React.Fragment>} */}
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnosese={Object.values(diagnosese)}
            />
            {/* HealthCheckRating */}
            <React.Fragment>
              Health Check. Enter a rating from 0 - 3. 0 is healthy, while 3
              represents critical risk.
            </React.Fragment>
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            {/* EmployerName */}
            <React.Fragment>
              Occupational Healthcare. Enter the name of the employer.
            </React.Fragment>
            <Field
              label="EmployerName"
              placeholder="EmployerName"
              name="employerName"
              component={TextField}
            />
            {/* Discharge */}
            <React.Fragment>
              Hospital visit. Enter the date and criteria of discharge.
            </React.Fragment>
            <Field
              label="Date of discharge"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
