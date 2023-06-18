<template>
  <main class="main">
    <!-- 搜索框 -->
    <search class="search" :value="state.searchText"/>

<!--    <section class="sec1">-->
<!--      &lt;!&ndash;    &lt;!&ndash; 过渡效果组件 &ndash;&gt;&ndash;&gt;-->
<!--      &lt;!&ndash;    <transition name="fade">&ndash;&gt;-->
<!--      &lt;!&ndash;      <top-site v-if="state.enableTopSite" v-show="!state.fixedSearch" />&ndash;&gt;-->
<!--      &lt;!&ndash;    </transition>&ndash;&gt;-->
<!--    </section>-->

<!--    <section class="sec2">-->
<!--      &lt;!&ndash;    &lt;!&ndash; 过渡效果组件 &ndash;&gt;&ndash;&gt;-->
<!--      &lt;!&ndash;    <transition name="fade">&ndash;&gt;-->
<!--      &lt;!&ndash;      <top-site v-if="state.enableTopSite" v-show="!state.fixedSearch" />&ndash;&gt;-->
<!--      &lt;!&ndash;    </transition>&ndash;&gt;-->
<!--    </section>-->

    <div class="temp">
      <router-link to="/register" style="text-decoration: none; color: black;">
        <modernButton
          :custom-button-style="state.imgStyle"
          srcPath="./src/img/userHead.png"
          textUnderButton="User"
        />
      </router-link>
      
      <modernButton
          id="setting-button"
          :custom-button-style="state.imgStyle"
          srcPath="./src/img/setting.png"
          @buttonClicked="settingPageStateChange(true)"
          textUnderButton="settings"
      />
    </div>

    <div id="setting-page">
      <settingPage
          @close="settingPageStateChange(false)"
          :pageState="state.settingPageClicked"
      />
    </div>
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
  import {computed, reactive, watch} from "vue"
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

  import loginPage from '@/views/loginPage.vue';
  import settingPage from '@/views/settingPage/settingPage.vue';
  import modernButton from '@/components/basis/modernButton.vue';
  import $ from 'jquery';

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
    settingPageClicked: false,

    enableTopSite: computed(() => stateX.setting.topSite.enable), // 是否显示顶部网站
    enableWallpaper: computed(() => stateX.setting.background.type !== BackgroundType.None), // 是否有壁纸
    imgStyle: computed(()=>stateX.settings.imgStyle)
  })

  const settingPageStateChange = (stat: boolean) => {
    state.settingPageClicked = stat
  }

  watch(() => state.settingPageClicked, (newVal: boolean, oldVal: boolean) => {
    if (newVal) {
      $("#setting-page").removeClass("slide_out").addClass("slide_in");
    } else {
      $("#setting-page").removeClass("slide_in").addClass("slide_out");
    }
  })
</script>

<style>
  /* .main-wrap 类表示页面的主体部分 */
  .main {
    justify-content: center; /* 将内容在水平方向上居中对齐 */
    align-items: center; /* 将内容在垂直方向上居中对齐 */
    row-gap: 42px; /* 将每个子元素之间的间距设置为 42 像素 */
    overflow: hidden;
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

  @import '@/font/font.css';
  body {
    font-family: SmileySans,serif;
  }
  .temp{
    display: flex;
    flex-direction: column;
    font-family: 'SmileySans';
    justify-content: space-around;
    position: fixed;
    top: 5%;
    left: 90%;
    z-index: 0;
  }

  #setting-page{
    width: 100%;
    height: 100%;
    position: fixed;
    top: -30%;
    left: 40%;
    transform: scale(0.1);
    z-index: -100;
    opacity: 0;
    transition: all 0.3s ease;
  }

  #setting-page.slide_in{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1);
    z-index: 100;
    opacity: 1;
  }

  #setting-page.slide_out{
    opacity: 0;
  }
</style>