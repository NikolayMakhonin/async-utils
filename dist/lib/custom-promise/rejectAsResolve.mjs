function promiseRejected(reason) {
    return {
        then(_, reject) {
            void reject(reason);
        },
    };
}
function rejectAsResolve(resolve, reason) {
    resolve(promiseRejected(reason));
}

export { rejectAsResolve };
