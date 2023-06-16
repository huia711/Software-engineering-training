import { createStoreModule } from "./index"
// import { getBrowserTopSites, getFavicon } from "@/plugins/extension"
import { SortData, TopSiteItem, TopSites } from "@/enum-interface"
import { copy } from "@/utils/common"
import { debounce } from "@/utils/async"
// import { verifyImageUrl } from "@/utils/file"

export interface TopSiteState {
  topSites: TopSites
  lastUpdateTime?: number
}

export interface TopSiteItemVo extends TopSiteItem {
  index: number
}

export enum TopSiteGetters {
  getCurrentTopSites = "GET_CURRENT_TOP_SITES"
}

export enum TopSiteMutations {
  addTopSite = "ADD_TOP_SITE",
  updateTopSite = "UPDATE_TOP_SITE",
  deleteTopSite = "DELETE_TOP_SITE",
  sortTopSites = "SORT_TOP_SITES",
  updateTopSites = "UPDATE_TOP_SITES",
  editLastUpdateTime = "EDIT_LAST_UPDATE_TIME"
}

export enum TopSiteActions {
  syncBrowserTopSites = "SYNC_BROWSER_TOP_SITES"
}

const TOP_SITE_STORAGE = "top-site-data"

// createStoreModule：创建一个Vuex模块
export default createStoreModule<TopSiteState>({

  // state
  state() {
    const defaultState: TopSiteState = {
      // 创建一个数组保存网站
      topSites: [],
      lastUpdateTime: undefined
    }

    const topSitesData = JSON.parse(localStorage[TOP_SITE_STORAGE] ?? "[]")
    copy(topSitesData, defaultState, true)

    return defaultState
  },

  // getter
  getters: {
    /**
     * 获取当前的导航栏数据
     * @param param0
     * @param rootState
     * @returns
     */
    [TopSiteGetters.getCurrentTopSites]: ({ topSites }, _, rootState) => {
      // 从根状态中获取topSite配置对象
      const topSiteSetting = rootState.setting.topSite
      // 根据配置筛选出前topSiteSetting.col * topSiteSetting.row项网站数据
      return topSites.filter((_item, index) => index < topSiteSetting.col * topSiteSetting.row)
    }
  },
  mutations: {
    /**
     * 添加单个导航
     * @param state
     * @param data
     */
    [TopSiteMutations.addTopSite]: (state, data: TopSiteItem) => {
      state.topSites.push(data)
      saveTopSiteState(state)
    },
    /**
     * 更新单个导航
     * @param state
     * @param data
     */
    [TopSiteMutations.updateTopSite]: (state, data: TopSiteItemVo) => {
      state.topSites[data.index] = data
      saveTopSiteState(state)
    },

    /**
     * 删除导航
     * @param state
     * @param index
     */
    [TopSiteMutations.deleteTopSite]: (state, index: number) => {
      state.topSites.splice(index, 1)
      saveTopSiteState(state)
    },

    /**
     * 对导航栏排序
     * @param state
     * @param sort
     */
    [TopSiteMutations.sortTopSites]: (state, sort: SortData) => {
      const topSites = state.topSites
      const from = topSites[sort.from]

      topSites.splice(sort.from, 1)
      topSites.splice(sort.to, 0, from)
      saveTopSiteState(state)
    },

    /**
     * 更新导航栏
     * @param state
     * @param topSites
     */
    [TopSiteMutations.updateTopSites]: (state, topSites: TopSites) => {
      state.topSites = topSites
      saveTopSiteState(state)
    },

    // /**
    //  * 更新上次更新时间
    //  * @param state
    //  * @param newTime
    //  */
    // [TopSiteMutations.editLastUpdateTime]: (state, newTime: number) => {
    //   state.lastUpdateTime = newTime
    //   saveTopSiteState(state)
    // }
  }
  // actions: {
  //   /**
  //    * 同步浏览器导航
  //    * 从浏览器获取最近浏览
  //    * @param param0
  //    */
  //   [TopSiteActions.syncBrowserTopSites]: async ({ state, commit }) => {
  //     const now = Date.now()
  //     const customTopSites = state.topSites.filter(item => item.custom)
  //     const list = await getBrowserTopSites()
  //
  //     // 并行校验图标是否有效
  //     const topSites = await Promise.all(
  //       list.map<Promise<TopSiteItem>>(async item => {
  //         const icon = item.favicon || getFavicon(item.url)
  //         const verify = await verifyImageUrl(icon)
  //
  //         return {
  //           title: item.title ?? "无标题",
  //           url: item.url,
  //           icon: verify ? icon : undefined,
  //           textIcon: !verify,
  //           custom: false
  //         }
  //       })
  //     )
  //
  //     console.log("load browser top-sites:", `${Date.now() - now}ms`)
  //     commit(TopSiteMutations.updateTopSites, customTopSites.concat(topSites))
  //     commit(TopSiteMutations.editLastUpdateTime, now)
  //   }
  // }
})

// 保存数据节流防抖
const saveTopSiteState = debounce((data: TopSiteState) => {
  const settingJson = JSON.stringify(data)
  localStorage.setItem(TOP_SITE_STORAGE, settingJson)
}, 250)
