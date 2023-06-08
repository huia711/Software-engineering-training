export * from "./search"
export * from "./setting"
export * from "./analyze"
export * from "./rule"

export enum LanguageType {
  Auto = "auto",
  SimplifiedChinese = "zh-cn",
  TraditionalChinese = "zh-tw",
  English = "en"
}

export interface TopSiteItem {
  title: string
  url: string
  icon?: string
  color?: string
  textIcon: boolean
  custom: boolean
}

export type TopSites = Array<TopSiteItem>

export enum DragType {
  start,
  enter,
  over,
  end
}

export type SortData = {
  from: number
  to: number
}

export type Option<T> = {
  [K in keyof T]?: T[K]
}

/**
 *
 */
export enum BackgroundType {
  None,
  Local,
  Bing
}

/**
 * 校验各种类型数据是否为空
 * @param obj 对象
 */
export function isEmpty(obj: any): boolean {
  if (typeof obj === "string") {
    return obj.length === 0
  } else if (obj instanceof Array) {
    return obj.length === 0
  } else if (obj instanceof Set) {
    return obj.size === 0
  } else if (obj === null) {
    return true
  } else if (obj === undefined) {
    return true
  } else {
    return false
  }
}