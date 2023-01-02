import { randomInt } from 'crypto'
import React from 'react'

const Sun = (stageWidth: number, stageHeight: number) => {
    let radius = 200
    let x = stageWidth - radius - 140
    let y = radius + 100
    let total = 60
    let gap = 1 / total
    let originPos: any = []
    let pos: any = []

    let fps = 30
    let fpsTime = 1000 / fps

    const ranInt = (max: number) => {
        return Math.random() * max
    }




    const draw = (ctx: CanvasRenderingContext2D, time: number) => {
        let atime
        if (!atime) {
            atime = time
        }
        const now = time - atime
        if (now > fpsTime) {
            atime = time
            // updatePoints()
        }
        ctx.fillStyle = '#ffb200'
        ctx.beginPath()
        // for (let i = 1; i < total; i++) {
        //     const Pos = pos[i]
        //     ctx.lineTo(Pos.x + x, Pos.y + y)
        // }
        ctx.arc(x, y, radius, 0 ,2 * Math.PI)
        ctx.moveTo(pos.x + x, pos.y + y)

        ctx.fill()
    }

    // const updatePoints = () => {
    //     for (let i = 1; i < total; i++) {
    //         const pos = originPos[i]
    //         pos[i] = {
    //             x: pos.x + ranInt(5),
    //             y: pos.y + ranInt(5)
    //         }
    //     }
    // }

    // const getCirclePoint = (radius: number,time: number) => {
    //     const theta = Math.PI * 2 * time

    //     return {
    //         x: (Math.cos(theta) * radius),
    //         y: (Math.sin(theta) * radius)
    //     }
    // }

    // for (let i = 0; i < total; i++) {
    //     let pos: any = getCirclePoint(radius, gap * i)
    //     originPos[i] = pos
    //     pos[i] = pos
    // }

  return {draw}
}

export default Sun
