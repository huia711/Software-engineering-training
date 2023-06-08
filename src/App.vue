<template>

  <!-- ConfigProvider 组件用来管理 全局的主题和语言配置 -->
  <config-provider :theme="themeMode" :lang="lang">
    <!--router:路由表——组件与 URL 之间的映射-->
    <router-view/>
  </config-provider>
</template>

<script lang="ts" setup>
import { computed , ref} from "vue"
import { useStore } from "@/store"
import ConfigProvider from "@/components/ConfigProvider.vue"

import { useDark, useToggle } from '@vueuse/core'


// 从 useStore 中获取 state 对象和其他方法和属性
const { state } = useStore()

// 使用 computed 进行响应计算（自动跟踪）
const themeMode = computed(() => state.setting.themeMode)
const lang = computed(() => state.setting.lang)

// //
// const checked = ref()
// const html = document.documentElement;
// const link = document.createElement("link");
// link.rel = "stylesheet";
// link.type = "text/css";
// const head = document.getElementsByTagName("head")[0];
// head.appendChild(link);
// const theme = ref()
// const isDark = useDark({
//   selector: 'html',
//   attribute: 'data-doc-theme',
//   valueDark: 'dark',
//   valueLight: 'light',
//   onChanged(dark) {
//
//     if (dark) {
//       document.body.setAttribute("data-theme", "dark")
//       html.setAttribute('data-doc-theme', 'dark');
//       html.style.colorScheme = "dark";
//       link.href = "/style/dark.css";
//       checked.value =true
//       console.log(1);
//
//     } else {
//       document.body.setAttribute("data-theme", "light")
//       html.setAttribute('data-doc-theme', 'light');
//       html.style.colorScheme = "light";
//       link.href = "";
//       checked.value = false
//       // console.log(checked.value);
//     }
//
//   },
// })

// const toggleDark = useToggle(isDark)
</script>

<style>
</style>
