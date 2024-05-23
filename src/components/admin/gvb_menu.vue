<template>
  <div class="gvb_menu">
    <a-menu
        @menu-item-click="clickMenu"
        v-model:selected-keys="selectedKeys"
        v-model:open-keys="openKeys"
        show-collapse-button
        @collapse="collapse"
    >
      <template v-for="item in menuList" :key="item.name">
        <a-menu-item :key="item.name" v-if="item.child?.length === 0">
          {{ item.title }}
          <template #icon>
            <component :is="item.icon"></component>
          </template>
        </a-menu-item>
        <a-sub-menu v-if="item.child?.length!==0 " :key="item.name">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          <template #title>{{ item.title }}</template>
          <a-menu-item :key="sub.name" v-for="sub in item.child">
            {{ sub.title }}
            <template #icon>
              <component :is="sub.icon"></component>
            </template>
          </a-menu-item>
        </a-sub-menu>

      </template>
    </a-menu>
  </div>
</template>
<script setup lang="ts">

import {ref, watch} from "vue";
import type {Component} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "@/stores";
import {IconMenu, IconUser} from "@arco-design/web-vue/es/icon";

const route = useRoute()
const router = useRouter()
const store = useStore()

interface MenuType {
  title: string
  icon?: Component
  name?: string // 路由名字
  child?: MenuType[]
}


const menuList: MenuType[] = [
  {title: "首页", icon: IconMenu, name: "home", child: []},
  {
    title: "个人中心", icon: IconUser, name: "user_center", child: [
      {title: "我的信息", icon: IconUser, name: "user_info"},
    ]
  },
  {
    title: "文章管理", icon: IconUser, name: "article", child: [
      {title: "文章列表", icon: IconUser, name: "article_list"},
      {title: "图片列表", icon: IconUser, name: "image_list"},
    ]
  },
  {
    title: "用户管理", icon: IconUser, name: "users", child: [
      {title: "用户列表", icon: IconUser, name: "user_list"},
    ]
  },
  {
    title: "群聊管理", icon: IconUser, name: "chat_group", child: [
      {title: "聊天记录", icon: IconUser, name: "chat_list"},
    ]
  },
  {
    title: "系统管理", icon: IconUser, name: "system", child: [
      {title: "菜单列表", icon: IconUser, name: "menu_list"},
      {title: "系统日志", icon: IconUser, name: "log_list"},
      {title: "系统配置", icon: IconUser, name: "system_system"},

    ]
  },

]


const selectedKeys = ref([route.name])
const openKeys = ref([route.matched[1].name])


function clickMenu(name: string) {
  router.push({
    name: name,
  })
}

function collapse(collapse: boolean) {
  store.setCollapsed(collapse)
}

watch(()=>route.name, ()=>{
  selectedKeys.value = [route.name]
  openKeys.value = [route.matched[1].name]
})

</script>

<style lang="scss">
.gvb_menu{
  .arco-menu {
    position: inherit;
  }

  .arco-menu-collapse-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    opacity: 0;
    transition: all .3s;
  }
}

aside:hover {
  .gvb_menu {
    .arco-menu-collapse-button {
      opacity: 1;
    }
  }
}
</style>






