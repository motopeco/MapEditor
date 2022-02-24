<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '../store'
import { ref } from 'vue'

const jsonStr = ref('')

const store = useStore(key)
store.subscribe((mutation => {
  if (mutation.type === 'add' || mutation.type === 'update') {
    jsonStr.value = JSON.stringify(store.state.massDatum, null, 4)
  }
}))
</script>

<template>
  <div>
    <el-input v-model="jsonStr" type="textarea"></el-input>
  </div>
</template>
