<template>
  <a :href="url">
    <slot :slotData="website">
      {{ website.subTitle }}
    </slot>
  </a>
</template>

<script>
export default {
  props: ['url'],
  data () {
    return {
      website: {
        url: 'http://www.believel.com',
        subTitle: '相信',
        title: '你好哈'
      }
    }
  }
}
</script>
