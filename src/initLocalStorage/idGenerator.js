const idGenerator = () => {
    var count = 0;
    function countUp() {
        count++;
        return new Date().getTime() + count;
    }
    return countUp;
};

export const generateId = idGenerator();