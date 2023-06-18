<template>
  <div class="gbl">
    <div class="basis">
      <div v-for="(image, index) in images" :key="index">
        <imageViewer :image-url="image.url" :image-alt="image.alt" :image-description="image.description" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入 axios 库
import axios from '@/plugins/axios';
import { ref, onMounted } from 'vue';
import imageViewer from '@/components/basis/imageViewer.vue';

// 定义图片数据类型
interface ImageInfo {
  url: string,
  alt: string,
  description: string
}

// 使用 ref 定义响应式数据
const images = ref<Array<ImageInfo>>([]);

// 在组件加载完成时获取图片数据并更新 images 数据
onMounted(async () => {
  try {
    const response = await axios.get<any>('/api/images');
    images.value = response.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>

.gbl{
  display: flex;
  flex-direction: row;
  padding: 10px 0px 10px 60px;
  margin: 0px;
  width: 1200px;
  max-width: 600px;
  overflow: hidden;
}

.basis{
    background-color: transparent;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    max-height: 600px;
    min-height: 600px;
    width: 600px;
    max-width: 600px;
    overflow: hidden;
}
</style>