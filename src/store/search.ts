/**
 * 导入（import）
 */
import {createStoreModule} from "./index"
import {SearchData, SearchEngineData, SearchEngineItem, } from "@/enum-interface"
import {isEmpty} from "@/utils/common"
import {getBaiduSuggestion, getBingSuggestion, getGoogleSuggestion} from "@/api/suggestion"
import {SearchSuggestion} from "@/enum-interface";

/**
 * 自定义类型（type）的定义
 */
// state
export interface SearchState {
  searchEngines: SearchEngineData // 搜索引擎列表
  // history: Array<HistoryItem>  // 搜索历史记录
  // rules: RuleDataMap // 规则列表
}

// getter
export enum SearchGetters {
  getUseSearchEngines = "GET_USE_SEARCH_ENGINES" // 获取正在使用的搜索引擎
}

// mutation
export enum SearchMutations {
  // putHistory = "PUT_HISTORY", // 添加一条搜索历史
  // deleteHistory = "DELETE_HISTORY", // 删除指定的搜索历史
  // cleanHistory = "CLEAN_HISTORY", // 清空搜索历史
  // loadHistory = "LOAD_HISTORY", // 加载搜索历史
  addSearchEngine = "ADD_SEARCH_ENGINE", // 添加一个搜索引擎
  deleteSearchEngine = "DELETE_SEARCH_ENGINE" // 删除一个搜索引擎
}

// action
export enum SearchActions {
  submitSearch = "SUBMIT_SEARCH", // 提交搜索
  openSearchPage = "OPEN_SEARCH_PAGE", // 在新标签页中打开搜索页面
  getSuggestion = "GET_SUGGESTION" // 获取联想建议
}

/**
 * 常/变量（const/let）的定义
 */
// 用于本地存储搜索引擎的key
const SEARCH_ENGINES_STORAGE = "search-engines"
// // 用于本地存储搜索历史记录的key
// const SEARCH_HISTORY_STORAGE = "search-history"
// // 搜索历史记录的最大长度
// const SEARCH_HISTORY_LENGTH = 100

// 匹配指定模式的文件导入到一个对象中
// const ruleModules = import.meta.glob<true, string, Rule>("/src/rules/*.json", { eager: true })
// 将所有规则文件解析成一个规则列表数组
// const rules: Rules = Object.values(ruleModules)

// 之后存到数据库
export const searchEnginesData: SearchEngineData = {
  google: {
    id: "google",
    name: "Google",
    baseUrl: "https://www.google.com/search?q=",
    icon: "img/google.png",
    icon_select: "img/google_select.jpg"
  },
  bing: {
    id: "bing",
    name: "Bing",
    baseUrl: "https://www.bing.com/search?q=",
    icon: "img/bing.svg",
    icon_select: "img/bing_select.jpg"
  },
  baidu: {
    id: "baidu",
    name: "百度",
    baseUrl: "https://www.baidu.com/s?wd=",
    icon: "img/baidu.png",
    icon_select: "img/baidu_select.jpg"
  }
};

/**
 * 默认导出（export default）定义
 * module的定义
 */
