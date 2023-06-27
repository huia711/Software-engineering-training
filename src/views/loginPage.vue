<template>
    <main class="base">
        <div id="wallpaper">
        <div v-loading="spinnerZIndex" element-loading-background="rgba(0,0,0,0.6)" class="pageLayout">
            <closeButton @close="closePage"/>
            <div class="global">
                <modernButton 
                :srcPath="userHeadImgPath" 
                :autoCalculation="false"
                :textUnderButton="registerMode === true ? 'Register' : 'Login'" 
                :customButtonStyle="imgStyle" />
                <div class="loginPage">
                    <!-- 显示登录/注册界面 -->
                    <p v-show="registerMode" class="inputBoxs">昵称：<inputBox :visibleButton = "false" :widthExpand="32" @dataChanged="registerNameGet" /></p>
                    <p v-show="!registerMode" class="inputBoxs">账号：<inputBox :visibleButton = "false" :defaultContent="account" :widthExpand="32" @dataChanged="accountGet" /></p>
                    <p class="inputBoxs">密码：<inputBox :visibleButton = "true" :widthExpand="32" @dataChanged="passwdGet" /></p>
                    <p v-show="registerMode" class="inputBoxs">确认密码：<inputBox :visibleButton = "true" @dataChanged="confPasswdGet" /></p>
                    <modernButton buttonText="登 录" :customButtonStyle="buttonStyle" @buttonClicked="loginButtonClicked" />
                    <modernButton buttonText="注 册" :customButtonStyle="buttonStyle" @buttonClicked="regButtonClicked" />
                    <p style="color: red;height: 20px;">{{ warningMsg }}</p>
                </div>
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
import { useStore } from '@/store';
import $ from 'jquery'
import axios from "@/plugins/axios"
import { mapMutations } from 'vuex';

