<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
      <div class="action_create" v-if="!props.noAdd">
        <a-button type="primary" @click="add">{{addLabel}}</a-button>
      </div>
      <div class="action_group" v-if="!noActionGroup">
        <a-select placeholder="操作" style="width: 120px;" allow-clear
                  :options="actionOptions" v-model="actionValue"></a-select>
        <a-popconfirm content="是否确认执行此操作?" v-if="!props.noConfirm" @ok="actionMethod">
        <a-button type="primary" status="danger" v-if="actionValue !== undefined">执行</a-button>
        </a-popconfirm>
      </div>
      <div class="action_search">
        <a-input-search
            placeholder="搜索用户名、昵称"
            v-model="params.key" @keydown.enter="searchEvent"
            @search="searchEvent"></a-input-search>
      </div>
      <slot name="action_other_search"></slot>
      <div class="action_filter" v-if="filterGroup.length">
        <a-select
            :placeholder="item.label"
            :options="item.options"
            allow-clear
            @change="filterChange(item, $event)"
            v-for="item in filterGroup"></a-select>
      </div>
      <slot name="action_slot"></slot>
      <div class="action_flush">
        <a-button @click="flush">
          <IconRefresh></IconRefresh>
        </a-button>
      </div>
    </div>
    <div class="gvb_table_data">
        <div class="gvb_table_source">
          <a-table :row-key=rowKey :columns="props.columns" :data="data.list"
                   :row-selection="props.noCheck ? undefined : rowSelection"
                   v-model:selectedKeys="selectedKeys" :pagination="false">
            <template #columns>
              <template v-for="item in props.columns">
                <a-table-column v-if="item.render" :title="item.title as string">
                  <template #cell="data">
                    <component :is="item.render(data) as Component"></component>/
                  </template>
                </a-table-column>
                <a-table-column v-else-if="!item.slotName" :title="item.title as string"
                                :data-index="item.dataIndex"></a-table-column>
                <a-table-column :title="item.title as string" v-else>
                  <template #cell="{record}" v-if="item.slotName==='action'">
                    <div class="gvb_cell_actions">
                      <a-button type="primary" @click="edit(record)">编辑</a-button>
                      <a-popconfirm v-if="!props.noDelete" content="是否确认删除?" @ok="remove(record)">
                      <a-button status="danger" type="primary">删除</a-button>
                      </a-popconfirm>
                    </div>
                  </template>
                  <template #cell="{record}" v-else-if="item.slotName === 'create_at'">
                    <span>{{dataTimeFormat(record.create_at) }}</span>
                  </template>
                  <template v-else #cell="{record}">
                    <slot :name="item.slotName" :record="record"></slot>
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>


        </div>
        <div class="gvb_table_page">
          <a-pagination :total="data.count" @change="pageChange" v-model:current="params.page" :default-page-size="params.limit" show-total show-jumper/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {type baseResponse, defaultDeleteApi, type userListParamsType} from "@/api";
