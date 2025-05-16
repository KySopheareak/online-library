import { RequestOption } from "./response/request-option";

export interface RequestParam{
   data?:any;
   isLoading?: boolean, 
   isAlertError?: boolean,
   option?: RequestOption
}