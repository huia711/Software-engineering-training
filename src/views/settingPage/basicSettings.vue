<template>
    <body class="basis">
        <div>
            <div>
                <switcher texts="自定义页面颜色" :initialstate="curCustomBackgroundColorState" @stateChange="customBackgroundColorStateChange"/>
                <colorPixer v-if="curCustomBackgroundColorState" :colorChangeCallback="backgroundColorChange" :colorStyle="backgroundColorStyle"/>
            </div>
            <blankSeparator :blankColorStyle="blankSeparatorColorStyle" height="1px"/>
            <div>
                <switcher texts="自定义按钮颜色" :initialstate="curCustomButtonColorState" @stateChange="customButtonColorStateChange"/>
                <colorPixer v-if="curCustomButtonColorState" :colorChangeCallback="buttonColorChange" :colorStyle="buttonColorStyle"/>
            </div>
            <blankSeparator :blankColorStyle="blankSeparatorColorStyle" height="1px"/>
            <div>
                <switcher texts="使用预设主题颜色" :initialstate="curPresetColorState" @stateChange="presetColorStateChange"/>
                <blankSeparator height="20px"/>
                <div v-if="curPresetColorState === true" class="boxs">
                    <presetStyleBox :presetStyle="presetStyles[0]" textUnderBox="白天模式" @selected="presetColorChange(0)" :isSelected="selectedPresetStyle === 0 ? true : false"/>
                    <presetStyleBox :presetStyle="presetStyles[1]" textUnderBox="黑夜模式" @selected="presetColorChange(1)" :isSelected="selectedPresetStyle === 1 ? true : false"/>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import switcher from '@/components/basis/SwitcherComponent.vue';
import slider from '@/components/basis/SliderComponent.vue';
import colorPixer from '@/components/basis/colorPixer.vue';
import modernButton from '@/components/basis/modernButton.vue';
import blankSeparator from '@/components/basis/blankSeparator.vue';
import presetStyleBox from '@/components/basis/presetStyleBox.vue';
import { useStore } from '@/store'
import { mapMutations } from 'vuex';
import { computed } from '@vue/reactivity';

