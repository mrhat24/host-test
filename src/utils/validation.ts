import {HandledError} from "./handledError";
import {HttpCodes} from "./http";

export interface Validator<T> {
    field: string;
    validator: (data: T) => boolean;
    error: string;
}

export const validateModel = <T>(model: T, validators: Validator<T>[]): void => {
    for (let validator of validators) {
        if (!validator.validator(model)) {
            throw new HandledError(HttpCodes.BadRequest, validator.error);
        }
    }
};
