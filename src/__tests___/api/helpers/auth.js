import {adminUser} from "../../../models/users";

export const getAuth = (user = adminUser) => {
    const auth = Buffer.from(`${user.login}:${user.password}`).toString('base64');
    return {authorization: "Basic " + auth}
};
