<template>
  <!-- Icon Tooltip 组件 -->
  <span :class="['icon-tooltip', props.type]">
    <!-- Ant Desgin Vue 的浮动提示框 -->
    <a-tooltip :title="props.title">
      <!-- Icon Tooltip 的插槽，允许自定义Tooltip内容 -->
      <slot>
        <!-- 根据传进来的type属性渲染不同的Icon图标 -->
        <info-circle-outlined v-if="props.type === 'info'" />
        <exclamation-circle-outlined v-else-if="props.type === 'warn'" />
        <check-circle-outlined v-else-if="props.type === 'success'" />
        <close-circle-outlined v-else-if="props.type === 'error'" />
      </slot>
    </a-tooltip>
  </span>
</template>

<script lang="ts" setup type="module">
// 导入Ant Design Vue的Icon组件
import {
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from "@ant-design/icons-vue"
import { defineProps, withDefaults } from 'vue'

// Icon Tooltip 组件的 Props
interface IconTooltipProps {
  title: string // Tooltip文本
  type?: "error" | "info" | "warn" | "success" // Icon图标的类型
}

// 使用 withDefaults 和 defineProps 方法定义 Props，type有默认值"info"。
const props = withDefaults(defineProps<IconTooltipProps>(), {
  type: "info"
})
</script>

<style lang="less">
//@import "@/style/default.less";

.icon-tooltip {
  margin-left: 4px;

  // 不同类型的图标颜色不同
  &.success {
    //color: @success-color;
  }
  &.info {
    //color: @info-color;
  }
  &.warn {
    //color: @warning-color;
  }
  &.error {
    //color: @error-color;
  }
}
</style>
