<template>
  <div id="wallpaper">
  <div id="setting-background">
  <main id="main" class="main" @scroll="handleScroll">
    <!-- 背景 -->

    <section class="sec1" id="sec1">
      <!-- 搜索框 -->
      <search class="search" :value="searchText"/>
      <BookMark/>
    </section>

    <section class="sec2" id="sec2">
      <BookMark/>
    </section>

    <!-- 设置标签页 -->
    <el-tabs
        v-model="page"
        type="border-card"
        closable
        class="el-tabs"
        tab-position="left"
        @tab-remove="removeTab"
    >
      <el-tab-pane
          v-for="item in tabs"
          :key="item.num"
          :label="item.title"
          :name="item.title"
          @click="scroll(item.num)"
      >
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><IconMenu /></el-icon>
            <span>{{ item.title }}</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="entries">
          <div @click="userPageClicked"><el-button round><el-icon><User /></el-icon></el-button></div>
          <div @click="settingVisibleState">
            <el-button round :loading="isSettingUploading">
              <el-icon v-show="settingUploadSuccess !== 0">
                <Close v-show="settingUploadSuccess === -1"/>
                <Check v-show="settingUploadSuccess === 1"/>
              </el-icon>
              <el-icon>
                <Setting />
              </el-icon>
            </el-button>
          </div>
        </div>

        <div id="user-page">
          <userPage 
            v-click-outside="handleClickOutsideUserPage"
            @pageHide="handleClickOutsideUserPage"
          />
        </div>

        <div id="setting-page">
          <settingPage
              v-click-outside="handleClickOutsideSettingPage"
          />
        </div>
  </main>
  </div>
  </div>
</template>


<script lang="js">
/**
 * 导入（import）
 */
import {computed, onBeforeUnmount, onMounted, ref} from "vue"
import { useStore } from "@/store"
import { useRoute } from "vue-router"
// 导入组件Component
import Search from "@/views/home/IndexSearch.vue"
import settingPage from '@/views/settingPage/settingPage.vue'
import BookMark from '@/views/home/BookMark.vue'
import userPage from '@/views/userPage/userPage.vue'
// 外部导入
import $ from 'jquery';
import { mapMutations } from "vuex";
import { useI18n } from 'vue-i18n'
import { Document, Menu as IconMenu, User, Setting, Close, Check } from '@element-plus/icons-vue'
import {BookMarkMutations} from "@/store/bookmark";
import {Tabs} from "ant-design-vue";
import {TabMutations} from "@/store/tab";
import axios from 'axios'

