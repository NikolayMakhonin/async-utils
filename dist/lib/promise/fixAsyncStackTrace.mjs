import { __awaiter } from 'tslib';

function fixAsyncStackTrace(func) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const error = new Error();
        try {
            return yield func();
        }
        catch (err) {
            if (err instanceof Error) {
                err.stack = (err.stack ? err.stack + '\n' : '')
                    + ((_a = error.stack) === null || _a === void 0 ? void 0 : _a.substring(error.stack.indexOf('\n')));
            }
            throw err;
        }
    });
}

export { fixAsyncStackTrace };
