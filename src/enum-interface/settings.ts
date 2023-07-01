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
    fontColor: string;
    backgroundColor: {
        hex: string;
        alpha: number;
    };
    buttonColor: {
        hex: string;
        alpha: number;
    };
}