export default{
    setup(){
        const store = useStore();
        return {
            pageColorStyle: computed(()=>store.state.settings.pageColorStyle),
            backgroundImg: computed(()=>store.state.settings.backgroundImg),
            imgStyle: computed(()=>store.state.settings.imgStyle),
            userName: computed(()=>store.state.settings.userName),
            userHeadImgPath: computed(()=>store.state.settings.avatar),
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
            account: "",
            passwd: "",
            confPasswd: "",
            warningMsg: "",
            registerName: "",
            registerMode: false,
            spinnerZIndex: false,
            colorStyle: cal.hexToRgb(this.pageColorStyle.backgroundColor.hex),
            buttonColorStyle: cal.hexToRgb(this.pageColorStyle.buttonColor.hex),
            buttonStyle: {
                backgroundColor: this.pageColorStyle.buttonColor.hex,
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
        ...mapMutations(['setUserName','setUserId','setAvatar','initSettings','setBackgroundImage']),
        loginButtonClicked(){
            if(this.registerMode === false){
                if(this.account === "" || this.passwd === "")
                    this.warningMsg = "账号或密码不能为空!"
                else{
                    this.warningMsg = ""
                    this.spinnerZIndex = true
                    // 登录方法
                    let data = {
                        "id" : this.account,
                        "username" : this.registerName,
                        "password" : this.passwd,
                        "confirmPassword": this.confPasswd
                    }
                    try {
                        axios.post('http://localhost:2020/user/login',data).then(response=>{
                            if(response.data.code === 200){
                                // 登陆成功
                                /** 
                                 * 返回消息内容格式：
                                 * {
                                 *  code:...
                                 *  data:
                                 *      {
                                 *          userName:...
                                 *          backgroundColor:...         <= 背景颜色
                                 *          backgroundAlpha:...         <= 背景颜色Alpha
                                 *          buttonColor:...             <= 按钮颜色
                                 *          backgroundAlpha:...         <= 按钮颜色Alpha
                                 *          customBackgroundColor:...   
                                 *          customButtonColor:...
                                 *          presetColor:...
                                 *          searchItemCount:...
                                 *          avatar:...              <= 用户头像URL，无则返回"null"
                                 *          backgroundURL:...       <= 用户背景图片URL，无则返回"null"
                                 *          ...                     <= 后期可能增加的其它用户数据
                                 *      }
                                 *  ...
                                 * }
                                 */
                                this.setUserName(response.data.data.userName)
                                this.setUserId(this.account)
                                // 初始化用户设置
                                this.initSettings({
                                    pageColorStyle: {
                                        customBackgroundColor: response.data.data.customBackgroundColor,
                                        customButtonColor: response.data.data.customButtonColor,
                                        presetColor: response.data.data.presetColor,
                                        backgroundColor:{
                                            hex: response.data.data.backgroundColor,
                                            alpha: response.data.data.backgroundAlpha
                                        },
                                        buttonColor:{
                                            hex: response.data.data.buttonColor,
                                            alpha: response.data.data.buttonAlpha
                                        },
                                    },
                                    searchItemCount: response.data.data.searchItemCount
                                })
                                // 获取用户头像
                                /**
                                 * 返回格式：
                                 * {
                                 *  code:...
                                 *  data:...  <= 图片数据
                                 * }
                                 */
                                if(response.data.data.avatar !== "null")
                                    axios.get(response.data.data.avatar).then(response=>{
                                        let imagestr = window.atob(response.data.data.image);
                                        const imageBytes = new Uint8Array(imagestr.length);
                                        for(let i = 0;i < imagestr.length; i++)
                                            imageBytes[i] = imagestr.charCodeAt(i);
                                        const avatarBlob = new Blob([imageBytes],{ type:'iamge/jpeg' });
                                        this.setAvatar(URL.createObjectURL(avatarBlob));
                                    })
                                // 获取用户背景图片，格式同上方头像
                                if(response.data.data.backgroundURL !== "null")
                                    axios.get(response.data.data.backgroundURL).then(response=>{
                                        if(response.data.code === 200){
                                            let imagestr = window.atob(response.data.data.image);
                                            const imageBytes = new Uint8Array(imagestr.length);
                                            for(let i = 0;i < imagestr.length; i++)
                                                imageBytes[i] = imagestr.charCodeAt(i);
                                            const backgroundBlob = new Blob([imageBytes], { type: 'image/jpeg' });
                                            this.setBackgroundImage(URL.createObjectURL(backgroundBlob));
                                        }
                                    })
                                this.spinnerZIndex = false
                                this.closePage()
                            } else {
                                this.spinnerZIndex = false
                                this.warningMsg = response.data.msg
                            }
                        },(error)=>{
                            this.spinnerZIndex = false
                            this.warningMsg = "无法连接服务器"
                        })
                    } catch (error) {
                        console.log(error)
                        this.spinnerZIndex = false
                    }
                }
            }
            else{
                // 转至登录页面
                this.registerMode = false
            }
        },
        regButtonClicked(){
            if(this.registerMode === false){
                // 转至注册页面
                this.registerMode = true
            }
            else{
                if(this.registerName === "" || this.passwd === "")
                    this.warningMsg = "用户昵称和密码不能为空!"
                else{
                    if(this.passwd !== this.confPasswd)
                        this.warningMsg = "两次输入的密码不一致!"
                    else{
                        this.warningMsg = ""
                        // 注册方法
                        this.spinnerZIndex = true
                        let data = {
                            "userName" : this.registerName,
                            "password" : this.passwd,
                            "confirmPassword": this.passwd
                        }
                        axios.post('http://localhost:2020/user/register',data).then(response=>{
                            if(response.data.code === 200){
                                // 注册成功
                                this.setUserName(this.registerName)
                                this.account = response.data.data.id
                            }
                            this.spinnerZIndex = false
                        },error=>{
                            this.spinnerZIndex = false
                            this.warningMsg = "无法连接服务器"
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

#spinnerLayer{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.6);
    z-index: 200;
}

#wallpaper{
    display: flex;
    align-items: center;
    justify-content: center;
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