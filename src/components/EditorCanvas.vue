<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { useStore } from 'vuex'
import { key, MassData } from '../store'

function getTypeName(type: number) {
  switch (type) {
    case 1:
      return 'Start'
    case 2:
      return 'Goal'
    case 3:
      return 'Lucky'
    case 4:
      return 'UnLucky'
    case 5:
      return 'findWork'
    case 6:
      return 'work'
    case 7:
      return 'marry'
    case 8:
      return 'birth'
    default:
      return '-'
  }
}

const app = new PIXI.Application({ height: 500, width: 800 })
app.view.style.width = '100%'

const viewport = new Viewport({
  screenWidth: 800,
  screenHeight: 500,
  worldWidth: 3000,
  worldHeight: 3000
})

viewport.drag().pinch().wheel().decelerate()

app.stage.addChild(viewport)

for (let i = 0; i < viewport.worldWidth / 100; i++) {
  const g = new PIXI.Graphics()
  g.lineStyle(1, 0xffffff).moveTo(0, i * 100).lineTo(viewport.worldWidth, i * 100)
  viewport.addChild(g)
}

for (let i = 0; i < viewport.worldHeight / 100; i++) {
  const g = new PIXI.Graphics()
  g.lineStyle(1, 0xffffff).moveTo(i * 100, 0).lineTo(i * 100, viewport.worldHeight)
  viewport.addChild(g)
}

const massLayer = new PIXI.Container()
viewport.addChild(massLayer)

const store = useStore(key)
store.subscribe(((mutation, state) => {
  if (mutation.type === 'add' || mutation.type === 'update') {
    const datum = store.state.massDatum
    massLayer.removeChildren()
    datum.forEach((data, index) => {
      const obj = new PIXI.Graphics()
      obj.beginFill(0xffffff)
      obj.lineStyle(1, 0x5555555)
      obj.drawRect(data.x * 100, data.y * 100, 100, 100)
      massLayer.addChild(obj)

      const text = new PIXI.Text(`#${index}\ntype: ${getTypeName(data.type)}`, { fontSize: 20 })
      text.x = data.x * 100
      text.y = data.y * 100
      massLayer.addChild(text)
    })
  }
}))

viewport.on('clicked', (e) => {
  const world = e.world

  const x = Math.floor(world.x / 100)
  const y = Math.floor(world.y / 100)

  // console.log(x, y)

  const exist = store.state.massDatum.find((mass) => mass.x === x && mass.y === y)
  if (exist) {
    console.log('exist')
    return
  }

  store.commit('add', {
    type: store.state.massType,
    x,
    y
  })
})

const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
sprite.x = 100

onMounted(() => {
  const container = document.getElementById('pixi-container')!
  container.appendChild(app.view)
})
</script>

<template>
  <div id="pixi-container"></div>
</template>
