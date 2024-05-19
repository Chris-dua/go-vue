<template>
  <div>首页
    <gvb_login v-model:visible="visible"></gvb_login>
    <a-button @click="visible = true">登陆</a-button>
    <gvb_theme></gvb_theme>
    <router-link to="/login">登陆</router-link>
    <router-link to="/admin">后台</router-link>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import Gvb_login from "@/components/common/gvb_login.vue";
import Gvb_theme from "@/components/common/gvb_theme.vue";

const visible = ref(false)
</script>



<style lang="scss">

</style>