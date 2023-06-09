import { OpenPageTarget } from "@/enum-interface/search";

export * from "./search"
export * from "./setting"

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





