import {type baseResponse, useAxios, type userListParamsType} from "@/api/index";
import type {optionType} from "@/types";

export function roleIDListApi(params?:userListParamsType):Promise<baseResponse<optionType[]>>{
    return useAxios.get("/api/role_ids", {params})
}

