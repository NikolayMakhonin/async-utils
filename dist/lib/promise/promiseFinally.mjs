function promiseFinally(promise, onFinally) {
    return promise.then((result) => {
        onFinally();
        return result;
    }, (err) => {
        onFinally();
        throw err;
    });
}

export { promiseFinally };
