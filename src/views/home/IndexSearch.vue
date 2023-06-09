<template>
  <!-- 搜索框的外层容器 -->
  <div class="search" ref="searchWarp">

    <!-- 如果配置项中要求，显示搜索引擎图标 -->
    <div class="search-logo"  v-if="searchSetting.showEngineIcon">
      <img :src="searchEngines[currentEngine].icon" class="logo" alt="logo" draggable="false" />
    </div>

    <!-- 输入框容器 -->
    <el-affix offset="100" position="top">
      <div class="search-input" ref="searchInput">
          <!--自动完成搜索建议-->
  <!--          <el-autocomplete v-model:value="searchText"-->
  <!--                           :open="showComplete"-->
  <!--                           :options="searchSuggestion"-->
  <!--                           :defaultActiveFirstOption="false"-->
  <!--                           :get-popup-container= "() => searchWarp"-->
  <!--                           size="large"-->
  <!--                           autofocus-->
  <!--                           backfill-->
  <!--                           style="width: 100%"-->
  <!--                           @search="debounceSearchSuggestion"-->
  <!--                           @select="showComplete = false"-->

            <!-- 搜索输入框，按下回车键或点击搜索按钮时触发搜索事件 -->
            <el-input :placeholder="t('home.search')"
                      v-model="inputSearch"
                      type="text"
                      class="input-with-select"
                      size="large"
                      clearable
                      autofocus
                      @keyup.enter = "onSearch(inputSearch)"
                      @keydown="onSwitchEngines"
                      @focus="showComplete = true"
                      @blur="showComplete = false"
            >
              <!-- 搜索引擎选项卡 -->
              <template #prepend v-if="searchSetting.showEngineSelect">
                <el-select v-model = "currentEngine" >
  <!--                <template #prefix>-->
  <!--                  <span style="padding-left: 5px;">-->
  <!--                    <img :src="searchEngines[currentEngine].icon_select" class="select-logo" alt="select-logo" draggable="false" />-->
  <!--                  </span>-->
  <!--                </template>-->
                  <el-option v-for = "(value, key) in searchEngines" :value="key" :key="key" :label="value.name">
                    {{ value.name }}
                  </el-option>
                </el-select>
              </template>
              <!-- 搜索按钮 -->
              <template #append>
                <el-button :icon="Search" @click = "onSearch(inputSearch)"></el-button>
              </template>
            </el-input>
  <!--          </el-autocomplete>-->
      </div>
    </el-affix>
  </div>
</template>