import type{listDataType} from "@/api"
import type {userInfoType} from "@/api/user_api";
import {type Component, onErrorCaptured, reactive, ref} from "vue";
import {Message, type TableColumnData, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import {dataTimeFormat} from "@/utils/data";
import type {optionType} from "@/types";
import {defaultOptionApi} from "@/api";


export interface actionOptionType{
  label: string
  value?: string|number
  callback?: (idList: (number|string)[]) => Promise<boolean>
}

type filterFunc = (params?: userListParamsType) => Promise<baseResponse<optionType[]>>
export interface filterOptionType {
  label: string
  value?: number
  column: string
  source: optionType[] | string | filterFunc
  options?: optionType[]
}

const props = defineProps<Props>()

interface Props {
  url: (params: userListParamsType) => Promise<baseResponse<listDataType<any>>> // 请求列表数据的api函数
  columns: TableColumnData[] // 字段
  limit?: number // 显示多少条，默认10条
  rowKey?: string // 选中的时候，按照什么选，默认是id
  addLabel?: string // 添加按钮的提示文字
  defaultDelete?: boolean // 是否启用默认删除
  noActionGroup?: boolean// 不启用操作组
  actionGroup?: actionOptionType[], // 操作组
  noCheck?: boolean // 不能选择
  filterGroup?: filterOptionType[], // 过滤组
  noConfirm?: boolean // 关闭二次确认
  noAdd?: boolean // 没有添加
  noEdit?: boolean // 没有编辑
  noDelete?: boolean // 没有单独的删除
  searchPlaceholder?: string // 模糊匹配的提示词
  // defaultParams?: paramsType & any //第一次查询的查询参数
}
const data = reactive<listDataType<any>>({
  list: [],
  count: 0,
})

const {
  limit = 10,
  rowKey = "id",
  addLabel = "添加",
  searchPlaceholder = "搜索"
} = props

const params = reactive(<userListParamsType>{
  page:1,
  limit:limit,
  key:""
})
async function getList(p?:userListParamsType & any){
  if (p){
    Object.assign(params,p)
  }
  let res = await props.url(params)
  data.list = res.data.list
  data.count = res.data.count
}

getList()

function pageChange() {
  getList()
}

function searchEvent(){
  params.page = 1
  getList()
}

function flush(){
  Message.success("刷新成功")
  getList()
}

const selectedKeys = ref<number[]|string[]>([])

const rowSelection = reactive<TableRowSelection>(
    {
      type: 'checkbox',
      showCheckedAll:true,
      onlyCurrent: false,
    }
)

const emits = defineEmits(["add", "edit", "remove"])



// 操作组
const actionOptions = ref<actionOptionType[]>([
  {label: "批量删除", value: 0},
])

function filterChange(item: any, val: any) {
  getList({[item.column]: val})
}



function initActionGroup() {
  if (!props.actionGroup) return
  for (let i = 0; i < props.actionGroup.length; i++) {
    actionOptions.value.push({
      label: props.actionGroup[i].label,
      value: i + 1,
      callback: props.actionGroup[i].callback
    })
  }
}

initActionGroup()

const actionValue = ref<number | undefined>(undefined)

function actionMethod(){
  if(actionValue.value === 0){
    if(selectedKeys.value.length === 0){
      Message.warning("请选择要删除的记录")
      return
    }
    removeIdData(selectedKeys.value)
    return;
  }
  const action = actionOptions.value[actionValue.value as number]
  if(!action.callback){
    return;
  }
  action.callback(selectedKeys.value).then(res=>{
    if(res){
      selectedKeys.value = []
      getList()
      return
    }
  })
}

const urlRegex = /return useAxios.get\("(.*?)", .*?\)/

async function remove(record: TableData){
  let id = record[rowKey]
  removeIdData([id])
}

async function removeIdData(idList: (number|string)[]){
  if(props.defaultDelete){
    let regexResult = urlRegex.exec(props.url.toString())
    if(regexResult === null || regexResult.length !== 2) {
      return
    }
    let res = await defaultDeleteApi(regexResult[1], idList)
    if(res.code){
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    getList()
    return
  }
  emits("remove",idList)
}

// 过滤
const filterGroup = ref<filterOptionType[]>([])

async function initFilterGroup() {
  if (!props.filterGroup) return
  for (let i = 0; i < props.filterGroup.length; i++) {
    // 处理source的数据
    const item = props.filterGroup[i]
    let source: optionType[] = []
    switch (typeof item.source) {
      case "function":

        let res1 = await (item.source as filterFunc)()
        source = res1.data
        break
      case "object":
        source = (item.source as optionType[])
        break
      case "string":
        // 请求接口
        let res2 = await defaultOptionApi(item.source as string)
        source = res2.data
        break
    }

    filterGroup.value.push({
      label: item.label,
      value: i,
      column: item.column,
      options: source,
      source: item.source
    })
  }
}

initFilterGroup()




function add(){
  emits("add")
}

function edit(record: TableData){
  console.log(record.avatar_id)
  emits("edit",record)
}


</script>



<style scoped lang="scss">
.gvb_table{
  background-color: var(--color-bg-1);
  border-radius: 5px;
  .gvb_table_head{
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    position: relative;
    >div{
      margin-right: 10px;
    }
    .action_group{
      display: flex;
      button{
        margin-left: 10px;
      }
    }
    .action_filter{
      display: flex;
      >.arco-select{
        margin-left: 10px;
      }
    }

    .action_flush{
      position: absolute;
      right: 20px;
      margin-right: 0;
      button{
        padding: 0 10px;
      }
    }
    .action_create{

    }
  }
  .gvb_table_data{
    padding: 10px 20px 20px 20px;
    .gvb_table_source{
      .gvb_cell_actions{
        >button{
          margin-right: 10px;
          &:last-child{
            margin-right: 0px;
          }
        }
      }
    }
    .gvb_table_page{
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }

}
</style>