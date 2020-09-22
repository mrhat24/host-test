export const getApiUrl = (apiUrl: string, params: { [key: string]: any } = {}): string => {
    let replacedUrl = apiUrl;
    for (const key in params) {
        replacedUrl = replacedUrl.replace(':' + key, params[key]);
    }
    return replacedUrl;
}

export enum HttpCodes {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalError = 500,
}