<script lang="ts" setup type="module">
  /**
   * 导入（import）
   */
  import { useStore } from "@/store"
  import { SearchActions, SearchGetters } from "@/store/search" // 引入搜索业务模块中的 Actions 和 Getters
  import { SettingMutations } from "@/store/setting" // 引入设置业务模块中的 Mutations
  import { ref, computed, watch, nextTick } from "vue"
  // 导入外部定义
  import { Option, SearchEngineData, SearchSetting } from "@/enum-interface" // 引入一些用于标记类型的枚举或接口类型
  import { debounce } from "@/utils/async" // 引入一个工具函数用于实现防抖操作
  import { isEmpty } from "@/utils/common" // 引入一个工具函数用于判断一个值是否为空
  // 外部导入
  import { useI18n } from "vue-i18n"
  import { ElNotification } from "element-plus"
  import { Search } from '@element-plus/icons-vue'

  // interface SuggestionItem {
  //   // 联想项的标题
  //   title?: string
  //   // 联想项的值
  //   value: string
  // }

  /**
   * 常/变量（const/let）的定义
   */
  // 使用 useI18n 函数，获取当前的国际化信息
  const { t } = useI18n()
  // 使用 useStore 函数，获取 store 对象，并解构出需要用到的 state，getters，commit，dispatch 函数
  const { state: stateX, getters, commit, dispatch } = useStore()
  // 搜索框输入值的变量
  let inputSearch = ref("")

  /**
   * 响应式对象（reactive,computed）
   */
  // 定义 reactive 变量，并使用 computed 进行响应计算 // 自动追踪 stateX.setting.search 的变化，当 stateX.setting.search 发生改变时，会自动重新计算 searchSetting 的值，并将新的值缓存起来，以便后续的使用。
  const showComplete = ref(false),
    searchWarp = ref<HTMLElement>(),
    searchEngines = computed(() => getters[SearchGetters.getUseSearchEngines]),
    searchSetting = computed(() => stateX.setting.search)
    // searchInputRadius = computed(() => `${searchSetting.value.searchInputRadius}px`)
    // searchSuggestion = ref<SuggestionItem[]>()

  // 当前搜索引擎  // 可读可写（set）
  const currentEngine = computed({
    get: () => searchSetting.value.currentEngine,
    // 在 set 函数中，更新 store 中的搜索设置
    set: currentEngine => updateSearchSetting({ currentEngine })
  })

  // // 当fixed变化时添加动画
  // const searchInput = ref<Element>()
  // // 监听 fixed 值的变化，添加动画效果
  // watch(
  //   () => props.fixed,
  //   () => {
  //     const $el = searchInput.value
  //     const first = $el.getBoundingClientRect()
  //
  //     // 获取新位置并添加动画  // NOTICE：使用 nextTick() 可以避免在 mounted 阶段 DOM 未完全渲染的问题
  //     nextTick(() => {
  //       const last = $el.getBoundingClientRect(),
  //         invertY = first.y - last.y,
  //         invertX = first.x - last.x
  //
  //       $el.animate(
  //         [{ transform: `translate(${invertX}px ,${invertY}px)` }, { transform: "translate(0, 0)" }],
  //         {
  //           duration: 300,
  //           easing: "cubic-bezier(0,0,0.32,1)"
  //         }
  //       )
  //     })
  //   }
  // )

  /**
   * 函数（function）定义
   */

  /**
   * 搜索框搜索事件
   * 将搜索内容重定向到搜索引擎
   */
  function onSearch(search: string) {
    if (isEmpty(search))
      ElNotification({
        title: 'Warning',
        message: t('home.warning'),
        type: 'warning',
      })
    else
      dispatch (SearchActions.submitSearch, search)
  }

  /**
   * 搜索建议自动完成处理
   * 获取搜索建议数据
   */
  // const debounceSearchSuggestion = debounce(handleSearchSuggestion)
  // async function handleSearchSuggestion(value: string) {
  //   if (isEmpty(value)) {
  //     searchSuggestion.value = []
  //   } else {
  //     const suggestion: string[] = await dispatch(SearchActions.getSuggestion, value)
  //     searchSuggestion.value = suggestion.map(item => ({ value: item }))
  //   }
  // }

  /**
   * 搜索框按 Tab / Shift+Tab
   * 切换当前的搜索引擎
   */
  function onSwitchEngines(e: KeyboardEvent) {
    // 如果按下的不是 Tab 键，直接返回
    if (e.key !== 'Tab') return

    // 取消 Tab 键的默认行为
    e.preventDefault()

    // 获取所有搜索引擎的键值 // Object.keys:获取其所有的键名 // searchEngines 是一个对象，它包含了三个搜索引擎的配置信息
    const engineKeys = Object.keys(searchEngines.value)
    // 计算搜索引擎数量
    const length = engineKeys.length
    // 获取当前搜索引擎的索引
    let currentIndex = engineKeys.indexOf(currentEngine.value)
    // 根据按下的 Shift 键，判断是向前还是向后切换搜索引擎
    currentIndex += e.shiftKey ? -1 : 1
    // 计算新的搜索引擎键值  // 三种情况
    // 如果新的索引值小于 0，就返回最后一个搜索引擎键值 // 如果新的索引值小于搜索引擎数量，就返回当前索引对应的搜索引擎键值 // 如果新的索引值大于搜索引擎数量，就返回第一个搜索引擎键值
    currentEngine.value = currentIndex < 0 ? engineKeys[length - 1] : currentIndex < length ? engineKeys[currentIndex] : engineKeys[0]
  }

  /**
   * 更新搜索设置
   */
   // Option<SearchSetting>:可能包含SearchSetting类型的值或者空值（即 null 或 undefined）的类型
  function updateSearchSetting(data: Option<SearchSetting>) {
    // commit 是 Vuex 中的一个核心方法，用于提交 mutation
    commit(SettingMutations.updateSearchSetting, data)
  }
</script>


<style lang="less">

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  row-gap: 64px;

  .search-logo img {
    height: 64px;
    width: auto;
  }

  // 输入框容器
  .search-input {
    width: 700px;

    overflow: hidden;  /* 当子元素的高度大于父元素时，隐藏溢出的部分 */
    border-radius: 10px; /* 设置元素的圆角为 10 像素 */

    box-shadow: 0 0 10px rgba(50, 59, 88, 0.8); /* 添加阴影效果，使元素产生视觉上的浮起感 */
    backdrop-filter: blur(5px); /* 使用模糊效果 */

    transition: 0.3s linear; /* 设置元素过渡的持续时间为 0.3 秒，过渡方式为线性（hover的时候） */

    // el的输入框
    .el-input {
      height: 44px;
    }

    //el的按钮
    .el-button {
      height: 44px;
      width: 72px;

      transition: 0.3s linear;
    }
    .el-button:hover {
      transform: scale(1.3); /* 缩放比例增加到 1.02 */
    }

    // el的选择框
    .el-select {
      width: 100px;

      transition: 0.3s linear;
    }
    .el-select:hover {
      transform: scale(1.05);
    }
    //.select-logo {
    //  height: 15px;
    //}
  }

  .search-input:hover {
    transform: scale(1.02); /* 缩放比例增加到 1.02 */
  }
}

//[data-theme="dark"] {
//  .search-warp.fixed {
//    background-color: rgba(0, 0, 0, 0.5);
//  }
//
//  // 深色模式搜索按钮半透明
//  .el-button {
//    opacity: 0.5;
//  }
//}
</style>
