const handleGetDate = (startOffset, endOffset) => {
    const start = new Date();
    start.setDate(start.getDate() + startOffset);

    const end = new Date(start);
    end.setDate(end.getDate() + endOffset);

    const format = (date) => {
        const options = {
            month: "short",
            day: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    };
    return `(Get it by ${format(start)} - ${format(end)})`;
};

export default handleGetDate;
