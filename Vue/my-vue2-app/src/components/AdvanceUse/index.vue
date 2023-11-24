<template>
  <div>
    <h1>vue2 高级特效</h1>
    <SlotDemo :url="url">
      百度
    </SlotDemo>
    <ScopedSlotDemo :url="url">
      <template v-slot="slotScope">
        {{ slotScope.slotData.title}}
      </template>
    </ScopedSlotDemo>
  </div>
</template>

<script>
import SlotDemo from './SlotDemo.vue'
import ScopedSlotDemo from './ScopedSlotDemo.vue'
export default {
  components: {
    SlotDemo,
    ScopedSlotDemo
  },
  data () {
    return {
      url: 'http://www.baidu.com'
    }
  }
}
</script>
