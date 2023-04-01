import { __awaiter } from 'tslib';

function fixAsyncStackTrace(func) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = new Error();
        try {
            return yield func();
        }
        catch (err) {
            err.stack += '\n' + error.stack.substring(error.stack.indexOf('\n'));
            throw err;
        }
    });
}

export { fixAsyncStackTrace };
