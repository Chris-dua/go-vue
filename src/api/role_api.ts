import {type baseResponse, useAxios, type listParamsType} from "@/api/index";
import type {optionType} from "@/types";

export function roleIDListApi(params?:listParamsType):Promise<baseResponse<optionType[]>>{
    return useAxios.get("/api/role_ids", {params})
}

