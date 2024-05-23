import {type baseResponse, type listDataType, useAxios} from "@/api/index";

export interface siteInfoType {
    created_at: string
    bei_an: string
    title: string
    version: string
    email: string
    name: string
    job: string
    addr: string
    github_url: string
}

export interface emailType {
    host: string
    port: number
    user: string
    password: string
    default_from_email: string
    use_ssl: boolean
    user_tls: boolean
}

export interface qqType {
    app_id: string
    key: string
    redirect: string
}

export interface jwtType {
    secret: string
    expires: number
    issuer: string
}

export interface qiniuType {
    enable: boolean
    access_key: string
    secret_key: string
    bucket: string
    cdn: string
    zone: string
    prefix: string
    size: number
}

export type settingsName = "site" | "qq" | "email" | "qiniu" | "jwt"

export function siteInfoApi<T extends siteInfoType | emailType | qqType | jwtType | qiniuType>(name:settingsName): Promise<baseResponse<T>>{
    return useAxios.get("/api/settings/" + name, )
}

export function siteInfoUpdateApi<T extends siteInfoType | emailType | qqType | jwtType | qiniuType>(name: settingsName ,data: T): Promise<baseResponse<string>>{
    return useAxios.put("/api/settings/" + name, data)
}