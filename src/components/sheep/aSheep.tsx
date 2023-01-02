import React from 'react'

const aSheep = (img: any, stageWidth: number) => {

  let totalFrame = 8
  let curFrame = 0

  let imgWidth = 360
  let imgHeight = 300

  let sheepWidth = 180
  let sheepHeight = 150

  let sheepWidthHalf = sheepWidth / 2
  let x = stageWidth + sheepWidth
  let y = 0
  let speed = Math.random() * 2 + 1

  let fps = 24
  let fpsTime = 1000 / fps


  const animate = (ctx: CanvasRenderingContext2D, dots: any) => {
    x -= speed
    const closest = getY(x, dots)
    y = closest.y

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(closest.rotation)
    ctx.drawImage(
        img,
        imgWidth * curFrame,
        0,
        imgWidth,
        imgHeight,
        -sheepWidthHalf,
        -sheepHeight + 20,
        sheepWidth,
        sheepHeight
    )
    ctx.restore()

  }

  const draw = (ctx: CanvasRenderingContext2D, time: number, dots: any) => {
    // const now = 10000
    // if (now > fpsTime) {
        curFrame += 1
        if (curFrame === totalFrame) {
            curFrame = 0
        }
    // }
    animate(ctx, dots)
  }

  const getQuadValue = (p0: number, p1: number, p2: number, t: number) => {
    return (1- t) * (1-t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2
  }

  const getPointOnQuad = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, t: any) => {
    const tx = quadTangent(x1, x2, x3, t)
    const ty = quadTangent(y1, y2, y3, t)
    const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180)
    return {
        x: getQuadValue(x1, x2, x3, t),
        y: getQuadValue(y1, y2, y3, t),
        rotation: rotation,
    }
  }

  const quadTangent = (a: number, b: number, c: number, t: any) => {
    return 2 * (1 - t) * (b - a) + 2 * (c -b) * t
  }

  const getY2 = (x: number, dot: any) => {
    const total = 200

    let pt = getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0)
    let prevX = pt.x
    for(let i = 1; i < total; i++) {
        const t = i / total
        pt = getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t)

        if (x >= prevX && x <= pt.x) {
            return pt
        }
        prevX = pt.x
    }
    return pt
  }

  const getY = (x: number , dots: any) => {
    for (let i = 1; i < dots.length; i++) {
        if (x >= dots[i].x1 && x <= dots[i].x3) {
            return getY2(x, dots[i])
        }
    }
    return {
        y:0,
        rotation:0
    }
  }



  return {draw}
}

export default aSheep
