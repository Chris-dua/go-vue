import {type baseResponse, type listDataType, useAxios} from "@/api/index";

export interface bannerType {
    id: number,
    path: string,
}

export interface menuType{
    id: number,
    create_at: string,
    title: string,
    path: string,
    slogan: string,
    abstract: string[],
    abstract_time: number,
    banner_time: number,
    sort: number,
    banners: bannerType[],
}

export function menuListApi():Promise<baseResponse<listDataType<menuType>>> {
    return useAxios.get("/api/menus")
}