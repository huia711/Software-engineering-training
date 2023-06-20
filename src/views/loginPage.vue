<template>
    <main class="base">
        <div id="wallpaper">
        </div>
        <div class="pageLayout">
            <closeButton @close="closePage"/>
            <div class="global">
                <modernButton :srcPath="userHeadImgPath" 
                :textUnderButton="registerMode === true ? 'Register' : 'Login for ' + userName" @buttonClicked="userHeadImgClicked" 
                :customButtonStyle="imgStyle" />
                <div class="loginPage">
                    <!-- 显示登录/注册界面 -->
                    <p v-show="registerMode" class="inputBoxs">昵称：<inputBox :visibleButton = "false" :widthExpand="32" @dataChanged="registerNameGet" /></p>
                    <p class="inputBoxs">账号：<inputBox :visibleButton = "false" :widthExpand="32" @dataChanged="accountGet" /></p>
                    <p class="inputBoxs">密码：<inputBox :visibleButton = "true" :widthExpand="32" @dataChanged="passwdGet" /></p>
                    <p v-show="registerMode" class="inputBoxs">确认密码：<inputBox :visibleButton = "true" @dataChanged="confPasswdGet" /></p>
                    <modernButton buttonText="登 录" :customButtonStyle="loginButtonStyle" @buttonClicked="loginButtonClicked" @mouseOn="loginButtonMouseStateChange(true)" @mouseLeave="loginButtonMouseStateChange(false)" />
                    <modernButton buttonText="注 册" :customButtonStyle="registerButtonStyle" @buttonClicked="regButtonClicked" @mouseOn="registerButtonMouseStateChange(true)" @mouseLeave="registerButtonMouseStateChange(false)" />
                    <p style="color: red;height: 20px;">{{ warningMsg }}</p>
                </div>
            </div>
        </div>
    </main>
    
</template>

<script lang="js">
    
import modernButton from '@/components/basis/modernButton.vue';
import inputBox from '@/components/basis/inputBox.vue';
import closeButton from '@/components/basis/closeButton.vue';
import { computed } from '@vue/reactivity';
import cal from '@/utils/calculation';
import axios from '@/plugins/axios';
import { useStore } from '@/store';
import $ from 'jquery'
import { mapMutations } from 'vuex';

export default{
    setup(){
        const store = useStore();
        return {
            pageColorStyle: computed(()=>store.state.settings.pageColorStyle),
            backgroundImg: computed(()=>store.state.settings.backgroundImg),
            imgStyle: computed(()=>store.state.settings.imgStyle),
            userName: computed(()=>store.state.settings.userName),
            store
        }
    },
    mounted(){
        if(this.store.state.settings.backgroundImg !== ""){
            $("#wallpaper").addClass("backgroundImg");
        } else {
            $("#wallpaper").removeClass("backgroundImg");
        }
    },
    data(){
        return{
            registerMode: false,
            registerName: "",
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
            }
        }
    },
    methods:{
        ...mapMutations(['setUserName']),
        loginButtonClicked(){
            if(this.registerMode === false){
                if(this.account === "" || this.passwd === "")
                    this.warningMsg = "账号或密码不能为空!"
                else{
                    this.warningMsg = ""
                    // 登录方法
                    let data = {
                        "id" : this.account,
                        "username" : this.registerName,
                        "password" : this.passwd,
                        "confirmPassword": this.confPasswd
                    }
                    axios.post('http://localhost:8080/user/login',data).then(
                    response=>{
                        if(response.message==="登陆成功！"){
                            this.setUserName(response.data.userName)
                        } else {
                            this.warningMsg = "账号或密码错误!"
                        }
                    }, error=>{
                        console.log('ERROR',error.message)
                    })
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
                if(this.registerName === "" || this.account === "" || this.passwd === "")
                    this.warningMsg = "用户昵称、账号和密码不能为空!"
                else{
                    if(this.passwd !== this.confPasswd)
                        this.warningMsg = "两次输入的密码不一致!"
                    else{
                        this.warningMsg = ""
                        // 注册方法
                        let data = {
                            "id" : this.account,
                            "password" : this.passwd
                        }
                        axios.post('http://localhost:8080/user/register',data).then(
                        response=>{
                            console.log('http://localhost:8080/user/register',response)
                        }, error=>{
                            console.log('ERROR',error.message)
                        })
                    }
                }
            }
        },
        closePage(){
            this.$router.push('/')
        },
        registerNameGet(name){
            this.registerName = name
            this.warningMsg = ""
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
        userHeadImgPath:{
            // 用户头像路径，注意要使用png图片，否则将会有白边
            type: String,
            default: "../../src/img/userHead.png"
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
}

.pageLayout{
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    position: fixed;
    z-index: 100;
}

#wallpaper{
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

#wallpaper.backgroundImg {
    background-image: v-bind("'url(\"' + backgroundImg + '\")'");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
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