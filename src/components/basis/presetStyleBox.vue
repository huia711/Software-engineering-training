<template>
    <div class="basic">
        <div class="presetStyle" @mouseenter="mouseOn(true)" @mouseleave="mouseOn(false)" @click="selected">
            <p>预览</p>
            <modernButton buttonText="预览" @mouseOn="mouseOnEvent" @mouseLeave="mouseLeaveEvent" :customButtonStyle="btnStyle"/>
        </div>
        <p>{{ textUnderBox }}</p>
    </div>
</template>

<script>
import modernButton from './modernButton.vue';
import cal from '@/utils/calculation'
export default{
    data(){
        return{
            bkgColorStyle: cal.hexToRgb(this.presetStyle.backgroundColor.hex),
            btnAlpha: this.presetStyle.buttonColor.alpha,
            btnStyle:{
                backgroundColor: cal.rgbaTextSpawn(cal.hexToRgb(this.presetStyle.buttonColor.hex),this.presetStyle.buttonColor.alpha),
                width: "70px",
                height: "35px",
                borderColor:"transparent",
                borderRadius:"6px",
                cursor:"pointer",
                outlineColor:"transparent",
                wordSpacing:"50px",
                divHeight:"4rem"
            },
            outlineStyle: this.isSelected === true ? "2px solid purple" : "0px",
            isMouseOn: false
        }
    },
    methods:{
        mouseOnEvent(){
            this.btnStyle.backgroundColor = cal.rgbaTextSpawn(cal.hexToRgb(this.presetStyle.buttonColor.hex),this.presetStyle.buttonColor.alpha + 0.4)
        },
        mouseLeaveEvent(){
            this.btnStyle.backgroundColor = cal.rgbaTextSpawn(cal.hexToRgb(this.presetStyle.buttonColor.hex),this.presetStyle.buttonColor.alpha)
        },
        mouseOn(state){
            this.isMouseOn = state
            if(state === true)
                this.outlineStyle = "2px solid black"
            else{
                if(this.isSelected === true)
                    this.outlineStyle = "2px solid purple"
                else
                    this.outlineStyle = "0px"
            }
        },
        selected(){
            this.outlineStyle = "2px solid purple"
            this.$emit("selected")
        }
    },
    watch:{
        isSelected(newVal,oldVal){
            this.outlineStyle = newVal === true ? "2px solid purple" : "0px"
        }
    },
    props:{
        presetStyle:{
            type:Object,
            required:true
        },
        isSelected:{
            type:Boolean,
            required:true
        },
        textUnderBox:{
            type:String,
            required:true
        }
    },
    components:{
        modernButton
    }
}
</script>

<style scoped>
.basic{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px;
    padding: 0px;
    height: 110px;
    width: 110px;
}

.presetStyle{
    height: 100px;
    width: 100px;
    border-radius: 15px;
    outline: v-bind("outlineStyle");
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: v-bind("'rgba(' + bkgColorStyle.r + ',' + bkgColorStyle.g + ',' + bkgColorStyle.b + ',' + presetStyle.backgroundColor.alpha + ')'");
}
</style>