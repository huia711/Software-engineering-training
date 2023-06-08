<template>
  <div v-if="isDark" class="Dark">
    <div class="Light">
    </div>
  </div>
  <slot/>
</template>

<script lang="ts" type="module">
// 导入必要的类型和定义
import type { InjectionKey, Ref } from "vue"
import { LanguageType, ThemeMode } from "@/enum-interface"

// 定义主题提供者键的全局数据标识符
export const CURRENT_THEME_KEY: InjectionKey<Ref<ThemeMode>> = Symbol.for("")
</script>

<script lang="ts" setup type="module">
/**
 * 导入（import）
 */
import { computed, provide, watchEffect, defineProps, withDefaults } from "vue"
// 外部
import dayjs from "@/plugins/dayjs"
import { usePreferredDark } from "@/utils/use"
import { useI18n } from "vue-i18n"

import { useDark, useToggle } from '@vueuse/core'

/**
 * 自定义类型（type）的定义
 */
interface ThemeProviderProps {
  theme: ThemeMode // 主题模式
  lang: LanguageType // 语言类型
}

/**
 * 常/变量（const/let）的定义
 */
const prop = withDefaults(defineProps<ThemeProviderProps>(), {
  theme: ThemeMode.Auto,
  lang: LanguageType.Auto
})

// 获取本地化工具用于国际化日期格式和语言设置
const { locale } = useI18n()
// 获取用户的首选主题设置
const isDark = usePreferredDark()


/**
 * 使用 computed 进行响应计算（自动跟踪）
 * 这里用于实现自动选择
 */
// 当前主题，使用computed自动更新：如果props传入主题为 "auto" 并且prefer-dark为真，则返回 "dark" 主题，否则返回 "light" 主题
const currentTheme = computed(() => {
  const { theme } = prop
  if ( theme === ThemeMode.Auto) {
    return isDark.value ? ThemeMode.Dark : ThemeMode.Light
  } else {
    return theme
  }
})

// 当前语言，使用computed自动更新：如果props传入语言为 "auto" 则返回浏览器的当前语言配置，否则返回props传入的语言
const currentLang = computed(() => {
  const { lang } = prop
  return lang === LanguageType.Auto ? navigator.language : lang
})

/**
 * 使用 watchEffect 进行响应计算（自动跟踪）
 * 这里用于更新 DOM
 */
// 监听并设置主题
watchEffect(() => {
  //
  let isDark = currentTheme.value === ThemeMode.Dark
  // 获取 HTML 元素节点
  const html = document.body.parentElement

  // 设置 HTML 元素节点的一个自定义属性 data-theme 的属性值
  html.setAttribute("data-theme", isDark ? "dark" : "light")
  console.log(isDark)
})

// 监听并设置语言
watchEffect(() => {
  const lang = currentLang.value

  locale.value = lang
  dayjs.locale(lang.toLowerCase())
})

// 从本组件的依赖中提供当前主题
provide(CURRENT_THEME_KEY, currentTheme)
</script>





<!--虽然 watchEffect 和 computed 都是响应式数据的派生值，但是它们有着本质的区别。-->
<!-- - 数据来源不同： computed 的派生值是根据其他响应式数据计算得出的，而 watchEffect 中的回调函数可以使用任何数据，并且可以包含副作用。-->
<!-- - 执行时机不同： computed 的派生值是惰性求值的，只会在依赖的响应式数据发生变化时才重新计算；而 watchEffect 中的回调函数在初始化时会执行一次，并在其中追踪响应式数据的变化来执行相应的副作用，即使没有使用到任何响应式数据也会立即执行一次。-->
<!-- - 返回值不同： computed 返回一个新的响应式数据，而 watchEffect 不返回数据，仅在回调函数中执行副作用。-->
<!--因此，可以简单地总结为：computed 用于派生新的响应式数据并对数据进行操作，而 watchEffect 用于在特定的数据变化时执行副作用。-->
<!--在实际开发中，通常可以根据不同的需求来选择使用 computed 或 watchEffect。如果需要用到 computed 的特殊属性（如：get 或 set），或需要计算出一个新的响应式数据，可以使用 computed。而如果需要执行一些副作用操作（如：更新 DOM，发送请求等），则应该使用 watchEffect-->