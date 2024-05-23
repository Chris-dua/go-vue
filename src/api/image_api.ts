import {type baseResponse, type listDataType, type listParamsType, useAxios} from "@/api/index";


export interface imageIdType{
    id:number,
    path:string,
    name:string,
}

export function imageIdListApi():Promise<baseResponse<imageIdType[]>>{
    return useAxios.get("/api/images_name")
}

export interface imageType{
    id:number,
    created_at:string
    path:string,
    hash:string,
    name:string,
    image_type: "本地"|"七牛云",
}

export function imageListApi(params: listParamsType):Promise<baseResponse<listDataType<imageType>>>{
    return useAxios.get("/api/images", {params: params})
}

export interface imagesUploadResponse{
    file_name:string,
    is_success:boolean,
    msg:string,
}