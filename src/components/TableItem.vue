<template>
  <el-table
      :data="content"
      style="width: 100%"
      height="100%"
      size="large"
      highlight-current-row
      :row-class-name="tableRowClassName"
  >
    <el-table-column prop="range" label="排行" width="100" />
    <el-table-column prop="name" label="标题" width="400" />
  </el-table>
</template>

<script lang="ts" setup>
  import {defineProps, withDefaults} from "vue/dist/vue";
  import axios from "@/plugins/axios";
  import {ElMessage} from "element-plus";
  import {onBeforeMount} from "vue";

  interface ContentIndex {
    range: number
    name: string
    url: string
  }
  interface Content {
    content?: ContentIndex
    type: string
    }

  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
  });

  let content:ContentIndex[] = []
  console.log(props.type)

  async function getContent(): Promise<string[]> {
    if ((props.type) === undefined) {
      return []
    } else {
      try {
        await axios.get('http://localhost:2020/user/getMoreInfo?type='+props.type).then(response => {
          if (response.data.code === 200 && response.data.data !== null) {
            console.log("dd")
            const Content = response.data.data.data
            console.log(Content)
            content = Content.map(item => JSON.parse(`{"range":"${item.range}", "name":"${item.name}", "url":"${item.url}"}`))
            console.log(content)
          }
          return content
        }, (error) => {
          ElMessage({
            message: "无法连接服务器",
            type: 'warning',
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const tableRowClassName = ({
                               row,
                               rowIndex,
                             }: {
    rowIndex: number
  }) => {
    if (rowIndex === 0) {
      return 'warning-row'
    } else {
      return 'success-row'
    }
  }

  // onBeforeMount：生命周期函数之一，组件的实例被创建后，mounted生命周期函数被调用之前
  onBeforeMount(getContent)

</script>

<style>

  .el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
  }
  .el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
</style>