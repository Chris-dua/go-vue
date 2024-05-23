<template>
  <div class="site_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="站点配置"></gvb_title>
        <a-form ref="formRef" :model="siteForm" :label-col-props="{span: 5}" :wrapper-col-props="{span:16}">
          <a-form-item field="title" label="网站标题" :rules="[{required:true,message:'请输入网站标题'}]"
                       :validate-trigger="['blur']">
            <a-input v-model="siteForm.title" placeholder="网站标题"></a-input>
          </a-form-item>
          <a-form-item field="bei_an" label="备案号">
            <a-input v-model="siteForm.bei_an" placeholder="备案号"></a-input>
          </a-form-item>
          <a-form-item field="version" label="版本号">
            <a-input v-model="siteForm.version" placeholder="版本号"></a-input>
          </a-form-item>
          <a-form-item field="created_at" label="建站日期">
            <a-input v-model="siteForm.created_at" placeholder="建站日期"></a-input>
          </a-form-item>
        </a-form>
      </div>
      <div class="site_config_update">
        <a-button type="primary" @click="siteInfoUpdate">更新</a-button>
      </div>
    </div>
    <div class="right">
      <div class="user_info">
        <gvb_title title="用户信息"></gvb_title>
        <a-form :model="siteForm" :label-col-props="{span: 3}" :wrapper-col-props="{span:18}">
          <a-form-item label="昵称">
            <a-input v-model="siteForm.name" placeholder="昵称"></a-input>
          </a-form-item>
          <a-form-item label="工作">
            <a-input v-model="siteForm.job" placeholder="工作"></a-input>
          </a-form-item>
          <a-form-item label="地址">
            <a-input v-model="siteForm.addr" placeholder="地址"></a-input>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model="siteForm.email" placeholder="邮箱"></a-input>
          </a-form-item>
        </a-form>
      </div>
      <div class="link_info">
        <gvb_title title="链接信息"></gvb_title>
        <a-form :model="siteForm" :label-col-props="{span: 3}" :wrapper-col-props="{span:18}">
          <a-form-item label="github">
            <a-input v-model="siteForm.github_url" placeholder="github"></a-input>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {type settingsName, type siteInfoType, siteInfoUpdateApi} from "@/api/settings_api.js";
import Gvb_title from "@/components/common/gvb_title.vue";
import {siteInfoApi} from "@/api/settings_api.js";
import {Message} from "@arco-design/web-vue";

const siteForm = reactive<siteInfoType>({
  created_at: "",
  bei_an: "",
  title: "",
  version: "",
  email: "",
  name: "",
  job: "",
  addr: "",
  github_url: "",
})



async function getData(params:settingsName) {
  let res = await siteInfoApi(params)
  Object.assign(siteForm, res.data)
}
getData("site")
const formRef = ref()

async function siteInfoUpdate(){
let val =  await formRef.value.validate()
  if(val) return
  let res = await siteInfoUpdateApi("site", siteForm)
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