import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
// import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    console.log('req.query.q', _req.query.bmi);
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    const bmi = bmiCalculator(height, weight);
    res.json({
        'height': height,
        'weight': weight,
        'calculatedBmi': bmi
    });
});

app.use(express.json());

app.post('/calculateExercises', (_req, res: express.Response) => {

    // validate and capture parameters

    interface Body {
        daily_exercises: Array<number>;
        target: number;
    }

    const body: Body = _req.body as Body;

    // check for missing parameters

    if ('target' in body === false || 'daily_exercises' in body === false) {
        return res.status(400).json({
            "error": "parameters missing"
        });        
    }
    
    const { daily_exercises, target } = body;

    // check for incorrect parameters

    const arr = [];
    let i;
    for (i = 0; i < daily_exercises.length; i++) {
        if (!isNaN(Number(daily_exercises[i]))) {
            arr.push(Number(daily_exercises[i]));
        } else {
            return res.status(400).json({
                "error": "malformatted parameters"
            });     
        }
    }

    if (isNaN(Number(target))) {
        return res.status(400).json({
            "error": "malformatted parameters"
        });     
    }

    // perform operations

    arr.unshift(target);

    const result = exerciseCalculator(arr);

    // return result

    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

