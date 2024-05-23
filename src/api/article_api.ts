import {type baseResponse, type listDataType, type listParamsType, useAxios} from "@/api/index";
import type {optionType} from "@/types";

export interface articleType {
    abstract: string,
    banner_id: number,
    banner_url: string,
    category: string,
    collects_count: number,
    comment_count: number,
    created_at: string,
    digg_count: number,
    id: string,
    look_count: number,
    tags: [],
    title: string,
    updated_at: string,
    user_avatar: string,
    user_id: number,
    user_nick_name: string,
}

export function articleListApi(params: listParamsType):Promise<baseResponse<listDataType<articleType>>>{
    return useAxios.get("/api/articles", {params: params})
}

export function articleCategoryList():Promise<baseResponse<optionType[]>> {
    return useAxios.get("/api/categorys")
}