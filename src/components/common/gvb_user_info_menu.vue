<template>
  <div class="gvb_user_indo_menu">
    <a-dropdown @select="select" class="gvb_dropdown">
      <div class="gvb_user_indo_menu_dropdown">
        <img :src="store.userInfo.avatar_id" alt="">
        <span class="gvb_user_indo_menu_dropdown_span">{{store.userInfo.nick_name}}</span>
        <IconDown></IconDown>
      </div>
      <template #content>
        <template v-for="(item, index) in dopList" :key="index">
          <a-dgroup v-if="item.type === 'line'"></a-dgroup>
          <a-doption v-else :value="item.name">{{item.title}}</a-doption>
        </template>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">

import {IconDown} from "@arco-design/web-vue/es/icon";
import {useStore} from "@/stores";
import type {tabType} from "@/types";
import router from "@/router";
const store = useStore()

interface dopType extends tabType{
  type?: string
}
const  dopList: dopType[] = [
  {
    name: "user_list",
    title: "个人信息",
  },
  {
    name: "",
    title: "",
    type:"line"
  },
  {
    name: "article_list",
    title: "文章列表",
  },
  {
    name: "user_list",
    title: "用户列表",
  },
  {
    name: "log_list",
    title: "系统日志",
  },
  {
    name: "",
    title: "",
    type:"line"
  },
  {
    name: "logout",
    title: "注销退出",
  },
]

function select(value: any) {
  let val = value as string
  if(val == "logout"){
    store.logout()
    router.push("index")
    return
  }
  router.push({
    name: val
  })
}
</script>

<style lang="scss">
.gvb_dropdown{
  .arco-dropdown-group-title{
    margin-top: 0px;
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--bg);
      position: absolute;
      left: 0;
    }
  }
}
</style>