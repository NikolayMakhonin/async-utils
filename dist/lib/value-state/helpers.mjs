import { __awaiter } from 'tslib';
import { isPromiseLike } from '../isPromiseLike.mjs';
import { ValueState } from './ValueState.mjs';

function createValueState(props = {}) {
    return new ValueState(props);
}
function toValueState(value) {
    return createValueState({
        value,
        hasValue: true,
    });
}
function toValueStateError(error) {
    return createValueState({
        error,
        hasError: true,
    });
}
function resolveValueStates(values) {
    const state = createValueState({
        value: [],
        hasValue: true,
    });
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value instanceof ValueState) {
            state.hasValue && (state.hasValue = value.hasValue);
            state.loading || (state.loading = value.loading);
            state.hasError || (state.hasError = value.hasError);
            state.error || (state.error = value.error);
            state.value[i] = value.value;
        }
        else {
            state.value[i] = void 0;
            state.hasValue = false;
        }
    }
    return state;
}
function resolveValueStatesFunc(values, func) {
    const state = resolveValueStates(values);
    if (state.hasValue) {
        try {
            state.value = func.apply(void 0, state.value);
        }
        catch (error) {
            console.error(error);
            state.value = void 0;
            state.hasValue = false;
            state.error = error;
            state.hasError = true;
        }
    }
    else {
        state.value = void 0;
    }
    return state;
}
function asyncToValueState(valueAsync, stateOrUpdater) {
    return __awaiter(this, void 0, void 0, function* () {
        const updater = typeof stateOrUpdater === 'function'
            ? stateOrUpdater
            : (update) => {
                stateOrUpdater = update(stateOrUpdater);
            };
        let state;
        try {
            updater((o) => {
                state = o || createValueState();
                state.loading = true;
                return state;
            });
            const valuePromise = typeof valueAsync === 'function'
                ? valueAsync()
                : valueAsync;
            let value;
            if (isPromiseLike(valuePromise)) {
                value = yield valuePromise;
            }
            else {
                value = valuePromise;
            }
            if (value instanceof ValueState) {
                updater((o) => {
                    state = o || createValueState();
                    state.value = value.value;
                    state.hasValue = value.hasValue;
                    state.error = value.error;
                    state.hasError = value.hasError;
                    state.loading = value.loading;
                    return state;
                });
            }
            else {
                updater((o) => {
                    state = o || createValueState();
                    state.value = value;
                    state.hasValue = true;
                    state.error = null;
                    state.hasError = false;
                    state.loading = false;
                    return state;
                });
            }
        }
        catch (error) {
            console.error(error);
            updater((o) => {
                state = o || createValueState();
                state.error = error;
                state.hasError = true;
                state.loading = false;
                return state;
            });
        }
        return state;
    });
}

export { asyncToValueState, createValueState, resolveValueStatesFunc, toValueState, toValueStateError };
