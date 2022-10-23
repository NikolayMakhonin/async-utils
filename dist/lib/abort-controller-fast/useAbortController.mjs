import { __awaiter } from 'tslib';
import { AbortControllerFast } from '@flemist/abort-controller-fast';

function useAbortController(func) {
    return __awaiter(this, void 0, void 0, function* () {
        const abortController = new AbortControllerFast();
        try {
            return yield func(abortController.signal);
        }
        finally {
            abortController.abort();
        }
    });
}

export { useAbortController };
