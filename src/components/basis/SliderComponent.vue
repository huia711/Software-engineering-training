<template>
    <div class="main" @mousemove="updateInfo" @mouseleave="stopUpdate"  @mouseup="stopUpdate">
        <p class="text">{{ text }}</p>
        <div class="base">
            <p class="text" style="justify-content: flex-end;">{{ curValue }}</p>
            <div></div>
            <div class="slider" ref="Slider">
                <!-- Left side -->
                <!-- Width based on the current value -->
                <div class="slider__left" :style="{width: curPercentage + '%'}"></div>

                <!-- Circle -->
                <div class="slider__circle" @mousedown="initInfo"></div>

                <!-- Right side -->
                <div class="slider__right"></div>
            </div>
        </div>
    </div>
</template>

<script>
import GetMousePos from '@/utils/Mouse'
import cal from '@/utils/calculation'

export default{
    created(){
        this.$nextTick(()=>{
            // 禁止选中
            document.onselectstart = new Function('event.returnValue = false')
        })
    },
    data(){
        return{
            mouse : GetMousePos(),
            curPercentage: (this.range.baseNum - this.range.start)*100/(this.range.end - this.range.start),
            startx: 0,
            endx: 0,
            relX: 0,
            listenMouse: false,
            curValue: this.range.baseNum
        }
    },
    methods:{
        initInfo(){
            // 鼠标按下，初始化参数
            this.listenMouse = true
            let target = this.$refs.Slider.getBoundingClientRect()
            this.startx = target.x
            this.endx = target.right
            let mousePos = this.mouse
            // 左侧div右边界x坐标位置在(startx + (endx - startx)*percentage/100)px
            // 获取鼠标点击位置相对左侧div右边界x坐标relX
            this.relX = mousePos.x - (this.startx + (this.endx - this.startx)*this.curPercentage/100)
        },
        updateInfo(){
            // 鼠标拖动，更新curPercentage
            if(this.listenMouse === true){
                let mousePos = this.mouse
                // 限制左侧div右边界x坐标范围
                // 实际上左侧div滑动比例范围为0 ~ maxRatio,maxRatio = (endx - startx - roundRadiu*2)/(endx - startx)
                // 则有实际返回数值realPercentage = curPercentage / maxRatio
                let curX = cal.min(cal.max(mousePos.x - this.relX,this.startx),this.endx - this.roundRadius*2)
                let maxRatio = (this.endx - this.startx - this.roundRadius*2)/(this.endx - this.startx)
                this.curPercentage = Math.round((curX - this.startx)*100/(this.endx - this.startx))
                this.curValue = Math.round((this.curPercentage/100/maxRatio).toFixed(2)*(this.range.end - this.range.start) + this.range.start)
                this.valueCallback(this.curValue)
            }
        },
        stopUpdate(){
            this.listenMouse = false
        }
    },
    watch:{
        range(newValue,oldValue){
            this.curValue = newValue.baseNum
            this.curPercentage = (this.curValue - newValue.start)/(newValue.end - newValue.start)*100
        }
    },
    props:{
        roundRadius:{
            type:Number,
            default: 8
        },
        range: {
          type: Object,
          required: true,
          default: function () {
            return {
              start: 0,
              end: 100,
              baseNum: 50
            }
          }
        },
        text:{
            type:String,
            default:"Test:"
        },
        borderBottomStyle:{
            type:String,
            default:""
        },
        valueCallback:{
            type:Function,
            required:true
        },
        width:{
            type:Number,
            default:600
        },
        maxSliderWidth:{
            type:Number,
            default:600
        },
        textWidth:{
            type:Number,
            default:100
        }
    }
}

</script>

<style scoped>

.main{
    display: flex;
    margin: 10px 0px 0px 0px;
    flex-direction: row;
    border-bottom: v-bind("borderBottomStyle");
    width: v-bind("width+'px'");
}

.base {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
}

.text {
    display: flex;
    margin: 0px;
    width: v-bind("textWidth + 'px'");
    height: 20px;
}

.slider {
    /* Content is centered horizontally */
    align-items: center;
    display: flex;

    /* Size */
    height: 1rem;
    width: v-bind("width*3/4 + 'px'");
    max-width: v-bind("maxSliderWidth + 'px'");
}

.slider__left {
    height: 2px;

    /* Colors */
    background-color: #d1d5db;
}

.slider__circle {
    /* Size */
    height: v-bind("roundRadius*2 + 'px'");
    width: v-bind("roundRadius*2 + 'px'");

    /* Rounded border */
    border-radius: 9999px;

    /* Colors */
    background-color: #3b82f6;
    cursor: pointer;
}

.slider__right {
    /* Take the remaining width */
    flex: 1;
    height: 2px;

    /* Colors */
    background-color: #d1d5db;
}
</style>