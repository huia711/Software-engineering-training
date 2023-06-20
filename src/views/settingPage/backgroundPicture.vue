<template>
  <div class="gbl">
    <!-- 选项 -->
    <div class="radioSwitch">
      <radioSwitch :text-array="textArray" @changeSelection="backgroundSource"/>
    </div>
    <div class="show">
      <!-- 网络图片展示 -->
      <div class="basis">
        <spinnerBox v-show="state.pictureLoading"/>
        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center; cursor: pointer;"
        @click="loadWebPicture">
          <closeButton v-show="!state.pictureLoaded"/>
          <p v-show="!state.pictureLoaded">重新加载</p>
        </div>
        <!-- 从本地读取图片，仅供测试使用 -->
        <!-- <input type="file" style="width: 600px; height: 100px;" ref="testInput" multiple @change="testFunc"> -->
        <div v-for="(image, index) in state.images" :key="index">
          <imageViewer :image-url="image.url" :image-alt="image.alt" :image-description="image.description" />
        </div>
      </div>
      <!-- 本地图片上传 -->
      <div>
        <fileChoose />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入 axios 库
import axios from '@/plugins/axios';
import { ref, onMounted, reactive } from 'vue';
import imageViewer from '@/components/basis/imageViewer.vue';
import radioSwitch from '@/components/basis/radioSwitch.vue';
import fileChoose from '@/components/basis/fileChoose.vue';
import spinnerBox from '@/components/basis/spinnerBox.vue';
import closeButton from '@/components/basis/closeButton.vue';

const textArray = ["网络图片","本地图片"];

// 定义图片数据类型
interface ImageInfo {
  url: string,
  alt: string,
  description: string
}

// 在组件加载完成时获取图片数据并更新 images 数据
onMounted(() => {
  loadWebPicture()
});

async function loadWebPicture(){
  try {
    state.pictureLoading = true
    state.pictureLoaded = true
    // 从服务器获取背景图片
    const response = await axios.get<any>('http://localhost:8080/api/web-images');
    state.images.values = response.data;
  } catch (error) {
    console.log(error);
    state.pictureLoaded = false
  }
  state.pictureLoading = false
}

const state = reactive({
  backgroundSourceIndex: 0,
  pictureLoading: true,
  pictureLoaded: true,
  // 使用 ref 定义响应式数据
  images: ref<Array<ImageInfo>>([])
});

const backgroundSource = (index:number)=>{
  state.backgroundSourceIndex = index
}

// 仅供测试使用
// const testFunc = (eve:any)=>{
//    // 获取文件路径并设置到 images 中
//   while(state.images.length>0)
//     state.images.pop();
//   var i = 0;
//   var file:any;
//   for(i = 0;i < eve.target.files.length;i++){
//     file = eve.target.files[i]
//     console.log(file)
//     state.images.push({
//       url: URL.createObjectURL(file),
//       alt: "error:" + file,
//       description: "Test"
//     });
//   }
// }
</script>

<style scoped>

.gbl{
  display: flex;
  flex-direction: row;
  padding: 10px 30px 10px 30px;
  margin: 0px;
  width: 1200px;
  max-width: 600px;
  height: 600px;
  overflow: hidden;
  justify-content: center;
  z-index: 1;
}

.show{
  display: flex;
  flex-direction: row;
  transition: all 0.5s ease;
  transform: v-bind("'translate(' + (-state.backgroundSourceIndex/textArray.length*100+25).toFixed(0) + '%,0%)'")
}

.radioSwitch{
  display: flex;
  position: fixed;
  height: 30px;
  z-index: 100;
}

.basis{
  background-color: transparent;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  height: auto;
  min-height: 600px;
  width: 600px;
  overflow: hidden scroll;
  z-index: 1;
  align-items: center;
  justify-content: center;
}

.basis::-webkit-scrollbar{
  display: none;
}
</style>