export default {
  data(){
    const store = useStore();
    return{
      settingVisible: false,
      imgStyle: computed(() => store.state.settings.imgStyle),
      backgroungImage: computed(() => store.state.settings.backgroundImg),
      tabs: computed(() => store.state.tab.Tabs),
      pageShadow: 0,
      settingUploadSuccess: 0
    }
  },
  methods:{
    ...mapMutations(['confirmPageColorStyle']),
    userPageClicked () {
      if(this.userId !== ""){
        // 个人页面
        this.userVisible = true
        this.pageShadow = 0.6
      } else {
        this.$router.push('/register')
      }
    },
    settingVisibleState () {
      this.settingVisible = true
      this.pageShadow = 0.6
      this.settingUploadSuccess = 0
    },
    handleClickOutsideUserPage(){
      this.userVisible = false
      this.pageShadow = 0
    },
    handleClickOutsideSettingPage(){
      this.settingVisible = false
      this.pageShadow = 0
      this.confirmPageColorStyle()
      if(this.store.state.settings.userId !== ""){
        this.isSettingUploading = true
        let data = {
          "Id": this.store.state.settings.userId,
          "backgroundColor": this.store.state.settings.pageColorStyle.backgroundColor.hex,
          "backgroundAlpha": this.store.state.settings.pageColorStyle.backgroundColor.alpha,
          "buttonColor": this.store.state.settings.pageColorStyle.buttonColor.hex,
          "buttonAlpha": this.store.state.settings.pageColorStyle.buttonColor.alpha,
          "customBackgroungColor": this.store.state.settings.pageColorStyle.customBackgroundColor,
          "customButtonColor": this.store.state.settings.pageColorStyle.customButtonColor,
          "presetColor": this.store.state.settings.pageColorStyle.presetColor,
          "fontColor": this.store.state.settings.pageColorStyle.fontColor,
          "searchItemCount": this.store.state.settings.searchItemCount
        }
        axios.post('http://localhost:2020/user/settings', data).then(response=>{
          if(response.data.code === 400){
            // 同步失败
            this.settingUploadSuccess = -1
            setTimeout(()=>{
              this.settingUploadSuccess = 0
            },5000)
          } else {
            this.settingUploadSuccess = 1
          }
          this.isSettingUploading = false
        },error=>{
          this.settingUploadSuccess = -1
          this.isSettingUploading = false
          console.log("ERROR:",error.message)
          setTimeout(()=>{
            this.settingUploadSuccess = 0
          },5000)
        })
      } else {
        this.settingUploadSuccess = -1
        setTimeout(()=>{
          this.settingUploadSuccess = 0
        },5000)
      }
    }
  },
  watch:{
    settingVisible(newVal, oldVal){
      if (newVal) {
        $("#setting-page").removeClass("slide_out").addClass("slide_in");
      } else {
        $("#setting-page").removeClass("slide_in").addClass("slide_out");
      }
    },
    backgroungImage(newVal, oldVal){
      if(newVal !== ""){
        $("#wallpaper").addClass("backgroundImg");
      } else {
        $("#wallpaper").removeClass("backgroundImg");
      }
    },
  },
  setup(){
    /**
     * 常/变量（const/let）的定义
     */
        // 导入路由和Vuex（状态管理）
    const route = useRoute()
    const store = useStore()
    const { t } = useI18n()

    const menu1 = ref(t('home.MainTab'))
    let page = 1
    const tabs =  computed(() => store.state.tab.Tabs)

    const handleScroll = () => {
      if (document.getElementById('main').scrollTop === 0) {
        document.getElementById('menu1').click()
      }
      if (document.getElementById('main').scrollTop === document.getElementById('main').clientHeight+16) {
        document.getElementById('menu2').click()
      }
    }

    const scroll = (sec) => {
      const element = document.getElementById('sec'+sec)
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      page = sec
    }

    const removeTab = (targetName) => {
      let activeName = page
      if (activeName === targetName) {
        tabs.value.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      console.log(activeName)
      tabs.value = tabs.value.filter((tab) => tab.name !== targetName)
    }

    onMounted(()=>{
      if(store.state.settings.backgroundImg !== ""){
        $("#wallpaper").addClass("backgroundImg");
      } else {
        $("#wallpaper").removeClass("backgroundImg");
      }
    })

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    return {
      page,
      menu1,
      handleScroll,
      scroll,
      removeTab,
      store,

      fixedSearch: computed(() => route.path !== "/"), // 是否固定搜索框
      searchText: computed(() => route.params.text), // 搜索框默认文本 // params 是 Vue Router 提供的一种路由参数获取方式，用于在路由中传递参数
      fontColor: computed(() => store.state.settings.buttonColor.hex),
      userId: computed(() => store.state.settings.userId)
    }
  },
  components:{
    Search,
    settingPage,
    userPage,
    BookMark,
    IconMenu,
    Setting,
    User,
    Close,
    Check
  }
}

</script>

<style scoped>
  /* .main-wrap 类表示页面的主体部分 */
  .main {
    scroll-snap-type: y mandatory; /* 定义垂直方向上的滚动对齐 */
    overflow: scroll; /* 溢出时出现滚动条 */
    overflow-x: hidden; /* 不允许水平方向上的滚动 */
    height: 100vh; /* 高度等于视窗高度 */

    justify-content: center; /* 将内容在水平方向上居中对齐 */
    align-items: center; /* 将内容在垂直方向上居中对齐 */
    row-gap: 42px; /* 将每个子元素之间的间距设置为 42 像素 */
  }

  #wallpaper{
    display: flex;
    //position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  #setting-background {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 100;
    transition: all 0.3s linear;
    background-color: v-bind("'rgba(0,0,0,' + pageShadow +')'");
  }

  #wallpaper.backgroundImg {
    background-image: v-bind("'url(\"' + backgroungImage + '\")'");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .sec1 {
    height: 100vh; /* 元素的高度为 viewport 的高度 */
    width: 100vw; /* 元素的宽度为 viewport 的宽度 */
    scroll-snap-align: start; /* 滚动时该元素的开始位置将与滚动容器的开始位置对齐 */

    display: flex; /* 盒类型：表示该元素应该采用 Flexbox 布局模型，使子元素能够在其中垂直或水平居中 */
    flex-direction: column; /* 设置弹性盒 flex 容器的主轴方向为纵向，即垂直排列子元素 */
    justify-content: center; /* 表示子元素应水平居中 */
    align-items: center; /* 表示子元素应垂直居中 */
    row-gap: 42px; /* 将每个子元素之间的间距设置为 42 像素 */
  }

  .sec2 {
    height: 100vh; /* 元素的高度为 viewport 的高度 */
    width: 100vw; /* 元素的宽度为 viewport 的宽度 */
    scroll-snap-align: start; /* 滚动时该元素的开始位置将与滚动容器的开始位置对齐 */
  }

  .el-tabs {
    position: fixed;
    top: 40%;
    left: 1%;
    z-index: 10;

    .custom-tabs-label .el-icon {
      vertical-align: middle;
    }
    .custom-tabs-label span {
      vertical-align: middle;
      margin-left: 4px;
    }
  }

  @import '@/font/font.css';
  body {
    font-family: serif;
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

  .entries{
    display: flex;
    flex-direction: row;
    font-family: 'SmileySans';
    justify-content: space-around;
    position: fixed;
    top: 5%;
    right: 5%;
    z-index: 0;
  }

  #user-page {
    width: 100%;
    height: 100%;
    position: fixed;
    top: -40%;
    left: 35%;
    transform: scale(0.1);
    z-index: -100;
    opacity: 0;
    transition: all 0.3s ease;
  }

  #user-page.slide_in{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) scale(1);
    z-index: 100;
    opacity: 1;
  }

  #user-page.slide_out{
    opacity: 0;
  }
</style>