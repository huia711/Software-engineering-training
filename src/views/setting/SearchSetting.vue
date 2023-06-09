<template>
  <div class="search-setting">
    <!--管理搜索引擎-->
    <setting-item horizontal>
      <template #lable>
        <span>{{ t("search.engine") }}</span>
      </template>

      <el-select v-model = "currentEngine" style="width: 90px">
        <el-option v-for="(value, key) in searchEngines" :value="key" :key="key" :label="value.name">
          {{ value.name }}
        </el-option>
      </el-select>
    </setting-item>

    <!--管理接口-->
    <setting-item horizontal>
      <template #lable>
        <span>{{ t("search.suggestApi") }}</span>
      </template>

      <el-select v-model = "searchSetting.suggestion" style="width: 100px" placement="bottom">
        <el-option :value="SearchSuggestion.none" > 不使用 </el-option>
        <el-option :value="SearchSuggestion.baidu"> 百度 API </el-option>
        <el-option :value="SearchSuggestion.bing"> Bing API </el-option>
        <el-option :value="SearchSuggestion.google"> Google API </el-option>
      </el-select>
    </setting-item>

<!--    <setting-item :lable="t('search.searchRound')">-->
<!--      <a-slider-->
<!--        v-model:value="searchSetting.searchInputRadius"-->
<!--        :max="22"-->
<!--        :tip-formatter="toPixel"-->
<!--      />-->
<!--    </setting-item>-->

    <setting-item :lable="t('search.newTabOpen')" horizontal>
      <el-switch v-model = "isOpenPageByBlank" />
    </setting-item>

    <setting-item :lable="t('search.showEngineIcon')" horizontal>
      <el-switch v-model = "searchSetting.showEngineIcon" />
    </setting-item>

    <setting-item :lable="t('search.showEngineSelet')" horizontal>
      <el-switch v-model = "searchSetting.showEngineSelect" />
    </setting-item>
  </div>

<!--  <a-drawer v-model:visible="manageVisible" title="管理搜索引擎" :width="400" destroy-on-close>-->
<!--    <search-manage />-->
<!--  </a-drawer>-->
</template>

<script lang="ts" setup type="module">
  /**
   * 导入（import）
   */
  import { ref, computed } from "vue"
  import { useStore } from "@/store"
  import { SearchGetters } from "@/store/search"
  import { SettingMutations } from "@/store/setting"
  // 导入组件Component
  import SettingItem from "@/components/SettingItem.vue"
  // 导入外部定义
  import { OpenPageTarget, SearchEngineData, SearchSetting, Option, SearchSuggestion } from "@/enum-interface"
  // 外部导入
  import { useI18n } from "vue-i18n"

  /**
   * 常/变量（const/let）的定义
   */
  const { t } = useI18n()
  const store = useStore()
  const { state: stateX } = useStore()

  /**
   * 响应式对象（reactive,computed）
   */
  const searchSetting = computed(() => stateX.setting.search)
  const searchEngines = computed<SearchEngineData>(() => store.getters[SearchGetters.getUseSearchEngines])
  const currentEngine = computed({
    get: () => searchSetting.value.currentEngine,
    // 在 set 函数中，更新 store 中的搜索设置
    set: currentEngine => updateSearchSetting({ currentEngine })
  })

  // 是否在新标签页中打开
  const isOpenPageByBlank = computed({
    get: () => store.state.setting.search.openPageTarget === OpenPageTarget.Blank,
    set: isOpenPageByBlank =>
      updateSearchSetting({
        openPageTarget: isOpenPageByBlank ? OpenPageTarget.Blank : OpenPageTarget.Self
      })
  })

  /**
   * 函数（function）定义
   */
  function updateSearchSetting(data: Option<SearchSetting>) {
    store.commit(SettingMutations.updateSearchSetting, data)
  }
</script>

<style lang="less">
//@import "@/style/default.less";

.search-setting {
  .engine-setting {
    //color: @primary-color;
    margin-left: 4px;
    font-size: 12px;
  }
}
</style>
