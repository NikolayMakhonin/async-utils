'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class ValueState {
    constructor(props = {}) {
        this.value = props.value;
        this.loading = props.loading || false;
        this.hasValue = props.hasValue || false;
        this.error = props.error;
        this.hasError = props.hasError || false;
    }
}

exports.ValueState = ValueState;
