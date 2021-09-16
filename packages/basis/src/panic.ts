type MessagePanicArgs = [message: string, errorConstructor?: ErrorConstructor];
type ErrorPanicArgs = [error: Error];
type PanicArgs = MessagePanicArgs | ErrorPanicArgs;

const isErrorPanicArgs = (args: PanicArgs): args is ErrorPanicArgs =>
    args[0] instanceof Error;

function internalPanic(args: PanicArgs): never {
    if (/*@__INLINE__*/isErrorPanicArgs(args)) { throw args[0] }
    const [message, ErrorConstructor = Error] = args;
    throw new ErrorConstructor(message);
}

export const panic: {
    (message: string, errorConstructor?: ErrorConstructor): never;
    (error: Error): never;
} = (...args) =>
    internalPanic(args as PanicArgs);

export const assert: {
    (condition: boolean, message: string, errorConstructor?: ErrorConstructor): asserts condition;
    (condition: boolean, error: Error): asserts condition;
} = (condition, ...args) =>
    void (condition || internalPanic(args as PanicArgs));
