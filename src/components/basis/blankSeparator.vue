<template>
    <div class="separator">
    </div>
</template>

<script>
import cal from '@/utils/calculation'

export default{
    data(){
        return{
            colorStyle: cal.hexToRgb(this.blankColorStyle.backgroundColor.hex),
            colorAlpha: this.blankColorStyle.backgroundColor.alpha
        }
    },
    watch:{
        // blankColorStyle(newVal,oldVal){
        //     colorStyle = cal.hexToRgb(newVal.backgroundColor.hex)
        //     colorAlpha = newVal.backgroundColor.alpha
        // }
    },
    props:{
        width:{
            type:String,
            default:"auto"
        },
        height:{
            type:String,
            default:"auto"
        },
      blankColorStyle: {
        type: Object,
        default: function () {
          return {
            backgroundColor: {
              hex: "#000000",
              alpha: 0
            }
          }
        }
      }
    }
}
</script>

<style>
.separator{
    width: v-bind("width");
    height: 1px;
    outline: 0px;
    margin: v-bind("height");
    padding: 0px;
    background-color: v-bind("'rgba(' + colorStyle.r + ',' + colorStyle.g + ',' + colorStyle.b + ',' + colorAlpha + ')'");
}
</style>