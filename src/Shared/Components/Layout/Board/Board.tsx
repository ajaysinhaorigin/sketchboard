"use client"
import { MENU_ITEMS } from "@/Shared/Constants"
import { actionItemClick } from "@/Shared/Slice"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

const Board = () => {
  const dispatch = useDispatch()
  const canvasRef: any = useRef(null)
  const drawHistory: any = useRef([])
  const historyPointer: any = useRef(0)
  const shouldDraw = useRef(false)
  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: any) => state.menu
  )
  const { color, size } = useSelector(
    (state: any) => state.toolbox[activeMenuItem]
  )

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    const changeConfig = () => {
      context.strokeStyle = color
      context.lineWidth = size
    }

    changeConfig()
  }, [color, size])

  // when browser paint
  useLayoutEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const beginPath = (x: any, y: any) => {
      context.beginPath()
      context.moveTo(x, y)
    }
    const drawline = (x: any, y: any) => {
      context.lineTo(x, y)
      context.stroke()
    }

    const handleMouseDown = (e: any) => {
      shouldDraw.current = true
      beginPath(e.clientX, e.clientY)
    }
    const handleMouseMove = (e: any) => {
      if (!shouldDraw.current) return
      drawline(e.clientX, e.clientY)
    }
    const handleMouseUp = () => {
      shouldDraw.current = false
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  //   useEffect(() => {
  //     if (!canvasRef.current) return
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d')

  //     if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
  //         const URL = canvas.toDataURL()
  //         const anchor = document.createElement('a')
  //         anchor.href = URL
  //         anchor.download = 'sketch.jpg'
  //         anchor.click()
  //     } else  if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
  //         if(historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
  //         if(historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
  //         const imageData = drawHistory.current[historyPointer.current] as ImageData
  //         context.putImageData(imageData, 0, 0)
  //     }
  //     dispatch(actionItemClick(null))
  // }, [actionMenuItem, dispatch])

  // useEffect(() => {
  //     if (!canvasRef.current) return
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d')

  //     const changeConfig = (color:string, size:number) => {
  //         context.strokeStyle = color
  //         context.lineWidth = size
  //     }

  //     const handleChangeConfig = (config:any) => {
  //         console.log("config", config)
  //         changeConfig(config.color, config.size)
  //     }
  //     changeConfig(color, size)
  //     // socket.on('changeConfig', handleChangeConfig)

  //     return () => {
  //         // socket.off('changeConfig', handleChangeConfig)
  //     }
  // }, [color, size])

  // before browser pain
  // useLayoutEffect(() => {
  //     if (!canvasRef.current) return
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d')

  //     canvas.width = window.innerWidth
  //     canvas.height = window.innerHeight

  //     const beginPath = (x:any, y:any) => {
  //         context.beginPath()
  //         context.moveTo(x, y)
  //     }

  //     const drawLine = (x:any, y:any) => {
  //         context.lineTo(x, y)
  //         context.stroke()
  //     }
  //     const handleMouseDown = (e:any) => {
  //         shouldDraw.current = true
  //         beginPath(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
  //         // socket.emit('beginPath', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
  //     }

  //     const handleMouseMove = (e:any) => {
  //         if (!shouldDraw.current) return
  //         drawLine(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
  //         // socket.emit('drawLine', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
  //     }

  //     const handleMouseUp = (e:any) => {
  //         shouldDraw.current = false
  //         const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  //         // drawHistory.current.push(imageData)
  //         historyPointer.current = drawHistory.current.length - 1
  //     }

  //     const handleBeginPath = (path:any) => {
  //         beginPath(path.x, path.y)
  //     }

  //     const handleDrawLine = (path:any) => {
  //         drawLine(path.x, path.y)
  //     }

  //     canvas.addEventListener('mousedown', handleMouseDown)
  //     canvas.addEventListener('mousemove', handleMouseMove)
  //     canvas.addEventListener('mouseup', handleMouseUp)

  //     canvas.addEventListener('touchstart', handleMouseDown)
  //     canvas.addEventListener('touchmove', handleMouseMove)
  //     canvas.addEventListener('touchend', handleMouseUp)

  //     // socket.on('beginPath', handleBeginPath)
  //     // socket.on('drawLine', handleDrawLine)

  //     return () => {
  //         canvas.removeEventListener('mousedown', handleMouseDown)
  //         canvas.removeEventListener('mousemove', handleMouseMove)
  //         canvas.removeEventListener('mouseup', handleMouseUp)

  //         canvas.removeEventListener('touchstart', handleMouseDown)
  //         canvas.removeEventListener('touchmove', handleMouseMove)
  //         canvas.removeEventListener('touchend', handleMouseUp)

  //         // socket.off('beginPath', handleBeginPath)
  //         // socket.off('drawLine', handleDrawLine)
  //     }
  // }, [])

  return <canvas ref={canvasRef}></canvas>
}

export default Board
