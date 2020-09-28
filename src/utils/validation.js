import {HandledError} from "./handledError";
import {HttpCodes} from "./http";


export const validateModel = (model, validators) => {
    for (let validator of validators) {
        if (!validator.validator(model)) {
            throw new HandledError(HttpCodes['BadRequest'], validator.error);
        }
    }
};
