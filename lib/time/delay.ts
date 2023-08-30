const delay = t => {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    });
};

export default delay;