// 建一个Vuex的模块（module），并且将模块的状态类型指定为SearchState。
export default createStoreModule<SearchState>({
  /**
   * state
   */
  state() {
    // 设置默认状态值
    const defaultState: SearchState = {
      searchEngines: { ...searchEnginesData },
      // history: [],
      // rules: Object.fromEntries(rules.map(item => [item.id, new RuleData(item)]))
    }

    // // 从本地存储中读取搜索引擎列表
    // const searchEngines = JSON.parse(localStorage[SEARCH_ENGINES_STORAGE] ?? "{}")
    // // 将本地存储中读取到的搜索引擎列表合并到默认状态中
    // Object.assign(defaultState.searchEngines, searchEngines)

    return defaultState
  },

  /**
   * getters
   */
  getters: {
    /**
     * 获取需要使用的搜索引擎列表
     */
    [SearchGetters.getUseSearchEngines]: ({ searchEngines }, _, rootState) => {
      const useSearchEngines = rootState.setting.search.useSearchEngines!,
          temp: SearchEngineData = {}

      for (const id of useSearchEngines) {
        temp[id] = searchEngines[id]
      }
      return temp
    }
  },

  /**
   * mutations
   */
  mutations: {
  //   /**
  //    * 添加搜索历史
  //    * @param param0
  //    * @param newHistory
  //    */
  //   [SearchMutations.putHistory]: (state, newHistory: HistoryItem) => {
  //     let history: Array<HistoryItem> = JSON.parse(localStorage[SEARCH_HISTORY_STORAGE] ?? "[]")
  //
  //     // 去重并在头添加
  //     history = history.filter(item => item.searchText !== newHistory.searchText)
  //     history.unshift(newHistory)
  //
  //     state.history = history
  //     saveSearchHistory(history)
  //   },
  //
  //   /**
  //    * 删除搜索历史
  //    * @param param0
  //    * @param index
  //    */
  //   [SearchMutations.deleteHistory]: (state, index: number) => {
  //     const history: Array<HistoryItem> = JSON.parse(localStorage[SEARCH_HISTORY_STORAGE] ?? "[]")
  //     history.splice(index, 1)
  //
  //     state.history = history
  //     saveSearchHistory(history)
  //   },
  //
  //   /**
  //    * 加载搜索历史
  //    * @param state
  //    */
  //   [SearchMutations.loadHistory]: state => {
  //     const history: Array<HistoryItem> = JSON.parse(localStorage[SEARCH_HISTORY_STORAGE] ?? "[]")
  //     state.history = history
  //   },
  //
  //   /**
  //    * 清除所有搜索历史
  //    * @param state
  //    */
  //   [SearchMutations.cleanHistory]: state => {
  //     state.history = []
  //     localStorage.removeItem(SEARCH_HISTORY_STORAGE)
  //   },
  //
  //   // 添加自定义搜索引擎
  //   [SearchMutations.addSearchEngine]: (state, data: SearchEngineItem) => {
  //     const searchEnginesNew = {
  //       ...state.searchEngines,
  //       [data.id]: data
  //     }
  //
  //     state.searchEngines = searchEnginesNew
  //     // saveSearchEngineData(searchEnginesNew)
  //   },
  //
  //   // 删除自定义搜索引擎
  //   [SearchMutations.deleteSearchEngine]: (state, searchKey: string) => {
  //     const searchEnginesNew = deepClone(state.searchEngines, searchKey)
  //
  //     state.searchEngines = searchEnginesNew
  //     // saveSearchEngineData(searchEnginesNew)
  //   }
  },

  /**
   * action
   */
  actions: {
    /**
     * 提交搜索
     */
    [SearchActions.submitSearch]: async ({ rootState, commit, dispatch }, search: string) => {
      // 去除搜索内容前后的空格
      const searchTrim = search.trim()

      // 获取搜索设置信息，并获取正在使用的搜索引擎和打开搜索结果的方式
      const setting = rootState.setting.search
      const currentEngine = rootState.setting.search.currentEngine
      const target = setting.openPageTarget!

      // // 将搜索历史记录包装成一个对象，并提交到 mutations 中更新 state
      // const history: HistoryItem = {
      //   engineId: currentEngine,
      //   searchText: searchTrim,
      //   timestamp: Date.now()
      // }
      // commit(SearchMutations.putHistory, history)

      // 组装搜索数据，包括搜索引擎、搜索内容和打开方式
      const data: SearchData = {
        engine: currentEngine,
        text: searchTrim,
        target: setting.openPageTarget!
      }

      // 执行 openSearchPage action，打开搜索页面
      await dispatch(SearchActions.openSearchPage, data)
    },

    //打开搜索页面
    [SearchActions.openSearchPage]: ({ state, rootState }, search: SearchData) => {
      const { engine, text, target } = search

      // 打开搜索结果
      const { searchEngines } = state
      const url = searchEngines[engine].baseUrl + text
      // url 是要打开的 URL 地址，target 是打开窗口的目标位置
      window.open(url, target)

    },

    /**
     * 获取搜索建议
     */
    [SearchActions.getSuggestion]: ({ rootState }, searchText: string) => {
      const setting = rootState.setting.search

      switch (setting.suggestion) {
        case SearchSuggestion.baidu:
          // 如果搜索设置开启了百度搜索引擎的自动联想功能，调用 getBaiduSuggestion() 方法获取联想列表
          return getBaiduSuggestion(searchText)
        case SearchSuggestion.bing:
          // 如果搜索设置开启了必应搜索引擎的自动联想功能，调用 getBingSuggestion() 方法获取联想列表
          return getBingSuggestion(searchText)
        case SearchSuggestion.google:
          // 如果搜索设置开启了谷歌搜索引擎的自动联想功能，调用 getGoogleSuggestion() 方法获取联想列表
          return getGoogleSuggestion(searchText)
        default:
          // 如果搜索设置没有开启自动联想功能，返回一个空数组
          return []
      }
    }
  }
})

