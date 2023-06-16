<template>
    <div>
        <div class="nevigator">
            <div class="previewer">
                <p>预览</p>
            </div>
            <inputBox :visibleButton="false" :widthExpand="-203" :defaultContent="String(currentColorStyle.R)" @dataChanged="rChange"/>
            <inputBox :visibleButton="false" :widthExpand="-203" :defaultContent="String(currentColorStyle.G)" @dataChanged="gChange"/>
            <inputBox :visibleButton="false" :widthExpand="-203" :defaultContent="String(currentColorStyle.B)" @dataChanged="bChange"/>
            <inputBox :visibleButton="false" :widthExpand="-203" :defaultContent="String(currentColorStyle.alpha)" @dataChanged="alphaChange"/>
        </div>
        <div>
            <slider text="R" :range="rangeR" :percentage="percentages.R" :valueCallback="rChange"/>
            <slider text="G" :range="rangeG" :percentage="percentages.G" :valueCallback="gChange"/>
            <slider text="B" :borderBottomStyle="borderBottom" :range="rangeB" :percentage="percentages.B" :valueCallback="bChange"/>
            <slider text="Alpha" :range="rangeAlpha" :percentage="percentages.Alpha" :valueCallback="alphaChange"/>
        </div>
    </div>
</template>

<script>
import slider from './SliderComponent.vue';
import inputBox from './inputBox.vue';
import cal from '@/utils/calculation'

export default{
    data(){
        return{
            borderBottom: "1px solid lightgrey",
            currentColorStyle:{
                R:cal.hexToRgb(this.colorStyle.hex).r,
                G:cal.hexToRgb(this.colorStyle.hex).g,
                B:cal.hexToRgb(this.colorStyle.hex).b,
                alpha:this.colorStyle.alpha*100
            },
            percentages:{
                R:cal.hexToRgb(this.colorStyle.hex).r/255*100,
                G:cal.hexToRgb(this.colorStyle.hex).g/255*100,
                B:cal.hexToRgb(this.colorStyle.hex).b/255*100,
                Alpha:this.colorStyle.alpha*100
            },
            rangeR:{
                start: 0,
                end: 255,
                baseNum:cal.hexToRgb(this.colorStyle.hex).r
            },
            rangeG:{
                start: 0,
                end: 255,
                baseNum:cal.hexToRgb(this.colorStyle.hex).g
            },
            rangeB:{
                start: 0,
                end: 255,
                baseNum:cal.hexToRgb(this.colorStyle.hex).b
            },
            rangeAlpha:{
                start: 0,
                end: 100,
                baseNum:this.colorStyle.alpha*100
            },
        }
    },
    methods:{
        rChange(newVal){
            let validNum = cal.max(cal.min(newVal,255),0)
            this.currentColorStyle.R = validNum
            this.rangeR = Object({
                start: 0,
                end: 255,
                baseNum: validNum
            })
            this.colorChangeCallback(cal.rgbaToObj(this.currentColorStyle))
        },
        gChange(newVal){
            let validNum = cal.max(cal.min(newVal,255),0)
            this.currentColorStyle.G = validNum
            this.rangeG = Object({
                start: 0,
                end: 255,
                baseNum: validNum
            })
            this.colorChangeCallback(cal.rgbaToObj(this.currentColorStyle))
        },
        bChange(newVal){
            let validNum = cal.max(cal.min(newVal,255),0)
            this.currentColorStyle.B = validNum
            this.rangeB = Object({
                start: 0,
                end: 255,
                baseNum: validNum
            })
            this.colorChangeCallback(cal.rgbaToObj(this.currentColorStyle))
        },
        alphaChange(newVal){
            let validNum = cal.max(cal.min(newVal,100),0)
            this.currentColorStyle.alpha = validNum
            this.rangeAlpha = Object({
                start: 0,
                end: 100,
                baseNum: validNum
            })
            this.colorChangeCallback(cal.rgbaToObj(this.currentColorStyle))
        }
    },
    props:{
        colorStyle: {
          type: Object,
          default: function () {
            return {
              hex: "#ffffff",
              alpha: 1
            }
          }
        },
        colorChangeCallback:{
            type:Function,
            required:true
        }
    },
    components:{
        slider,
        inputBox
    }
}

</script>

<style>

.previewer{
    border: 1px solid black;
    border-radius: 15px;
    width: 60px;
    height: 20px;
    padding: 0px 10px 0px 10px;
    background-color: v-bind("'rgba(' + currentColorStyle.R + ',' + currentColorStyle.G + ',' + currentColorStyle.B + ',' + currentColorStyle.alpha/100 + ')'");
    display:flex;
    align-items: center;
    justify-content: center;
}

.nevigator{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
}

</style>