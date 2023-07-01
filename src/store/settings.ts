import { pa } from "element-plus/es/locale";
import {createStoreModule} from "./index";
import {
    ImgStyle,
    PageColorStyle,
} from "@/enum-interface"

export interface SettingsState {
    imgStyle: ImgStyle
    pageColorStyle: PageColorStyle
    tempPageColorStyle: PageColorStyle
    searchItemCount: number
    tempSelectedPresetColorStyle: number
    backgroundImg: string
    userId: string
    userName: string
    avatar: string
}

export enum SettingsMutationTypes {
    setSearchItemCount = "SET_SEARCH_ITEM_COUNT",
}

export default createStoreModule<SettingsState>({
    state() {
        const defaultState: SettingsState = {
            imgStyle: {
                backgroundColor: "transparent",
                borderColor: "transparent",
                outlineColor: "transparent",
                cursor: "pointer",
                width: "64px",
                height: "64px",
            },
            pageColorStyle: {
                customBackgroundColor: false,
                customButtonColor: false,
                presetColor: 0,
                fontColor: "black",
                backgroundColor: {
                    hex: "#ffffff",
                    alpha: 1
                },
                buttonColor: {
                    hex: "#000000",
                    alpha: 0.3
                }
            },
            tempPageColorStyle: {
                customBackgroundColor: false,
                customButtonColor: false,
                presetColor: 0,
                fontColor: "black",
                backgroundColor: {
                    hex: "#ffffff",
                    alpha: 1
                },
                buttonColor: {
                    hex: "#000000",
                    alpha: 0.3
                }
            },
            tempSelectedPresetColorStyle: 0,
            searchItemCount: 5,
            backgroundImg: "",
            userId: "",
            userName: "Guest",
            avatar: "img/userHead.png"
        }

        return defaultState
    },
    mutations: {
        setPageColorStyle(state, payload:PageColorStyle) {
            state.pageColorStyle = payload;
        },

        /** 
        *@param state
        *@param searchItemCount
        */
        [SettingsMutationTypes.setSearchItemCount]: (state, payload:number) => {
            state.searchItemCount = payload;
        },

        initSettings(state, payload: any) {
            state.pageColorStyle = payload.pageColorStyle;
            state.tempPageColorStyle = payload.pageColorStyle;
            state.searchItemCount = payload.searchItemCount;
        },
        setAvatar(state, payload:string) {
            state.avatar = payload;
        },
        setBackgroundImage(state, payload:string) {
            state.backgroundImg = payload;
        },
        setFontColor(state, payload:string) {
            state.pageColorStyle.fontColor = payload;
        },
        setUserId(state, payload:string) {
            state.userId = payload;
        },
        setUserName(state, payload:string) {
            state.userName = payload;
        },
        setTempSelectedPresetColorStyle(state, payload:number) {
            state.tempSelectedPresetColorStyle = payload;
        },
        setTempPageColorStyle(state, payload:PageColorStyle) {
            state.tempPageColorStyle = payload;
        },
        confirmPageColorStyle(state) {
            state.pageColorStyle = state.tempPageColorStyle;
        }
    }
})