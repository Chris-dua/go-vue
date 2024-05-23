import {type baseResponse, useAxios} from "@/api/index";
import type {optionType} from "@/types";

export function tagOptionsApi():Promise<baseResponse<optionType[]>> {
    return useAxios.get("/api/tag_names")
}