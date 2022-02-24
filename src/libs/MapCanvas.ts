import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { MassData, RootState } from '../store'
import { getTypeName } from './common'
import { Store } from 'vuex'

export default class MapCanvas {
  private app: PIXI.Application
  private viewport!: Viewport
  private layer!: PIXI.Container

  constructor() {
    const app = new PIXI.Application({ height: 500, width: 800 })
    app.view.style.width = '100%'
    this.app = app

    this.createViewport()
    this.createGrid()
    this.createMassLayer()
  }

  private createViewport() {
    const viewport = new Viewport({
      screenWidth: 800,
      screenHeight: 500,
      worldWidth: 3000,
      worldHeight: 3000
    })

    viewport.drag().pinch().wheel().decelerate()

    this.app.stage.addChild(viewport)
    this.viewport = viewport
  }

  private createGrid() {
    for (let i = 0; i < this.viewport.worldWidth / 100; i++) {
      const g = new PIXI.Graphics()
      g.lineStyle(1, 0xffffff).moveTo(0, i * 100).lineTo(this.viewport.worldWidth, i * 100)
      this.viewport.addChild(g)
    }

    for (let i = 0; i < this.viewport.worldHeight / 100; i++) {
      const g = new PIXI.Graphics()
      g.lineStyle(1, 0xffffff).moveTo(i * 100, 0).lineTo(i * 100, this.viewport.worldHeight)
      this.viewport.addChild(g)
    }
  }

  private createMassLayer() {
    const massLayer = new PIXI.Container()
    this.viewport.addChild(massLayer)
    this.layer = massLayer
  }

  public updateData(datum: MassData[]) {
    this.layer.removeChildren()
    datum.forEach((data, index) => {
      const obj = new PIXI.Graphics()
      obj.beginFill(0xffffff)
      obj.lineStyle(1, 0x5555555)
      obj.drawRect(data.x * 100, data.y * 100, 100, 100)
      this.layer.addChild(obj)

      const text = new PIXI.Text(`#${index}\ntype: ${getTypeName(data.type)}`, { fontSize: 20 })
      text.x = data.x * 100
      text.y = data.y * 100
      this.layer.addChild(text)
    })
  }

  public registerClickedEvent(store: Store<RootState>) {
    this.viewport.on('clicked', (e) => {
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
  }

  public getCanvas() {
    return this.app.view
  }
}
