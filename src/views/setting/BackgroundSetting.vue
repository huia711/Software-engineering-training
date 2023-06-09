<template>
  <div class="background-setting">
    <setting-item :lable="t('background.wallpaper.setting')">
      <el-radio-group v-model = "background.type" button-style="solid">
        <el-radio :label = "BackgroundType.None">{{ t("background.wallpaper.none") }}</el-radio>
        <el-radio :label = "BackgroundType.Local">{{ t("background.wallpaper.local") }}</el-radio>
        <el-radio :label = "BackgroundType.Bing">{{ t("background.wallpaper.bing") }}</el-radio>
      </el-radio-group>
    </setting-item>

<!--    <setting-item-->
<!--      v-if="background.type === BackgroundType.Local"-->
<!--      class="upload-layout"-->
<!--      :lable="t('background.wallpaper.upload')"-->
<!--    >-->
<!--      <a-upload-->
<!--        class="background-uploader"-->
<!--        list-type="picture-card"-->
<!--        :show-upload-list="false"-->
<!--        :customRequest="uploadBackgroundImage"-->
<!--        accept="image/*"-->
<!--        style="width: 100%"-->
<!--      >-->
<!--        <img v-if="background.url" :src="background.url" alt="avatar" />-->
<!--        <div v-else>-->
<!--          <plus-outlined />-->
<!--        </div>-->
<!--      </a-upload>-->
<!--    </setting-item>-->

    <template v-if="background.type !== BackgroundType.None">
<!--      <setting-item :lable="t('background.blur')">-->
<!--        <a-slider v-model:value="background.blur" :max="48" :tipFormatter="toPixel" />-->
<!--      </setting-item>-->

<!--      <setting-item :lable="t('background.maskOpacity')">-->
<!--        <a-slider-->
<!--          v-model:value="background.maskOpacity"-->
<!--          :step="0.01"-->
<!--          :max="1"-->
<!--          :tipFormatter="toPercent"-->
<!--        />-->
<!--      </setting-item>-->

      <setting-item :lable="t('background.wallpaperDark')" horizontal>
        <el-switch v-model = "background.autoOpacity" />
      </setting-item>
    </template>
  </div>
</template>

<script lang="ts" setup type="module">
  /**
   * 导入（import）
   */
  import { watch } from "vue"
  import { useStore } from "@/store"
  import { SettingActions, SettingMutations } from "@/store/setting"
  // 导入组件Component
  import SettingItem from "@/components/SettingItem.vue"
  // 导入外部定义
  import { BackgroundSetting, BackgroundType } from "@/enum-interface"  // 引入壁纸设置和壁纸类型
  // 外部导入
  import { useI18n } from "vue-i18n"
  // import { isExtension, Permis } from "@/plugins/extension"  // 引入扩展和权限检查的辅助函数
  // import { toPixel, toPercent } from "@/utils/format"
  // import { deepComputed } from "@/utils/common"  // 引入计算深层对象属性的辅助函数

  /**
   * 常/变量（const/let）的定义
   */
  const { t } = useI18n()
  const store = useStore()
  const background = store.state.setting.background

  /**
   * 响应式对象（reactive,computed）
   */
  // 监听到背景类型为Bing则拉取壁纸
  watch(
      () => background.type,
      type => {
        if (type === BackgroundType.Bing) {
          store.dispatch(SettingActions.loadBingDailyWallpaper)
        }
      }
  )

  /**
   * 函数（function）定义
   */
  // 更新背景设置
  function updateBackgroundSetting(value: BackgroundSetting) {
    store.commit(SettingMutations.updateBackgroundSetting, value)
  }
  // // 上传壁纸
  // function uploadBackgroundImage(e) {
  //   store.dispatch(SettingActions.uploadBackgroundImage, e.file)
  // }
</script>

<style lang="less">
  .background-setting {
    .upload-layout {
      margin-top: 8px;

      .background-uploader {
        .el-upload,
        img {
          width: 100%;
          height: 128px;

          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
</style>
