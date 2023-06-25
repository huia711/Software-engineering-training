<template>
    <div class="base" v-loading="uploading" element-loading-background="rgba(0,0,0,0.6)">
        <div class="container">
            <p>修改昵称：<inputBox :visibleButton="false" :clearAllButton="true" :widthExpand="100" @dataChanged="getNewName" :defaultContent="userName"/></p>
            <modernButton :customButtonStyle="buttonStyle" buttonText="确认修改" @buttonClicked="uploadName" element-loading-background="rgba(0,0,0,0.6)" />
            <modernButton :customButtonStyle="buttonStyle" buttonText="取消" @buttonClicked="cancle" />
        </div>
        <el-dialog :title="messageTitle" v-model="messageVisible" width="30%">
        <span>{{ message }}</span>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="messageVisible = false">确认</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import modernButton from './modernButton.vue';
import inputBox from './inputBox.vue';
import axios from 'axios';
import cal from '@/utils/calculation';
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';
import { mapMutations } from 'vuex';
export default{
    setup(){
        const store = useStore()
        return{
            userId: computed(()=>store.state.settings.userId),
            userName: computed(()=>store.state.settings.userName),
            pageColorStyle: computed(()=>store.state.settings.pageColorStyle),
        }
    },
    data(){
        return{
            curName: this.userName,
            message: "",
            messageTitle: "",
            messageVisible: false,
            uploading: false,
            backgroundColor: computed(()=>cal.rgbaTextSpawn(cal.hexToRgb(this.pageColorStyle.backgroundColor.hex), this.pageColorStyle.backgroundColor.alpha)),
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
    watch:{
        pageColorStyle(newVal, oldVal){
            this.buttonStyle.backgroundColor = newVal.buttonColor.hex
        }
    },
    methods:{
        ...mapMutations(['setUserName']),
        getNewName(newVal){
            this.curName = newVal
        },
        cancle(){
            this.$emit("cancle")
        },
        uploadName(){
            if(this.curName === ""){
                this.message = "昵称不能为空!"
                this.messageTitle = "错误"
                this.messageVisible = true
                return;
            }
            if(this.curName === this.userName){
                this.message = "昵称不能与原名相同!"
                this.messageTitle = "警告"
                this.messageVisible = true
                return;
            }

            let data = {
                "Id": this.userId,
                "userName": this.curName
            }
            this.uploading = true
            axios.post('http://localhost:2020/user/changeUserName',data).then(response=>{
                if(response.data.code === 200){
                    // 修改成功
                    this.setUserName(this.curName)
                } else {
                    // 修改失败
                    this.message = "ERROR: Reply code " + response.data.code
                    this.messageTitle = "错误"
                    this.messageVisible = true
                }
                this.uploading = false
            }, error=>{
                this.message = "ERROR:" + error.message
                this.messageTitle = "错误"
                this.uploading = false
                this.messageVisible = true
            })
        }
    },
    components:{
        modernButton,
        inputBox
    }
}
</script>

<style scoped>

.base{
  width: 100%;
  height:100%;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  font-family: SmileySans,serif;
}

.container{
  display: flex;
  position: fixed;
  border-radius: 10px;
  width: 550px;
  height: 400px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: v-bind("backgroundColor");
}

</style>