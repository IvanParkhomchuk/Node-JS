const { factorial } = require('../functions');
const assert = require('assert');

describe('Знаходження факторіалу', () => {
    it('Факторіал 5', () => {
        assert.equal(factorial(5), 120);
    });

    it('Факторіал 6', () => {
        assert.equal(factorial(6), 720);
    });

    it('Факторіал 0', () => {
        assert.equal(factorial(0), 1);
    });

    it('Факторіал -5', () => {
        assert.equal(factorial(-5), null);
    });

    it('Факторіал -6', () => {
        assert.equal(factorial(-6), null);
    });
});
