export interface ImgStyle {
    backgroundColor: string;
    borderColor: string;
    outlineColor: string;
    cursor: string;
    width: string;
    height: string;
}

export interface PageColorStyle {
    customBackgroundColor: boolean;
    customButtonColor: boolean;
    presetColor: number;
    backgroundColor: {
        hex: string;
        alpha: number;
    };
    buttonColor: {
        hex: string;
        alpha: number;
    };
}

export interface TempPageColorStyle {
    customBackgroundColor: boolean;
    customButtonColor: boolean;
    presetColor: number;
    backgroundColor: {
        hex: string;
        alpha: number;
    };
    buttonColor: {
        hex: string;
        alpha: number;
    };
}
