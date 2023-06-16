<!--<template>-->
<!--  <div-->
<!--    id="wallpaper-image"-->
<!--    v-if="!isEmpty(background.url)"-->
<!--    :style="{ backgroundImage: `url(${background.url})` }"-->
<!--  >-->
<!--    <div class="wallpaper-mask"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup type="module">-->
<!--import { computed, inject } from "vue"-->
<!--import { verifyImageUrl } from "@/utils/file"-->
<!--import { BackgroundType, ThemeMode } from "@/enum-interface"-->
<!--import { useStore } from "@/store"-->
<!--import { SettingActions } from "@/store/setting"-->
<!--import { isEmpty } from "@/utils/common"-->
<!--import { CURRENT_THEME_KEY } from "@/components/ConfigProvider.vue"-->

<!--const { state, dispatch } = useStore()-->
<!--const background = computed(() => state.setting.background)-->

<!--// 获取当前主题-->
<!--const currentTheme = inject(CURRENT_THEME_KEY)-->

<!--// 遮罩不透明度-->
<!--const maskOpacity = computed(() => {-->
<!--  const defaultOpacity = 0.75-->
<!--  const { maskOpacity, autoOpacity } = background.value-->

<!--  return autoOpacity && currentTheme!.value === ThemeMode.Dart-->
<!--    ? (defaultOpacity + (1 - defaultOpacity) * maskOpacity!).toFixed(2)-->
<!--    : maskOpacity-->
<!--})-->

<!--// 如果 URL无效则重新加载-->
<!--const verifyBackground = await verifyImageUrl(background.value.url!)-->
<!--if (!verifyBackground) {-->
<!--  await dispatch(SettingActions.reloadBackgroundImage)-->
<!--}-->

<!--// 加载Bing每日壁纸-->
<!--if (background.value.type === BackgroundType.Bing) {-->
<!--  await dispatch(SettingActions.loadBingDailyWallpaper)-->
<!--}-->
<!--</script>-->

<!--<style lang="less">-->
<!--// 定义变量保存壁纸的模糊度值-->
<!--@wallpaper-blur: v-bind("`${background.blur}px`");-->

<!--// 壁纸图片的父元素-->
<!--#wallpaper-image {-->
<!--  position: absolute;  // 定位方式为绝对定位-->
<!--  top: calc(@wallpaper-blur * -2);  // 上边缘距离屏幕顶部两倍模糊度值-->
<!--  left: calc(@wallpaper-blur * -2);  // 左边缘距离屏幕左侧两倍模糊度值-->
<!--  right: calc(@wallpaper-blur * -2); // 右边缘距离屏幕右侧两倍模糊度值-->
<!--  bottom: calc(@wallpaper-blur * -2);  // 下边缘距离屏幕底部两倍模糊度值-->

<!--  background-repeat: no-repeat;  // 壁纸图片不进行平铺-->
<!--  background-size: cover;  // 将壁纸图片按比例拉伸，覆盖整个父元素-->
<!--  background-position: center;  // 壁纸图片在父元素中居中-->

<!--  filter: blur(@wallpaper-blur);  // 给壁纸图片应用模糊效果-->

<!--  // 壁纸图片上的遮罩层-->
<!--  .wallpaper-mask {-->
<!--    width: 100%;  // 遮罩层宽度为父元素的100%-->
<!--    height: 100%;  // 遮罩层高度为父元素的100%-->

<!--    background-color: v-bind("background.maskColor");  // 设置遮罩层背景颜色-->
<!--    opacity: v-bind("maskOpacity");  // 设置遮罩层透明度-->
<!--  }-->
<!--}-->
<!--</style>-->
