export const calculator = (a: number, b: number, op: string): number | string => {
    
    type Operation = 'multiply' | 'add' | 'divide' | null;
    
    type Result = number;

    const opFinder = (op: string): Operation => {
        if (op === 'multiply') {
            return 'multiply';
        } else if (op === 'divide') {
            return 'divide';
        } else if (op === 'add') {
            return 'add';
        }
        return null;
    };
    
    const calculate = (a: number, b: number, op: Operation): Result => {
        switch (op) {
            case 'multiply':
                return a * b;
            case 'divide':
                if (b === 0) throw new Error('Can\'t divide by 0!');
                return a / b;
            case 'add':
                return a + b;
            default:
                throw new Error('Operation is not multiply, add or divide!');
        }
    };
    
    try {
        const operation = opFinder(op);
        return calculate(a, b, operation);
    } catch (e) {
        return 'something went wrong';
    }
};