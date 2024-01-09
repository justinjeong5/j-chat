const delay = (t: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(resolve, t);
    });
};

export default delay;
