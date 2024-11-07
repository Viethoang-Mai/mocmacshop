const validFilters = (filters) => {
    const data = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== null) acc[key] = value;
        return acc;
    }, {});
    return data;
};

export default validFilters;
