interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const exerciseCalculator = (reqValues: Array<number>): Results | string => {
    
    const parseArgs = (args: Array<number>): Array<number> => {
        if (args.length < 3) throw new Error('Not enough arguments - you must provide at least one target and one day!');
    
        // discard argv[1]
    
        // args.shift();
        // args.shift();
    
        // and turn the rest into an array of numbers
    
        const arr = [];
        let i;
        for (i = 0; i < args.length; i++) {
            if (!isNaN(Number(args[i]))) {
                arr.push(Number(args[i]));
            } else {
                throw new Error('Provided values were not numbers!');
            }
        }
    
        return arr;
    };
    
    const calculateExercises = (...args: Array<number>): Results | string => {
        // capture and remove target
        let target = args.shift();
        // perform calculations
        const periodLength = args.length;
        const trainingDays = periodLength - (args.filter(e => e === 0).length);
        const average = args.reduce((acc, curr) => acc + curr) / periodLength;
        let success = false;
        if (target) success = target < average; else target = 0;
        const rating = success ? 3 : 1;
        const ratingDescription = rating === 3 ? 'Well done - you reached your target' : 'You didn\'t reach your target this week :(';
    
        return {
            periodLength,
            trainingDays,
            success,
            rating,
            ratingDescription,
            target,
            average
        };
    };
    
    try {
        const [...args] = parseArgs(reqValues);
        return calculateExercises(...args);
    } catch (e) {
        return 'something went wrong';
    }
};
