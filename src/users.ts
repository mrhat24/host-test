export interface User {
    login: string;
    password: string;
}

export const adminUser: User = {
    login: 'admin',
    password: 'password',
};

export const managerUser: User = {
    login: 'manager',
    password: 'password',
};

export const users: User[] = [adminUser, managerUser];
