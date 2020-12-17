import express from 'express';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnosese';
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);

app.use('/api/diagnosese', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
