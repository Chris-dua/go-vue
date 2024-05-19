<template>
  <div>
    <Gvb_table :url="userListApi"
               :columns="columns"
               default-delete
               add-label="创建用户"
               :filter-group="filterGroup"
               @add="add"
               @edit="edit"
               @remove="remove"
               :action-group="actionGroup"
    >
      <template #avatar="{record}">
        <a-avatar :image-url="record.avatar_id"></a-avatar>
      </template>
    </Gvb_table>
  </div>
</template>

<script setup lang="ts">

import Gvb_table from "@/components/admin/gvb_table.vue";
import {userListApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";
import type {actionOptionType} from "@/components/admin/gvb_table.vue";
import {ref} from "vue";
import type {filterOptionType} from "@/components/admin/gvb_table.vue";
import {roleIDListApi} from "@/api/role_api";

const columns = [
    {title: "昵称", dataIndex: "nick_name"},
    {title: '头像', slotName: 'avatar_id' },
    {title: "邮箱", dataIndex: "email" },
    {title: "角色", dataIndex: "role" },
    {title: "ip", dataIndex: "ip" },
    {title: "注册时间", slotName: "create_at" },
    {title: "操作", slotName: "action" },

]

const filterGroup :filterOptionType[] = [
  {
    label:"角色过滤",
    value: 0,
    column: "role",
    source: roleIDListApi
  }
]



const actionGroup:actionOptionType[] = [
  {
    label:"批量拉黑",
    callback: async(idList:(number|string)[]):Promise<boolean>=>{
      return true
    }
  }
]

function add(){

}

function edit(record: userInfoType){
  console.log(record)
}

function remove(idList:number[]){}
</script>
