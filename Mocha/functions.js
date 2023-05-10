const factorial = (n) => {
    if (n === 0) return 1;
    else if (n < 0) return null;
    return n * factorial(n - 1);
};

module.exports = { factorial };