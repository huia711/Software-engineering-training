<template>
  <!-- 搜索框的外层容器 -->
  <div class="search" ref="searchWarp">

    <!-- 如果配置项中要求，显示搜索引擎图标 -->
    <div class="search-logo"  v-if="searchSetting.showEngineIcon">
      <img :src="searchEngines[currentEngine].icon" class="logo" alt="logo" draggable="false"/>
    </div>

    <!-- 输入框容器 -->
    <a-affix :offset-top="100">
    <div class="search-input" ref="searchInput">
      <!--自动完成搜索建议-->
      <a-auto-complete v-model:value="searchText"
                       :open="showComplete"
                       :options="searchSuggestion"
                       :defaultActiveFirstOption="false"
                       :get-popup-container= "() => searchWarp"
                       size="large"
                       autofocus
                       backfill
                       style="width: 100%"
                       @search="debounceSearchSuggestion"
                       @select="showComplete = false"
      >
        <!-- 搜索输入框，按下回车键或点击搜索按钮时触发搜索事件 -->
        <a-input-search :placeholder="t('home.search')"
                        size="large"
                        @keydown="onSwitchEngines"
                        @search="onSearch"
                        @click="showComplete = true"
                        @blur="showComplete = false"
        >
          <!-- 搜索引擎选项卡 -->
          <template #addonBefore v-if="searchSetting.showEngineSelect">
            <a-select v-model:value="currentEngine" style="width: 90px">
              <a-select-option v-for="(value, key) in searchEngines" :value="key" :key="key">
                {{ value.name }}
              </a-select-option>
            </a-select>
          </template>
        </a-input-search>
      </a-auto-complete>
    </div>
    </a-affix>

  </div>
</template>

