import {adminUser} from "../../../users";
export const getAdminAuth = () => {
    const auth = Buffer.from(`${adminUser.login}:${adminUser.password}`).toString('base64');
    return {authorization: "Basic " + auth}
};
