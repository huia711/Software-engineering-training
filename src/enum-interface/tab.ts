import {Component} from "vue";

export interface TabItem {
    title: string
    num: number
    icon?: Component
}

export type Tabs = Array<TabItem>
