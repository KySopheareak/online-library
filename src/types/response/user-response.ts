import { BaseResponse } from "./base.response";
import { User } from "../core/user";
import { Pagination } from "../class/pagination";

export interface IUserResponse extends BaseResponse {
        data: User[],
        pagination: Pagination;
}