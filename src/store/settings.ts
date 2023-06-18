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
                backgroundColor: {
                    hex: "#ffffff",
                    alpha: 1
                },
                buttonColor: {
                    hex: "#000000",
                    alpha: 0.2
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