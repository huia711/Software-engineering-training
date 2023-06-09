<template>
  <div class="setting-layout">
    <template v-for="(item, index) of settingList" :key="item.key">
      <section class="setting-menu">
        <h3>
          <component v-if="item.icon" :is="item.icon" />
          {{ item.title }}
        </h3>
        <!-- 组件 -->
        <component :is="item.component" />
      </section>
      <!--分割线-->
      <el-divider v-if="index < settingList.length - 1" />
    </template>
  </div>
</template>

<script lang="ts" setup type="module">
  /**
   * 导入（import）
   */
  import { computed } from "vue"
  import type { DefineComponent, FunctionalComponent, Ref } from "vue"
  import { useStore } from "@/store"
  // 导入组件Component
  import ThemeMode from "./ThemeMode.vue"
  import SearchSetting from "./SearchSetting.vue"
  import BackgroundSetting from "./BackgroundSetting.vue"
  // import TopSiteSetting from "./TopSiteSetting.vue"
  // import LayoutSetting from "./LayoutSetting.vue"
  import OtherSetting from "./OtherSetting.vue"
  // 外部导入
  import { useI18n } from "vue-i18n"
  import {
    BgColorsOutlined,
    SearchOutlined,
    PictureOutlined,
    InsertRowAboveOutlined,
    AppstoreOutlined,
    ControlOutlined
  } from "@ant-design/icons-vue"

  /**
   * 自定义类型（type）的定义
   */
  interface SettingItem {
    key: string
    title: string | Ref<string>
    icon?: FunctionalComponent
    component: DefineComponent
    skip?: boolean | Ref<boolean>
  }

  /**
   * 常/变量（const/let）的定义
   */
  const { t } = useI18n()
  const store = useStore()

  /**
   * 响应式对象（reactive,computed）
   */
  const settingList = computed<Array<SettingItem>>(() =>
    [
      {
        key: "ThemeMode",
        title: t("theme.setting"),
        icon: BgColorsOutlined,
        component: ThemeMode
      },
      {
        key: "SearchSetting",
        title: t("search.setting"),
        icon: SearchOutlined,
        component: SearchSetting
      },
      {
        key: "BackgroundSetting",
        title: t("background.setting"),
        icon: PictureOutlined,
        component: BackgroundSetting
      },
      // {
      //   key: "LayoutSetting",
      //   title: t("layout.setting"),
      //   icon: InsertRowAboveOutlined,
      //   component: LayoutSetting
      // },
      // {
      //   key: "TopSiteSetting",
      //   title: t("topsite.setting"),
      //   icon: AppstoreOutlined,
      //   component: TopSiteSetting,
      //   skip: !store.state.setting.topSite.enable
      // },
      {
        key: "OtherSetting",
        title: t("other.setting"),
        icon: ControlOutlined,
        component: OtherSetting
      },
      // {
      //   key: "About",
      //   title: t("about.text"),
      //   component: About
      // }
    ].filter(item => !item.skip)
  )
</script>


<style lang="less">
  .setting-layout {
    .setting-menu > h3 {
      margin-bottom: 12px;
    }
  }
</style>
