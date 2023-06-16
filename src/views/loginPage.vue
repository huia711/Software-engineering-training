<template>
    <body class="base">
        <div class="pageLayout">
            <closeButton @close="closePage"/>
            <div class="global">
                <modernButton :srcPath="userHeadImgPath" 
                :textUnderButton="registerMode === true ? 'Register' : 'Login for ' + userName" @buttonClicked="userHeadImgClicked" 
                :customButtonStyle="imgStyle" />
                <div class="loginPage">
                    <!-- 显示登录/注册界面 -->
                    <p class="inputBoxs">账号：<inputBox :visibleButton = "false" :widthExpand="32" @dataChanged="accountGet" /></p>
                    <p class="inputBoxs">密码：<inputBox :visibleButton = "true" :widthExpand="32" @dataChanged="passwdGet" /></p>
                    <p v-if="registerMode" class="inputBoxs">确认密码：<inputBox :visibleButton = "true" @dataChanged="confPasswdGet" /></p>
                    <modernButton buttonText="登 录" :customButtonStyle="loginButtonStyle" @buttonClicked="loginButtonClicked" @mouseOn="loginButtonMouseStateChange(true)" @mouseLeave="loginButtonMouseStateChange(false)" />
                    <modernButton buttonText="注 册" :customButtonStyle="registerButtonStyle" @buttonClicked="regButtonClicked" @mouseOn="registerButtonMouseStateChange(true)" @mouseLeave="registerButtonMouseStateChange(false)" />
                    <p style="color: red;height: 20px;">{{ warningMsg }}</p>
                </div>
            </div>
        </div>
    </body>
    
</template>

<script>
    
  import modernButton from '@/components/basis/modernButton.vue';
  import inputBox from '@/components/basis/inputBox.vue'
  import closeButton from '@/components/basis/closeButton.vue';
  import cal from '@/utils/calculation'

  export default{
      data(){
          return{
              registerMode: false,
              account: "",
              passwd: "",
              confPasswd: "",
              warningMsg: "",
              colorStyle: cal.hexToRgb(this.pageColorStyle.backgroundColor.hex),
              buttonColorStyle: cal.hexToRgb(this.pageColorStyle.buttonColor.hex),
              loginButtonStyle: {
                  backgroundColor: cal.rgbaTextSpawn(cal.hexToRgb(this.pageColorStyle.buttonColor.hex),this.pageColorStyle.buttonColor.alpha),
                  width:"250px",
                  height:"35px",
                  borderColor:"transparent",
                  borderRadius:"6px",
                  cursor:"pointer",
                  outlineColor:"transparent",
                  wordSpacing:"50px",
                  divHeight:"4rem"
              },
              registerButtonStyle: {
                  backgroundColor: cal.rgbaTextSpawn(cal.hexToRgb(this.pageColorStyle.buttonColor.hex),this.pageColorStyle.buttonColor.alpha),
                  width:"250px",
                  height:"35px",
                  borderColor:"transparent",
                  borderRadius:"6px",
                  cursor:"pointer",
                  outlineColor:"transparent",
                  wordSpacing:"50px",
                  divHeight:"4rem"
              },
              imgStyle: {
                  backgroundColor:"transparent",
                  borderColor:"transparent",
                  outlineColor:"transparent",
                  width:"64px",
                  height:"64px",
              }
          }
      },
      methods:{
          userHeadImgClicked(){
              // 头像点击
          },
          loginButtonClicked(){
              if(this.registerMode === false){
                  if(this.account === "" || this.passwd === "")
                      this.warningMsg = "账号或密码不能为空!"
                  else{
                      this.warningMsg = ""
                      this.$emit("loginAccount",this.account,this.passwd)
                  }
              }
              else{
                  // 转至登录页面
                  this.registerMode = false
              }
          },
          loginButtonMouseStateChange(state){
              if(state === true)
                  this.loginButtonStyle.backgroundColor = cal.rgbaTextSpawn(this.buttonColorStyle,cal.min(this.pageColorStyle.buttonColor.alpha + 0.4, 1))
              else
                  this.loginButtonStyle.backgroundColor = cal.rgbaTextSpawn(this.buttonColorStyle,this.pageColorStyle.buttonColor.alpha)
          },
          registerButtonMouseStateChange(state){
              if(state === true)
                  this.registerButtonStyle.backgroundColor = cal.rgbaTextSpawn(this.buttonColorStyle,cal.min(this.pageColorStyle.buttonColor.alpha + 0.4, 1))
              else
                  this.registerButtonStyle.backgroundColor = cal.rgbaTextSpawn(this.buttonColorStyle,this.pageColorStyle.buttonColor.alpha)
          },
          regButtonClicked(){
              if(this.registerMode === false){
                  // 转至注册页面
                  this.registerMode = true
              }
              else{
                  if(this.account === "" || this.passwd === "")
                      this.warningMsg = "账号或密码不能为空!"
                  else{
                      if(this.passwd !== this.confPasswd)
                          this.warningMsg = "两次输入的密码不一致!"
                      else{
                          this.warningMsg = ""
                      this.$emit("registerAccount",this.account,this.passwd)
                      }
                  }
              }
          },
          closePage(){
              this.$emit("close")
          },
          accountGet(account){
              this.account = account
              this.warningMsg = ""
          },
          passwdGet(passwd){
              this.passwd = passwd
              this.confirmPasswd()
          },
          confPasswdGet(confPasswd){
              this.confPasswd = confPasswd
              this.confirmPasswd()
          },
          confirmPasswd(){
              if(this.passwd !== this.confPasswd && this.registerMode === true){
                  // 两次输入的密码不一致
                  this.warningMsg = "两次输入的密码不一致!"
              }
              else{
                  this.warningMsg = ""
              }
          }
      },
      props:{
          userName:{
              // 用户昵称
              type: String,
              default: "Guest"
          },
          userHeadImgPath:{
              // 用户头像路径，注意要使用png图片，否则将会有白边
              type: String,
              default: "../../src/img/userHead.png"
          },
          pageColorStyle: {
            type: Object,
            default: function() {
              return {
                backgroundColor: {
                  hex: '#ffffff',
                  alpha: 1,
                },
                buttonColor: {
                  hex: '#000000',
                  alpha: 0.3,
                },
              };
            },
          },
          backGroundImgPath:{
              // 背景图片
              type: String,
              default: "../../src/img/userPageBackground.jpg"
          },
          isLogin:{
              type: Boolean,
              required: true
          }
      },
      components:{
          modernButton,
          inputBox,
          closeButton
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
    background: v-bind("'url('+backGroundImgPath+') no-repeat'");
    background-size: cover;
    background-attachment: scroll;
}

.pageLayout{
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    position: fixed;
}

.loginPage{
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.global{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 500px;
    width: 400px;
    background-color: rgba(v-bind("colorStyle.r"),v-bind("colorStyle.g"),v-bind("colorStyle.b"),v-bind("pageColorStyle.backgroundColor.alpha"));
    border-radius: 15px;
}

.inputBoxs{
    display: flex;
    align-items: baseline;
}

</style>