<script lang="ts" setup type="module">
  import { useStore } from "@/store" // 引入 Vuex 的 useStore 依赖
  import { SearchActions, SearchGetters } from "@/store/search" // 引入搜索业务模块中的 Actions 和 Getters
  import { SettingMutations } from "@/store/setting" // 引入设置业务模块中的 Mutations
  import { Option, SearchEngineData, SearchSetting } from "@/enum-interface" // 引入一些用于标记类型的枚举或接口类型
  import { debounce } from "@/utils/async" // 引入一个工具函数用于实现防抖操作
  import { isEmpty } from "@/utils/common" // 引入一个工具函数用于判断一个值是否为空
  import { ref, computed, watch, nextTick } from "vue" // 引入一些 Vue 3 中的 Composition API，用于处理响应式的数据和方法
  import { useI18n } from "vue-i18n" // 引入国际化库（vue-i18n）的 useI18n 依赖
  import { defineProps } from '@vue/runtime-core';
  import {message} from "ant-design-vue";

  interface SearchProps {
    // 控制搜索框是否固定在页面顶部或底部
    fixed?: boolean
    // 设置搜索框的默认值
    value?: string
  }

  interface SuggestionItem {
    // 联想项的标题
    title?: string
    // 联想项的值
    value: string
  }

  // 使用 useI18n 函数，获取当前的国际化信息
  const { t } = useI18n()
  // 使用 useStore 函数，获取 store 对象，并解构出需要用到的 state，getters，commit，dispatch 函数
  const { state: stateX, getters, commit, dispatch } = useStore()
  // 使用 defineProps 函数，获取 component 的 prop，支持 Prop 类型定义和默认值
  const props = defineProps<SearchProps>()

  // 定义 reactive 变量，并使用 computed 进行响应计算 // 自动追踪 stateX.setting.search 的变化，当 stateX.setting.search 发生改变时，会自动重新计算 searchSetting 的值，并将新的值缓存起来，以便后续的使用。
  const showComplete = ref(false),
    searchWarp = ref<HTMLElement>(),
    searchEngines = computed(() => getters[SearchGetters.getUseSearchEngines]),
    searchSetting = computed(() => stateX.setting.search),
    searchInputRadius = computed(() => `${searchSetting.value.searchInputRadius}px`),
    searchSuggestion = ref<SuggestionItem[]>()
  // 当前搜索引擎  // 通过 computed 计算属性，获取用于修改搜索设置的半 reactive 对象 // 可读可写
  const currentEngine = computed({
    get: () => searchSetting.value.currentEngine,
    // 在 set 函数中，更新 store 中的搜索设置
    set: currentEngine => updateSearchSetting({ currentEngine })
  })
  // const currentEngine = searchSetting

  // 搜索内容
  const searchText = ref(props.value)
  // 监听 props 值的变化，用于实现搜索框赋初始值
  watch(
    () => props.value,
    value => (searchText.value = value ?? "")
  )

  // 当fixed变化时添加动画
  const searchInput = ref<Element>()
  // 监听 fixed 值的变化，添加动画效果
  watch(
    () => props.fixed,
    () => {
      const $el = searchInput.value
      const first = $el.getBoundingClientRect()

      // 获取新位置并添加动画  // NOTICE：使用 nextTick() 可以避免在 mounted 阶段 DOM 未完全渲染的问题
      nextTick(() => {
        const last = $el.getBoundingClientRect(),
          invertY = first.y - last.y,
          invertX = first.x - last.x

        $el.animate(
          [{ transform: `translate(${invertX}px ,${invertY}px)` }, { transform: "translate(0, 0)" }],
          {
            duration: 300,
            easing: "cubic-bezier(0,0,0.32,1)"
          }
        )
      })
    }
  )

  /**
   * 搜索框搜索事件
   * 将搜索内容重定向到搜索引擎
   */
  function onSearch(search: string) {
    if (isEmpty(search))
      message.warn(t('home.warning'))
    else
      dispatch (SearchActions.submitSearch, search)
  }

  /**
   * 搜索建议自动完成处理
   * 获取搜索建议数据
   */
  const debounceSearchSuggestion = debounce(handleSearchSuggestion)
  async function handleSearchSuggestion(value: string) {
    if (isEmpty(value)) {
      searchSuggestion.value = []
    } else {
      const suggestion: string[] = await dispatch(SearchActions.getSuggestion, value)
      searchSuggestion.value = suggestion.map(item => ({ value: item }))
    }
  }

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

  // 定义 updateSearchSetting 函数，用于更新搜索设置 // Option<SearchSetting>:可能包含SearchSetting类型的值或者空值（即 null 或 undefined）的类型
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
  //row-gap: 64px;

  .search-logo img {
    height: 64px;
    width: auto;
  }

  // 输入框容器
  .search-input {
    width: 700px;

    overflow: hidden;  /* 当子元素的高度大于父元素时，隐藏溢出的部分 */
    background-color: rgba(50, 59, 88, 0.7); /* 设置元素的背景颜色为半透明的深蓝色 */
    border-radius: 10px; /* 设置元素的圆角为 10 像素 */
    box-shadow: 0 0 10px rgba(50, 59, 88, 0.8); /* 添加阴影效果，使元素产生视觉上的浮起感 */
    backdrop-filter: blur(5px); /* 使用模糊效果 */
    transition: 0.3s linear; /* 设置元素过渡的持续时间为 0.3 秒，过渡方式为线性（hover的时候） */

    .ant-input {
      height: 44px;
    }

    .ant-input-search-button {
      height: 44px;
      width: 72px;
    }
    .ant-input-search-button:hover {
      transform: scale(1.02); /* 缩放比例增加到 1.02 */
    }

    .ant-input-group-addon:first-child .ant-select-selection-search {
      display: none;
    }

    // 去除搜索按钮底色（防止在设置壁纸后白底）
    .ant-input-group-addon:last-child {
      background-color: transparent;
    }
  }

  .search-input:hover {
    transform: scale(1.02); /* 缩放比例增加到 1.02 */
  }
}

[data-theme="dark"] {
  .search-warp.fixed {
    background-color: rgba(0, 0, 0, 0.5);
  }

  // 深色模式搜索按钮半透明
  .ant-input-search-button {
    opacity: 0.5;
  }
}
</style>
