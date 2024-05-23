<template>
  <div class="image_list_view">
    <a-modal title="图片上传" @before-open="beforeOpen" v-model:visible="visible" @ok="getList">
      <a-upload
          list-type="picture-card"
          action="/api/images"
          name="images"
          :headers="{token: store.userInfo.token}"
          v-model:file-list="fileList"
          image-preview
          class="gvb_image_upload"
          multiple
          @success="imageUploadSuccessEvent"
      ></a-upload>
    </a-modal>

    <gvb_table
        :url="imageListApi"
        :columns="columns"
        default-delete
        add-label="上传图片"
        no-confirm
        no-edit
        ref="gvbTable"
        search-placeholder="搜索图片名称"
        @add="visible=true">
      <template #path="{record}: {record: imageType}">
        <a-image :src="record.path" style="border-radius: 5px" height="50px"></a-image>
      </template>

      <template #action_left="{record}: {record: imageType}">
        <a style="margin-right: 10px" :href="record.path" download="record.name">
          <a-button type="primary">
            <template #icon>
              <IconDownload></IconDownload>
            </template>
            图片下载</a-button>
        </a>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">

import gvb_table from "@/components/admin/gvb_table.vue";
import {imageListApi, type imagesUploadResponse, type imageType} from "@/api/image_api";
import {h, ref} from "vue";
import type {filterOptionType} from "@/components/admin/gvb_table.vue";
import {roleIDListApi} from "@/api/role_api";
import {type FileItem, Message, Tag} from "@arco-design/web-vue";
import {IconDownload} from "@arco-design/web-vue/es/icon";
import type {baseResponse} from "@/api";
import {useStore} from "@/stores";

const columns = [
  {title: '文件名', dataIndex: 'name'},
  {
    title: '上传类型', dataIndex: 'image_type', render: ({record}: { record: imageType }) => {
      let color = "red"
      if (record.image_type === "本地") {
        color = "blue"
      }
      return h(Tag, {color: color}, {default: () => record.image_type})
    }
  },
  {title: '预览', slotName: 'path'},
  {title: 'banner数', dataIndex: 'bannerCount'},
  {title: '文章数', dataIndex: 'articleCount'},
  {title: '上传时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]


const filterGroup :filterOptionType[] = [
  {
    label:"角色过滤",
    value: 0,
    column: "role",
    source: roleIDListApi
  }
]


function add(){

}


const visible = ref(false)
const gvbTable = ref()

const store = useStore()
const fileList = ref<FileItem[]>([])
function beforeOpen() {
  // 清空数据
  fileList.value = []
}


function getList() {
  gvbTable.value.getList()
}

function imageUploadSuccessEvent(fileItem: FileItem) {
  const response = fileItem.response as baseResponse<imagesUploadResponse[]>
  if (response.data.length > 0) {
    // 找里面有没有 is_success 为false的
    response.data.forEach((item) => {
      if (!item.is_success) {
        Message.error(item.msg)
        return
      }
      Message.success(item.msg)
    })
  }
}



</script>

<style lang="scss">
.gvb_image_upload{
  .arco-upload-list-picture{
    width: inherit;
  }
}
</style>
