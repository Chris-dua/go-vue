import type { baseResponse, userListParamsType, listDataType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface loginEmailType {
    user_name: string
    password: string
}

export function loginEmailApi(request: loginEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/email_login", request)
}

export function logoutApi(): Promise<baseResponse<string>>{
    return useAxios.post("/api/logout")
}

export interface userInfoType {
    id: number,
    create_at: string,
    nick_name: string,
    user_name: string,
    avatar_id: string,
    email: string,
    tel: string,
    addr: string,
    token: string,
    ip: string,
    role: string,
    sign_status: string,
}

export function userInfoApi(): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user_info")
}

export function userListApi(params: userListParamsType):Promise<baseResponse<listDataType<userInfoType>>>{
    return useAxios.get("/api/users", {params})
}

