export class HandledError {
    constructor (
        public statusCode: number,
        public message: string = null
        // eslint-disable-next-line no-empty-function
    ) {}
}
