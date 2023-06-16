<template>
  <div class="base">
      <div class="global">
          <div class="pageLayout">
          <!-- 设置页面 -->
                  <!-- 左侧按钮列表 -->
                  <ul class="listStyle">
                      <li v-for="(option,index) of options" :key="index">
                          <modernButton
                              :buttonText="option"
                              :customButtonStyle="curSelected===index ? buttonSelectedStyle : buttonNotSelectedStyle"
                              @buttonClicked="buttonClick(index)"
                              @mouseOn="buttonOn(index)"
                              @mouseLeave="buttonOn(-1)"
                          />
                      </li>
                  </ul>
                  <!-- 右侧具体内容 -->
                  <basicSettings v-if="curSelected === 0" />
                  <privacyPage v-if="curSelected === 1" personalPageLink="https://www.baidu.com"/>
                  <advancePage v-if="curSelected === 2" />
                  <aboutPage v-if="curSelected === 3"/>
          </div>
          <closeButton @close="closePage"/>
      </div>
  </div>
</template>

<script>
import modernButton from '@/components/basis/modernButton.vue'
import closeButton from '@/components/basis/closeButton.vue'
import basicSettings from './basicSettings.vue'
import aboutPage from './AboutSettings.vue'
import advancePage from './AdvanceSettings.vue'
import privacyPage from './PrivacySettings.vue'

import cal from '@/utils/calculation'

import { useStore } from '@/store'
import { mapMutations } from 'vuex'
import { computed } from '@vue/reactivity'

export default{
    setup(){
      const store = useStore()
      return{
          pageColorStyle: computed(()=> store.state.settings.pageColorStyle)
      }
    },
    data(){
        return{
            colorStyle: cal.hexToRgb(this.pageColorStyle.backgroundColor.hex),
            options:["通 用","隐 私","高 级","关 于"],
            curSelected: 0,
            searchItemNum: this.searchItemCount,
            curOn: -1,
            buttonSelectedStyle:{
                borderColor:"transparent",
                borderRadius:"0 9999px 9999px 0",
                backgroundColor:"lightblue",
                outlineColor:"transparent",
                cursor:"pointer",
                wordSpacing:"6px",
                width:"100px",
                height:"35px",
                divHeight:"3rem",
                fontSize:"20px",
            },
            buttonNotSelectedStyle:{
                borderColor:"transparent",
                backgroundColor:"transparent",
                outlineColor:"transparent",
                cursor:"pointer",
                wordSpacing:"6px",
                width:"auto",
                height:"35px",
                divHeight:"3rem",
                fontSize:"20px",
            },
        }
    },
    methods:{
        ...mapMutations(['setSettingPageShown','confirmSettings']),
        buttonClick(index){
            this.curSelected = index
        },
        buttonOn(index){
            this.curOn = index
        },
        closePage(){
            this.confirmSettings()
            this.$emit("close")
        }
    },
    watch:{
        pageColorStyle(newVal,oldVal){
            this.colorStyle = cal.hexToRgb(newVal.backgroundColor.hex)
        }
    },
    props:{
        backGroundImgPath:{
            type: String,
            default: "../../src/img/userPageBackground.jpg"
        },
        searchItemCount:{
            type:Number,
            default:5
        }
    },
    components:{
        modernButton,
        closeButton,
        basicSettings,
        aboutPage,
        privacyPage,
        advancePage
    }
}
</script>

<style scoped>
.base{
  height:750px;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-attachment: scroll;
  font-family: SmileySans,serif;
}

.global{
  display: flex;
  position: relative;
}

.pageLayout{
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(v-bind("colorStyle.r"),v-bind("colorStyle.g"),v-bind("colorStyle.b"),v-bind("pageColorStyle.backgroundColor.alpha"));
  border-radius: 10px;
  width: auto;
  height: auto;
  background-attachment: scroll;
}

.listStyle{
  padding: 0px;
  list-style: none;
  border-right: 1px solid #ffffff;
}

.listItem{
  padding: 0px;
}
</style>