export default{
    setup(){
        const store = useStore();
        return{
            pageColorStyle: computed(()=>store.state.settings.pageColorStyle),
            selectedPresetStyle: computed(()=>store.state.settings.tempSelectedPresetColorStyle)
        }
    },
    data(){
        return{
            curCustomBackgroundColorState: this.pageColorStyle.customBackgroundColor,
            curCustomButtonColorState: this.pageColorStyle.customButtonColor,
            curPresetColorState: this.pageColorStyle.presetColor > -1,
            curSelectedPresetColorStyle: this.pageColorStyle.presetColor,
            backgroundColorStyle: this.pageColorStyle.backgroundColor,
            buttonColorStyle: this.pageColorStyle.buttonColor,
            presetStyles:[
                Object({
                backgroundColor:{
                    hex:"#ffffff",
                    alpha:1
                },
                buttonColor:{
                    hex:"#000000",
                    alpha:0.2
                }}),
                Object({
                backgroundColor:{
                    hex:"#000000",
                    alpha:0.3
                },
                buttonColor:{
                    hex:"#ffffff",
                    alpha:0.2
                }})],
            blankSeparatorColorStyle:{
                backgroundColor:{
                    hex:"#000000",
                    alpha:1
                }
            }
        }
    },
    methods:{
        ...mapMutations(['setPageColorStyle','setTempPageColorStyle','setTempSelectedPresetColorStyle','confirmPageColorStyle']),
        customBackgroundColorStateChange(state){
            this.curCustomBackgroundColorState = state
            if(state === false){
                this.backgroundColorStyle = this.presetStyles[this.selectedPresetStyle].backgroundColor
                if(this.curCustomButtonColorState === false){
                    this.curPresetColorState = true
                    this.curSelectedPresetColorStyle = this.selectedPresetStyle
                    this.backgroundColorStyle = this.presetStyles[this.selectedPresetStyle].backgroundColor
                    this.buttonColorStyle = this.presetStyles[this.selectedPresetStyle].buttonColor
                }
            }
            else{
                this.curPresetColorState = false
                this.curCustomButtonColorState = true
                this.curSelectedPresetColorStyle = -1
            }
            this.setTempPageColorStyle(Object({
                backgroundColor: this.backgroundColorStyle,
                buttonColor: this.buttonColorStyle,
                customBackgroundColor: this.curCustomBackgroundColorState,
                customButtonColor: this.curCustomButtonColorState,
                presetColor: this.curSelectedPresetColorStyle
            }))
            this.confirmPageColorStyle()
        },
        customButtonColorStateChange(state){
            this.curCustomButtonColorState = state
            if(state === false){
                this.buttonColorStyle = this.presetStyles[this.selectedPresetStyle].buttonColor
                if(this.curCustomBackgroundColorState === false){
                    this.curPresetColorState = true
                    this.curSelectedPresetColorStyle = this.selectedPresetStyle
                    this.backgroundColorStyle = this.presetStyles[this.selectedPresetStyle].backgroundColor
                    this.buttonColorStyle = this.presetStyles[this.selectedPresetStyle].buttonColor
                }
            }
            else{
                this.curPresetColorState = false
                this.curCustomBackgroundColorState = true
                this.curSelectedPresetColorStyle = -1
            }
            this.setTempPageColorStyle(Object({
                    backgroundColor: this.backgroundColorStyle,
                    buttonColor: this.buttonColorStyle,
                    customBackgroundColor: this.curCustomBackgroundColorState,
                    customButtonColor: this.curCustomButtonColorState,
                    presetColor: this.curSelectedPresetColorStyle
                }))
            this.confirmPageColorStyle()
        },
        presetColorStateChange(state){
            if(state === true){
                this.curCustomBackgroundColorState = false
                this.curCustomButtonColorState = false
                this.curPresetColorState = true
                // 默认选中原来的预设方案
                this.curSelectedPresetColorStyle = this.selectedPresetStyle
                this.presetColorChange(this.selectedPresetStyle)
            }
            else{
                if(this.curPresetColorState === true){
                    this.curSelectedPresetColorStyle = -1
                    this.curCustomBackgroundColorState = true
                    this.curCustomButtonColorState = true
                    this.curPresetColorState = false
                }
            }
        },
        backgroundColorChange(newColor){
            this.backgroundColorStyle = newColor
            this.setTempPageColorStyle(Object({
                backgroundColor: this.backgroundColorStyle,
                buttonColor: this.buttonColorStyle,
                customBackgroundColor: this.curCustomBackgroundColorState,
                customButtonColor: this.curCustomButtonColorState,
                presetColor: this.curSelectedPresetColorStyle
            }))
        },
        buttonColorChange(newColor){
            this.buttonColorStyle = newColor
            this.setTempPageColorStyle(Object({
                backgroundColor: this.backgroundColorStyle,
                buttonColor: this.buttonColorStyle,
                customBackgroundColor: this.curCustomBackgroundColorState,
                customButtonColor: this.curCustomButtonColorState,
                presetColor: this.curSelectedPresetColorStyle
            }))
        },
        presetColorChange(index){
            this.curSelectedPresetColorStyle = index
            this.setTempSelectedPresetColorStyle(index)
            this.backgroundColorStyle = this.presetStyles[index].backgroundColor
            this.buttonColorStyle = this.presetStyles[index].buttonColor
            this.setTempPageColorStyle(Object({
                backgroundColor: this.backgroundColorStyle,
                buttonColor: this.buttonColorStyle,
                customBackgroundColor: this.curCustomBackgroundColorState,
                customButtonColor: this.curCustomButtonColorState,
                presetColor: this.curSelectedPresetColorStyle
            }))
            this.confirmPageColorStyle()
        }
    },
    components:{
        switcher,
        // slider,
        colorPixer,
        // modernButton,
        blankSeparator,
        presetStyleBox
    }
}
</script>

<style scoped>

.basis{
    background-color: transparent;
    margin: 0px;
    padding: 10px 30px 0px 30px;
    display: flex;
    flex-direction: row;
    max-height: 600px;
    min-height: 600px;
    width: 600px;
    overflow: hidden scroll;
}

.boxs{
    display: flex;
    flex-direction: row;
}
</style>