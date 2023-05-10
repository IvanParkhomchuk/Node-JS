const { factorial } = require('../functions');

describe('Знаходження факторіалу', () => {
    it('Факторіал 5', () => {
        let result = factorial(5);
        let correct = 120;

        if (result !== correct) {
            throw new Error(`Результат факторіалу 5 невірний.
            Результат: ${result}. Очікувалось ${correct}.`);
        }
    });

    it('Факторіал 6', () => {
        let result = factorial(6);
        let correct = 720;

        if (result !== correct) {
            throw new Error(`Результат факторіалу 6 невірний.
            Результат: ${result}. Очікувалось ${correct}.`);
        }
    });

    it('Факторіал 0', () => {
        let result = factorial(0);
        let correct = 1;

        if (result !== correct) {
            throw new Error(`Результат факторіалу 0 невірний.
            Результат: ${result}. Очікувалось ${correct}.`);
        }
    });

    it('Факторіал -5', () => {
        let result = factorial(-5);
        let correct = null;

        if (result !== correct) {
            throw new Error(`Результат факторіалу -5 невірний.
            Результат: ${result}. Очікувалось ${correct}.`);
        }
    });

    it('Факторіал -6', () => {
        let result = factorial(-6);
        let correct = null;

        if (result !== correct) {
            throw new Error(`Результат факторіалу -6 невірний.
            Результат: ${result}. Очікувалось ${correct}.`);
        }
    });
});
