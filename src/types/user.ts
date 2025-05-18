import { MongoObject } from "./mongo-object";

export interface User extends MongoObject {
    username: string;
    password?: string;
    firstNameEn: string;
    lastNameEn: string;
    firstNameKh: string;
    lastNameKh: string;
    phone: string;
    email?: string;
    forceChangePassword?: boolean;
}
