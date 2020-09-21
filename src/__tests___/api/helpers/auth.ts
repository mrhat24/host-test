import {adminUser, User} from "../../../users";

export const getAuth = (user: User = adminUser) => {
    const auth = Buffer.from(`${user.login}:${user.password}`).toString('base64');
    return {authorization: "Basic " + auth}
};
