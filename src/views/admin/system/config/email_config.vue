<template>
  <div class="site_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="邮箱配置"></gvb_title>
        <a-form ref="formRef" :model="emailForm" :label-col-props="{span: 5}" :wrapper-col-props="{span:18}">
          <a-form-item field="host" label="邮箱域名" :rules="[{required:true,message:'请输入邮箱域名'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="emailForm.host" placeholder="邮箱域名"></a-input>
          </a-form-item>
          <a-form-item field="port" label="邮箱端口" :rules="[{required:true,message:'请输入邮箱端口'}]"
                       :validate-trigger="['blur']">
            <a-input-number v-model="emailForm.port"  placeholder="邮箱端口"></a-input-number>
          </a-form-item>
          <a-form-item field="user" label="发信邮箱" :rules="[{required:true,message:'请输入发信邮箱'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="emailForm.user" placeholder="发信邮箱"></a-input>
          </a-form-item>
          <a-form-item field="password" label="密码" :rules="[{required:true,message:'密码'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="emailForm.password" type="password" placeholder="密码"></a-input>
          </a-form-item>
          <a-form-item field="default_from_email" label="发信名称" :rules="[{required:true,message:'发信名称'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="emailForm.default_from_email" placeholder="发信名称"></a-input>
          </a-form-item>
          <a-form-item field="use_ssl" label="ssl" :rules="[{required:true,message:'ssl'}]">
            <a-switch v-model="emailForm.use_ssl"></a-switch>
          </a-form-item>
          <a-form-item field="user_tls" label="tls" :rules="[{required:true,message:'ssl'}]">
            <a-switch v-model = "emailForm.user_tls"></a-switch>
          </a-form-item>
        </a-form>
      </div>
      <div class="email_config_update">
        <a-button type="primary" @click="emailInfoUpdate">更新</a-button>
      </div>
    </div>
    <div class="right">
<!--      <div class="user_info">-->
<!--        <gvb_title title="用户信息"></gvb_title>-->
<!--        <a-form :model="siteForm" :label-col-props="{span: 3}" :wrapper-col-props="{span:18}">-->
<!--          <a-form-item label="昵称">-->
<!--            <a-input v-model="siteForm.name" placeholder="昵称"></a-input>-->
<!--          </a-form-item>-->
<!--          <a-form-item label="工作">-->
<!--            <a-input v-model="siteForm.job" placeholder="工作"></a-input>-->
<!--          </a-form-item>-->
<!--          <a-form-item label="地址">-->
<!--            <a-input v-model="siteForm.addr" placeholder="地址"></a-input>-->
<!--          </a-form-item>-->
<!--          <a-form-item label="邮箱">-->
<!--            <a-input v-model="siteForm.email" placeholder="邮箱"></a-input>-->
<!--          </a-form-item>-->
<!--        </a-form>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {type emailType, type siteInfoType, siteInfoUpdateApi} from "@/api/settings_api.js";
import Gvb_title from "@/components/common/gvb_title.vue";
import {siteInfoApi} from "@/api/settings_api.js";
import {Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

const emailForm = reactive<emailType>({
  host: "",
  port: 0,
  user: "",
  password: "",
  default_from_email: "",
  use_ssl: true,
  user_tls: false,
})



async function getData() {
let res = await siteInfoApi("email") as baseResponse<emailType>
  if(res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(emailForm, res.data)
}
getData()
const formRef = ref()

async function emailInfoUpdate(){
  let val =  await formRef.value.validate()
  if(val) return
  let res = await siteInfoUpdateApi("email", emailForm)
  if(res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}
</script>
<style lang="scss">
.site_config {
  display: flex;
  .left{
    width: 50%;

    .site_config_update{
      margin-top: 10px;
    }
  }
  .arco-form{
    margin-top: 10px;
  }
  .right{
    width: 50%;
  }
}
</style>