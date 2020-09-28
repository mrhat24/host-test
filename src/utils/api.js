export const getApiUrl = (apiUrl, params = {}) => {
    let replacedUrl = apiUrl;
    for (const key in params) {
        replacedUrl = replacedUrl.replace(':' + key, params[key]);
    }
    return replacedUrl;
}
