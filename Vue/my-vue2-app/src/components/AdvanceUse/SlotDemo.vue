<template>
  <a :href="url">
    <slot>
      默认内容，如果父组件设置内容了会被替换
    </slot>
  </a>
</template>

<script>
export default {
  props: ['url']
}
</script>
