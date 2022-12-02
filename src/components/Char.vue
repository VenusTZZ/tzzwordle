<script setup lang="ts">
import pinyin from 'pinyin/lib/pinyin'
import { defineProps } from 'vue'
const props = defineProps<{
  char: string,
  result:'right'|'wrong'|'normal'
}>()

const colorList = {
  right: 'text-green-500',
  wrong: 'text-yellow-500',
  normal: 'text-white'
}
</script>

<template>
  <div inline-flex flex-col items-center>
    <div 
      border-white mb-1 
      :class="colorList[result]">
      {{ pinyin(props.char)[0][0] }}
    </div>
    <div 
      flex items-center justify-center 
      text-2xl border border-white w-12 h-12
      :class="colorList[result]">
      {{ props.char }}
    </div>
  </div>
</template>

<style scoped>

</style>
