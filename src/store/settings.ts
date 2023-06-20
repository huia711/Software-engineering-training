import {createStoreModule} from "./index";
import {
    ImgStyle,
    PageColorStyle,
    TempPageColorStyle
} from "@/enum-interface"

export interface SettingsState {
    imgStyle: ImgStyle
    pageColorStyle: PageColorStyle
    tempPageColorStyle: TempPageColorStyle
    searchItemCount: number
    tempSelectedPresetColorStyle: number
    backgroundImg: string
    userId: string
    userName: string
}

export enum SettingsMutationTypes {
    setSearchItemCount = "SET_SEARCH_ITEM_COUNT",
    setBackgroundImg = "SET_BACKGROUND_IMG"
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
                backgroundColor: {
                    hex: "#ffffff",
                    alpha: 0.7
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
                backgroundColor: {
                    hex: "#ffffff",
                    alpha: 1
                },
                buttonColor: {
                    hex: "#000000",
                    alpha: 0.2
                }
            },
            searchItemCount: 5,
            tempSelectedPresetColorStyle: 0,
            backgroundImg: "",
            userId: "",
            userName: "Guest",
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

        setBackgroundImage(state, payload:string) {
            state.backgroundImg = payload;
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
        setTempPageColorStyle(state, payload:TempPageColorStyle) {
            state.tempPageColorStyle = payload;
        },
        confirmPageColorStyle(state) {
            state.pageColorStyle = state.tempPageColorStyle;
        },
        confirmSettings(state) {
            state.pageColorStyle = state.tempPageColorStyle;
        }
    }
})