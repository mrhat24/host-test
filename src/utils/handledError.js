export class HandledError {
    constructor (
        statusCode,
        message = null
    ) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
