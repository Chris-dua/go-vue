import type { baseResponse, listParamsType, listDataType} from "@/api/index";
import {useAxios} from "@/api/index";
import dayjs from "dayjs";

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
    role_id: number,
    sign_status: string,
}

export function userInfoApi(): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user_info")
}

export function userListApi(params: listParamsType):Promise<baseResponse<listDataType<userInfoType>>>{
    return useAxios.get("/api/users", {params})
}

export interface userCreateRequest {
    nick_name: string,
    password: string,
    role: number
    user_name: string
}

export function userCreateApi(data: userCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/users", data)
}

export interface userUpdateRequest {
    nick_name: string,
    role: number
    user_id: number
}
export function userUpdateApi(data: userUpdateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user_role", data)
}
