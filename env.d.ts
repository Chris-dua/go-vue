/// <reference types="vite/client" />
export interface ImportMetaEnv {
    VITE_SERVER_URL:string
}

import 'vue-router';
declare module 'vue-router' {
    interface RouteMeta {
        title?: string;
        isLogin?: boolean
        isAdmin?: boolean
        isTourist?: boolean
    }
}