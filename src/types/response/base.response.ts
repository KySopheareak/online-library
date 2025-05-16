import { ErrorCode } from '../enums/error-code.enum';
import { RESPONSE_STATUS } from '../enums/response-status.enum';

export interface BaseResponse<T = any> {
    status: RESPONSE_STATUS;
    errors?: {
        [key: string]: string[];
    };
    message: string;
    data: T;
    error_code?: ErrorCode;
}
