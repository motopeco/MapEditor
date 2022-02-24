<script lang="ts" setup>

import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'

const store = useStore(key)

const radio = ref(store.state.massType)
watch(() => radio.value, (v) => {
  store.commit('setMassType', v)
})

</script>

<template>
  <div>
    <el-radio-group v-model="radio" size="large">
      <el-radio-button :label="1">Start</el-radio-button>
      <el-radio-button :label="2">Goal</el-radio-button>
      <el-radio-button :label="3">Lucky</el-radio-button>
      <el-radio-button :label="4">UnLucky</el-radio-button>
      <el-radio-button :label="5">FindWork</el-radio-button>
      <el-radio-button :label="6">Work</el-radio-button>
      <el-radio-button :label="7">Marry</el-radio-button>
      <el-radio-button :label="8">Birth</el-radio-button>
    </el-radio-group>
  </div>
</template>
