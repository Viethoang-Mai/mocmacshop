const validMinMax = (value) => {
    const regex = /^(\d+)?$/;
    return regex.test(value);
};

export default validMinMax;
