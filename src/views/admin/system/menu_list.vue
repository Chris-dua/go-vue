<template>
  <div class="menu_list_view">
    <gvb_table :url="menuListApi"
               :columns="columns"
               default-delete
               add-label="创建用户"
               no-check
               no-action-group
               search-placeholder="搜索菜单名称"
               @add="visible=true"
               @edit="edit"
               ref="gvbTable">
      <template #banners="{record}:{record:menuType}">
        <div class="menu_column_image">
          <a-image v-for="item in record.banners" :key="item.id" :src="item.path" height="40px"></a-image>
        </div>
      </template>
    </gvb_table>
  </div>
</template>
<script setup lang="ts">
import gvb_table from "@/components/admin/gvb_table.vue";
import {menuListApi} from "@/api/menu_api";
import {ref} from "vue";
import type {menuType} from "@/api/menu_api";

const columns = [
    {title:"菜单列表", dataIndex:"title"},
  {title:"路径", dataIndex:"path"},
  {title: "slogan", dataIndex:"slogan"},
  {title: "简介", dataIndex:"abstract"},
  {title: "slogan切换时间", dataIndex: "banner_time"},
  {title: "简历切换时间", dataIndex:"abstract_time"},
  {title: "banner", slotName: "banners"},
  {title: "更新时间", slotName: "create_at"},
  {title: "操作", slotName: "action"},
];
const visible = ref(false)
function edit(record: menuType) {

}
</script>



<style lang="scss">
.menu_list_view {
  .menu_column_image {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 5px;
    .arco-image-img{
      border-radius: 5px;
    }
  }
}
</style>