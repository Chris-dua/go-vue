import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn.js"
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export function dataTimeFormat(data:string){
    return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
}

export function dataFormat(data:string){
    return dayjs(data).format('YYYY-MM-DD')
}

//相对当前时间
export function relativeCurrentTime(data:string){
    return dayjs(data).fromNow()
}
