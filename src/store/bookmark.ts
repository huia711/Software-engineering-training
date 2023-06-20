/**
 * 导入（import）
 */
import { createStoreModule } from "./index"
// import { getBrowserTopSites, getFavicon } from "@/plugins/extension"
import { SortData, BookMarkItem, BookMarks } from "@/enum-interface"
import { copy } from "@/utils/common"
import { debounce } from "@/utils/async"
// import { verifyImageUrl } from "@/utils/file"

/**
 * 自定义类型（type）的定义
 */
// state
export interface BookMarkState {
  bookMarks: BookMarks
  lastUpdateTime?: number
}

//
export interface BookMarkItemVo extends BookMarkItem {
  index: number
}

// getter
export enum BookMarkGetters {
  getCurrentBookMarks = "GET_CURRENT_BOOK_MARK"
}

// mutations
export enum BookMarkMutations {
  addBookMark = "ADD_BOOK_MARK",
  updateBookMark = "UPDATE_BOOK_MARK",
  deleteBookMark = "DELETE_BOOK_MARK",
  sortBookMarks = "SORT_BOOK_MARKS",
  updateBookMarks = "UPDATE_BOOK_MARKS",
  editLastUpdateTime = "EDIT_LAST_UPDATE_TIME"
}

// action
export enum BookMarkActions {
  syncBrowserBookMarks = "SYNC_BROWSER_BOOK_MARKS"
}


/**
 * 常/变量（const/let）的定义
 */
// key
const BOOK_MARK_STORAGE = "book-mark-data"

/**
 * 默认导出（export default）定义
 * module的定义
 */
export default createStoreModule<BookMarkState>({
  /**
   * state
   */
  state() {
    // 设置默认状态值
    const defaultState: BookMarkState = {
      // 创建一个数组保存网站
      bookMarks: [],
      lastUpdateTime: undefined
    }

    // 从本地存储中读取
    const bookMarksData = JSON.parse(localStorage[BOOK_MARK_STORAGE] ?? "[]")
    console.log(bookMarksData)
    // 将本地存储中读取到的合并到默认状态中
    copy(bookMarksData, defaultState, true)

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
    [BookMarkGetters.getCurrentBookMarks]: ({ bookMarks }, _, rootState) => {
      // 从根状态中获取topSite配置对象
      const bookMarkSetting = rootState.setting.bookMark
      console.log(bookMarkSetting)
      // 根据配置筛选出前topSiteSetting.col * topSiteSetting.row项网站数据
      return bookMarks.filter((_item, index) => index < bookMarkSetting.col * bookMarkSetting.row)
    }
  },
  mutations: {
    /**
     * 添加单个导航
     * @param state
     * @param data
     */
    [BookMarkMutations.addBookMark]: (state, data: BookMarkItem) => {
      state.bookMarks.push(data)
      saveBookMarkState(state)
    },
    /**
     * 更新单个导航
     * @param state
     * @param data
     */
    [BookMarkMutations.updateBookMark]: (state, data: BookMarkItemVo) => {
      state.bookMarks[data.index] = data
      saveBookMarkState(state)
    },

    /**
     * 删除导航
     * @param state
     * @param index
     */
    [BookMarkMutations.deleteBookMark]: (state, index: number) => {
      state.bookMarks.splice(index, 1) // splice(index, 1) 的意思是从 index 开始删除一个元素，并返回被删除的元素（如果存在）的数组
      saveBookMarkState(state)
    },

    /**
     * 对导航栏排序
     * @param state
     * @param sort
     */
    [BookMarkMutations.sortBookMarks]: (state, sort: SortData) => {
      const bookMarks = state.bookMarks
      const from = bookMarks[sort.from]

      bookMarks.splice(sort.from, 1) // 移除 from 索引位置的元素
      bookMarks.splice(sort.to, 0, from) // 将已经移除的元素 from 插入到目标位置 to
      saveBookMarkState(state)
    },

    /**
     * 更新导航栏
     * @param state
     * @param topSites
     */
    [BookMarkMutations.updateBookMarks]: (state, bookMarks: BookMarks) => {
      state.bookMarks = bookMarks
      saveBookMarkState(state)
    },

    /**
     * 更新上次更新时间
     * @param state
     * @param newTime
     */
    [BookMarkMutations.editLastUpdateTime]: (state, newTime: number) => {
      state.lastUpdateTime = newTime
      saveBookMarkState(state)
    }
  },
  actions: {
    /**
     * 同步浏览器导航
     * 从浏览器获取最近浏览
     * @param param0
     */
    [BookMarkActions.syncBrowserBookMarks]: async ({ state, commit }) => {
      const now = Date.now()
      const customBookMarks = state.bookMarks.filter(item => item.custom)
      // const list = await getBrowserTopSites()

      // // 并行校验图标是否有效
      // const bookMarks = await Promise.all(
      //   list.map<Promise<BookMarkItem>>(async item => {
      //     const icon = item.favicon || getFavicon(item.url)
      //     const verify = await verifyImageUrl(icon)
      //
      //     return {
      //       title: item.title ?? "无标题",
      //       url: item.url,
      //       icon: verify ? icon : undefined,
      //       textIcon: !verify,
      //       custom: false
      //     }
      //   })
      // )

      console.log("load browser top-sites:", `${Date.now() - now}ms`)
      // commit(BookMarkMutations.updateBookMarks, customBookMarks.concat(bookMarks))
      commit(BookMarkMutations.editLastUpdateTime, now)
    }
  }
})

// 保存数据节流防抖
const saveBookMarkState = debounce((data: BookMarkState) => {
  const settingJson = JSON.stringify(data)
  localStorage.setItem(BOOK_MARK_STORAGE, settingJson)
}, 250)
