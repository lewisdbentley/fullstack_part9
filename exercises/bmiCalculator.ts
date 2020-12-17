export const bmiCalculator = (height: number, weight: number): string => {

    interface MassHeightValues {
        parsedHeight: number
        parsedMass: number
    }
    
    const parseArguments = (height: number, weight: number): MassHeightValues => {
    
        if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
            return {
                parsedHeight: Number(height),
                parsedMass: Number(weight)
            };
        } else {
            throw new Error('Provided values were not numbers!');
        }
    };
    
    const calculateBmi = (height: number, mass: number) => {
        const heightInMetres = height / 100;
        const squaredHeight = heightInMetres * heightInMetres;
        const bmi = mass / squaredHeight;
        if (bmi < 18.5) {
            return 'Too low (unhealthy weight)';
        } else if (bmi > 18.5 && bmi <25) {
            return 'Normal (healthy weight)';
        } else if (bmi > 25 && bmi < 30) {
            return 'Too high (unhealthy weight)';
        } else {
            return 'Way too high (obese)';
        }
    };    
    
    try {
        const { parsedHeight, parsedMass } = parseArguments(height, weight); 
        return calculateBmi(parsedHeight, parsedMass);
    } catch(e) {
        return 'something went wrong';
    }    
};