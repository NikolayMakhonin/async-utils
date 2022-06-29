function isPromiseLike(obj) {
    if (obj != null
        && typeof obj === 'object'
        && typeof obj.then === 'function') {
        return true;
    }
    return false;
}

export { isPromiseLike };
