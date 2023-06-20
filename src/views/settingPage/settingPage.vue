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
                  <basicSettings v-show="curSelected === 0" />
                  <backgroundPicture v-show="curSelected === 1" />
                  <privacyPage v-show="curSelected === 2" />
                  <advancePage v-show="curSelected === 3" />
                  <aboutPage v-show="curSelected === 4"/>
          </div>
      </div>
  </div>
</template>

<script>
import modernButton from '@/components/basis/modernButton.vue'
import basicSettings from './basicSettings.vue'
import aboutPage from './AboutSettings.vue'
import advancePage from './AdvanceSettings.vue'
import privacyPage from './PrivacySettings.vue'
import backgroundPicture from './backgroundPicture.vue'

import cal from '@/utils/calculation'
import { useStore } from '@/store'
import { mapMutations } from 'vuex'
import { computed } from '@vue/reactivity'

export default{
    setup(){
      const store = useStore()
      return{
          pageColorStyle: computed(() => store.state.settings.pageColorStyle)
      }
    },
    data(){
        return{
            colorStyle: cal.hexToRgb(this.pageColorStyle.backgroundColor.hex),
            options:["通 用","壁 纸","隐 私","高 级","关 于"],
            curSelected: 0,
            curOn: -1,
            buttonSelectedStyle:{
                borderColor:"transparent",
                borderRadius:"5px",
                backgroundColor: computed(()=>cal.rgbaTextSpawn(cal.hexToRgb(this.pageColorStyle.buttonColor.hex), this.pageColorStyle.buttonColor.alpha)),
                outlineColor:"transparent",
                cursor:"pointer",
                wordSpacing:"6px",
                width:"150px",
                height:"35px",
                divHeight:"3rem",
                fontSize:"20px",
            },
            buttonNotSelectedStyle:{
                borderColor:"transparent",
                borderRadius:"5px",
                backgroundColor:"transparent",
                outlineColor:"transparent",
                cursor:"pointer",
                wordSpacing:"6px",
                width:"150px",
                height:"35px",
                divHeight:"3rem",
                fontSize:"20px",
            },
        }
    },
    methods:{
        ...mapMutations(['setSettingPageShown']),
        buttonClick(index){
            this.curSelected = index
        },
        buttonOn(index){
            this.curOn = index
        },
    },
    watch:{
        pageColorStyle(newVal,oldVal){
            this.colorStyle = cal.hexToRgb(newVal.backgroundColor.hex)
        }
    },
    components:{
        modernButton,
        basicSettings,
        aboutPage,
        privacyPage,
        advancePage,
        backgroundPicture
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
  margin: 5px;
  padding: 5px;
  list-style: none;
  border-right: v-bind("'1px solid ' + pageColorStyle.buttonColor.hex");
}

.listItem{
  padding: 0px;
}
</style>