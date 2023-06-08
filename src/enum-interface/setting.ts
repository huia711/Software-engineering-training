export enum ThemeMode {
    Auto,
    Light,
    Dark
}

export enum BackgroundType {
    None,
    Local,
    Bing
}

export interface BackgroundSetting {
    id?: string
    type?: BackgroundType
    url?: string
    blur?: number
    maskColor?: string
    maskOpacity?: number
    autoOpacity?: boolean
}

export interface TopSiteIcon {
    size: number
}

export interface TopSiteSetting {
    enable: boolean,
    row: number
    col: number
    gap: number
    iconSize: number
    boardSize: number
    boardColor: string
    boardOpacity: number
    boardRadius: number
}

export enum AlignType {
    searchCenter,
    overallCenter
}

export interface LayoutSetting {
    align: AlignType
}

export interface PopupSettting {
    current: number
}
