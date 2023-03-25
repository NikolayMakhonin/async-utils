function promiseFinally(promise, onFinally) {
    if (!onFinally) {
        return promise;
    }
    return promise.then((result) => {
        onFinally();
        return result;
    }, (err) => {
        onFinally();
        throw err;
    });
}

export { promiseFinally };
