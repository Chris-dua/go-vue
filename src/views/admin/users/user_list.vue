<template>
  <div>
    <user_create v-model:visible="visible" @ok="createOk"></user_create>
    <a-modal title="编辑用户" v-model:visible="editVisible" :on-before-ok="updateUserOk">
      <a-form ref="formRef" :model="updateUserForm">
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="updateUserForm.nick_name" placeholder="昵称">
          </a-input>
        </a-form-item>
        <a-form-item field="role" label="权限">
          <a-select v-model="updateUserForm.role" :options="roleOptions"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb_table :url="userListApi"
               :columns="columns"
               default-delete
               add-label="创建用户"
               search-placeholder="搜索昵称"
               :filter-group="filterGroup"
               @add="visible=true"
               @edit="edit"
               ref="gvbTable"
    >
      <template #avatar_id="{record}">
        <a-avatar :imageUrl="record.avatar_id"></a-avatar>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">

import gvb_table from "@/components/admin/gvb_table.vue";
import {userCreateApi, userListApi, userUpdateApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";
import type {actionOptionType} from "@/components/admin/gvb_table.vue";
import {reactive, ref} from "vue";
import type {filterOptionType} from "@/components/admin/gvb_table.vue";
import {roleIDListApi} from "@/api/role_api";
import type {RecodeType} from "@/components/admin/gvb_table.vue";
import User_create from "@/components/admin/user_create.vue";
import type {userUpdateRequest} from "@/api/user_api";
import {roleOptions} from "@/global/global";
import {Message} from "@arco-design/web-vue";

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



const visible = ref(false)
const gvbTable = ref()

function createOk(){
  gvbTable.value.getList()
}


const updateUserForm = reactive<userUpdateRequest>({
  nick_name:"",
  role: 0,
  user_id: 0,
})
const editVisible = ref(false)

function edit(record: RecodeType<userInfoType> ):void{
  updateUserForm.user_id = record.id
  updateUserForm.role = record.role_id
  updateUserForm.nick_name = record.nick_name
  editVisible.value = true
}

const formRef = ref()
async function updateUserOk() {
  let val = await formRef.value.validate()
  if (val) return false
  let res = await userUpdateApi(updateUserForm)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  gvbTable.value.getList()
  return true
}

</script>
