<template>
  <main class="main">
    <!-- 搜索框 -->
    <search class="search" :value="state.searchText"/>

    <section class="sec1">
      <!--    &lt;!&ndash; 过渡效果组件 &ndash;&gt;-->
      <!--    <transition name="fade">-->
      <!--      <top-site v-if="state.enableTopSite" v-show="!state.fixedSearch" />-->
      <!--    </transition>-->
    </section>

    <section class="sec2">
      <!--    &lt;!&ndash; 过渡效果组件 &ndash;&gt;-->
      <!--    <transition name="fade">-->
      <!--      <top-site v-if="state.enableTopSite" v-show="!state.fixedSearch" />-->
      <!--    </transition>-->
    </section>

    <!-- 设置按钮 -->
    <div class="setting">
      <el-button @click="state.settingVisible = true" round>
        <setting-outlined style="font-size: 18px" />
      </el-button>
    </div>

    <!-- 设置抽屉 -->
    <el-drawer v-model="state.settingVisible" :size="400" :show-close="false" close-on-press-escape destroy-on-close>
      <setting/>
    </el-drawer>
  </main>

<!--  &lt;!&ndash; 壁纸 &ndash;&gt;-->
<!--  <div class="wallpaper-wrap">-->
<!--    <suspense>-->
<!--      <wallpaper v-if="state.enableWallpaper" />-->
<!--    </suspense>-->
<!--  </div>-->
</template>

<script lang="ts" setup>
  /**
   * 导入（import）
   */
  import { computed, reactive } from "vue"
  import { useStore } from "@/store"
  import { useRoute } from "vue-router"
  // 导入组件Component
  import Search from "@/views/home/IndexSearch.vue"
  import Setting from "@/views/setting/IndexSetting.vue"
  import TopSite from "@/home/TopSite.vue"
  import Wallpaper from "@/views/home/WallPaper.vue"
  // 外部导入
  import { SettingOutlined } from "@ant-design/icons-vue"
  import { BackgroundType } from "@/enum-interface"

  /**
   * 常/变量（const/let）的定义
   */
  // 导入路由和Vuex（状态管理）
  const route = useRoute()
  const { state: stateX } = useStore()

  /**
   * 响应式对象（reactive,computed）
   */
  // 组件本地状态 // 使用 reactive 函数
  // 创建一个名为 state 的响应式对象（与vuex无关）
  const state = reactive({
    fixedSearch: computed(() => route.path !== "/"), // 是否固定搜索框
    searchText: computed(() => route.params.text), // 搜索框默认文本 // params 是 Vue Router 提供的一种路由参数获取方式，用于在路由中传递参数
    settingVisible: false, // 设置抽屉是否打开
    enableTopSite: computed(() => stateX.setting.topSite.enable), // 是否显示顶部网站
    enableWallpaper: computed(() => stateX.setting.background.type !== BackgroundType.None) // 是否有壁纸
  })
</script>

<style>
  /* .main-wrap 类表示页面的主体部分 */
  .main {
    //scroll-snap-type: y mandatory; /* 定义垂直方向上的滚动对齐 */
    //overflow: scroll; /* 溢出时出现滚动条（滚动模组） */
    //overflow-x: hidden; /* 不允许水平方向上的滚动 */

    //display: flex; /* 将显示方式设置为 Flex 布局 */
    //flex-direction: column; /* 将主轴方向从默认的水平方向改为垂直方向 */
    justify-content: center; /* 将内容在水平方向上居中对齐 */
    align-items: center; /* 将内容在垂直方向上居中对齐 */
    row-gap: 42px; /* 将每个子元素之间的间距设置为 42 像素 */
  }

  .sec1 {
    height: 100vh; /* 元素的高度为 viewport 的高度 */
    width: 100vw; /* 元素的宽度为 viewport 的宽度 */
    scroll-snap-align: start; /* 滚动时该元素的开始位置将与滚动容器的开始位置对齐 */

    display: flex; /* 盒类型：表示该元素应该采用 Flexbox 布局模型，使子元素能够在其中垂直或水平居中 */
    flex-direction: column; /* 设置弹性盒 flex 容器的主轴方向为纵向，即垂直排列子元素 */
    justify-content: center; /* 表示子元素应水平居中 */
    align-items: center; /* 表示子元素应垂直居中 */
  }

  .sec2 {
    height: 100vh; /* 元素的高度为 viewport 的高度 */
    width: 100vw; /* 元素的宽度为 viewport 的宽度 */
    scroll-snap-align: start; /* 滚动时该元素的开始位置将与滚动容器的开始位置对齐 */
  }

  .setting {
    position: fixed;
    top: 3%;
    right: 3%;
    z-index: 10;

    transition: 0.3s linear;
  }
  .setting:hover {
    transform: scale(1.15); /* 缩放比例增加到 1.02 */
  }

  .wallpaper {
    position: fixed;
    width: 100%;
    height: 100%;

    top: 0;
    z-index: -10;
  }
</style>