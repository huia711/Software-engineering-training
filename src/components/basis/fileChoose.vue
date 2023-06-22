<template>
    <div class="fileChooser">
        <div @click="openFileBrowser" class="chooser">
            <img v-if="imageURL" :src="imageURL" alt="Invalid resource" style="height: auto; width: auto; max-height: 300px;" />
            <p class="textDisplay">您可以点击此处并选择本地图片进行上传</p>
        </div>
        <inputBox :visibleButton="false" 
        placeHolder="您也可在此输入图片链接" 
        :widthExpand="50" style="margin: 20px;"
        :defaultContent="displayPath"
        :clearAllButton="true"
        @dataChanged="getdisplayPath"
        @inputFinished="checkURL"
        />
        <modernButton buttonText="确认上传" 
        :customButtonStyle="buttonStyle" 
        @mouseOn="uploadButtonState(true)" 
        @mouseLeave="uploadButtonState(false)"
        @buttonClicked="uploadPicture"
        />
        <input ref="fileInput" type="file" style="display:none;" accept="image/*" @change="handleFileChange" />
    </div>
</template>

<script>
import modernButton from '@/components/basis/modernButton.vue'
import inputBox from '@/components/basis/inputBox.vue'
import { useStore } from '@/store'
import { computed } from '@vue/reactivity'
import cal from '@/utils/calculation'
import { mapMutations } from 'vuex'
import axios from "@/plugins/axios"
export default {
  setup(){
    const store = useStore();
    return{
      curAlpha: 0,
      pageColorStyle: computed(() => store.state.settings.pageColorStyle),
      id: computed(()=> store.state.settings.userId),
      store
    }
  },
  data(){
    return{
      displayPath: "",
      imageURL: "",
      imageData: null,
      buttonStyle:{
        backgroundColor:cal.rgbaTextSpawn(
                        cal.hexToRgb(this.pageColorStyle.buttonColor.hex),
                        cal.max(this.curAlpha,this.pageColorStyle.buttonColor.alpha)),
        width: "100px",
        height: "30px",
        borderColor: "transparent",
        borderRadius: "15px",
        cursor: "pointer"
      },
    }
  },
  methods: {
    ...mapMutations(['setBackgroundImage']),
    openFileBrowser() {
      // 手动触发点击事件，打开文件选择框
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      // 获取文件路径并设置到 data 中
      const file = event.target.files[0];
      this.imageURL = URL.createObjectURL(file);
      this.displayPath = this.imageURL.replace("blob:","")

      // 创建 FileReader 对象
      // const reader = new FileReader();
      // reader.onload = (event) => {
      //   获取图片 base64 数据并设置到 data 中
      //   this.imageData = event.target.result.toString();
      // };
      // 读取文件数据
      // reader.readAsDataURL(file);
    },
    checkURL(){
      if(this.displayPath!==""){
        // 从用户输入的URL获取图片
        try{
          axios.get(this.displayPath, { responseType: 'arraybuffer' }).then(response=>{
            this.imageData = response.data;
            const imageBlob = new Blob([this.imageData], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
          // 现在，你可以将 imageUrl 用作 img 标签的 src 属性了。
            this.imageURL = imageUrl
            this.displayPath = imageUrl.replace("blob:","")
          }, error=>{
            console.log(error.message)
          })
        }catch(error){
          console.log(error)
        }
      }
    },
    getdisplayPath(path){
      this.displayPath = path.replace("blob:","")
    },
    uploadPicture(){
      if(this.imageURL !== ""){
        let data = {
          "id": this.id,
          "imageData": this.imageData,
          "description": "Customized background"
        }
        // 推送用户图片数据
        axios.post('http://localhost:2020/user/uploadBackground',data).then(response=>
        {
          console.log('http://localhost:2020/user',response)
        }, error=>{console.log(error.message)})
        // 推送完后加载背景图片
        this.setBackgroundImage(this.imageURL)
      }
    },
    handleClearEvent(){
      this.imageURL = ""
    },
    uploadButtonState(state){
      if(state){
        this.curAlpha = cal.min(0.8, this.pageColorStyle.buttonColor.alpha + 0.2)
      } else {
        this.curAlpha = 0
      }
      this.buttonStyle.backgroundColor = cal.rgbaTextSpawn(
                                         cal.hexToRgb(this.pageColorStyle.buttonColor.hex),
                                         cal.max(this.curAlpha,this.pageColorStyle.buttonColor.alpha))
    }
  },
  watch:{
    pageColorStyle(newVal,oldVal){
      this.buttonStyle.backgroundColor = cal.rgbaTextSpawn(
                                         cal.hexToRgb(newVal.buttonColor.hex),
                                         cal.max(this.curAlpha,newVal.buttonColor.alpha))
    }
  },
  components:{
    modernButton,
    inputBox
  }
}
</script>

<style scoped>

.chooser{
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    border-radius: 10px;
    min-height: 200px;
    height: auto;
    width: 300px;
    background-color: lightgrey;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.textDisplay{
    display: flex;
    position: fixed;
    z-index: 100;
}

.fileChooser{
    margin: 0px;
    padding: 0px;
    width: 600px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

</style>