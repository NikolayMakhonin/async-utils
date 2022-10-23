/**
 * It needed to prevent memory leak on some platforms
 * see: https://stackoverflow.com/questions/72727907/promise-reject-is-very-slow-on-node-js-18
 *  */
export declare function rejectAsResolve(resolve: (value: any) => void, reason?: any): void;
/**
 * It needed to prevent memory leak on some platforms
 * see: https://stackoverflow.com/questions/72727907/promise-reject-is-very-slow-on-node-js-18
 * */
export declare function promiseRejected(reason?: any): Promise<never>;
