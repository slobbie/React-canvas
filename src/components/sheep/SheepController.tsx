import React from 'react'
import aSheep from './aSheep'
import SheepImg from './sheep.png'

const SheepController = (stageWidth: number, stageHeight: number) => {
  let items: any = []
  let isLoaded = false
  let cur = 0
  let img = new Image()
  img.src = SheepImg

  const resize = () => {
    let StageWidth = stageWidth
    let StageHeight = stageHeight
  }

  const addSheep = () => {
    items.push(
        aSheep(img, stageWidth)
    )
  }

  const loaded = () => {
    isLoaded = true
    addSheep()

  }

  const draw = (ctx: CanvasRenderingContext2D, time: number, dots: any) => {
    if (isLoaded) {
        cur += 1
        if (cur > 200){
            cur = 0
            addSheep()
        }
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i]
            if (item.x < -item.width) {
                items.splice(i, 1)
            } else {
                item.draw(ctx, time, dots)
            }
        }
    }
  }

  img.onload = () => {
    loaded()
  }

  return {resize, draw, loaded}
}

export default SheepController
