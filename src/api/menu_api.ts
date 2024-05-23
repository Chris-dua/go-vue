import {type baseResponse, type listDataType, useAxios, type listParamsType} from "@/api/index";

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

export function menuListApi(params:listParamsType):Promise<baseResponse<listDataType<menuType>>> {
    return useAxios.get("/api/menus", {params: params})
}

export interface imageIdSortList{
    image_id:number,
    sort: number,

}

export const defaultMenuForm = {
    abstract: [],
    abstract_time: 7,
    banner_time: 7,
    image_sort_list: [],
    path: "",
    slogan: "",
    sort: 1,
    title: "",
    abstractString: "",
    imageIdList: []
}

export interface menuCreateRequest{
    title: string,
    path: string,
    slogan: string,
    abstract: string[],
    abstract_time: number,
    banner_time: number,
    sort: number,
    image_sort_list: imageIdSortList[],
}

export function menuCreateApi(data:menuCreateRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/menus", data)
}

export function menuUpdateApi(id:number, data:menuCreateRequest):Promise<baseResponse<string>>{
    return useAxios.put("/api/menus/" + id.toString(), data)
}