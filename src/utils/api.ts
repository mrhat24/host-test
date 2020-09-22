export const getApiUrl = (apiUrl: string, params: { [key: string]: any } = {}): string => {
    let replacedUrl = apiUrl;
    for (const key in params) {
        replacedUrl = replacedUrl.replace(':' + key, params[key]);
    }
    return replacedUrl;
}
