<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'
import MapCanvas from '../libs/MapCanvas'

const mapCanvas = new MapCanvas()

const store = useStore(key)
store.subscribe(((mutation) => {
  if (mutation.type === 'add' || mutation.type === 'update') {
    mapCanvas.updateData(store.state.massDatum)
  }
}))

mapCanvas.registerClickedEvent(store)

onMounted(() => {
  const container = document.getElementById('pixi-container')!
  container.appendChild(mapCanvas.getCanvas())
})
</script>

<template>
  <div id="pixi-container"></div>
</template>
