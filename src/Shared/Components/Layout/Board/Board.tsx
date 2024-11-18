"use client"
import { COLORS, MENU_ITEMS } from "@/Shared/Constants"
import { IToolboxState } from "@/Shared/Interfaces"
import { actionItemClick } from "@/Shared/Slice"
import { RootState } from "@/Shared/Stores/store"
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

const Board = () => {
  const dispatch = useDispatch()
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null)
  const drawHistory: MutableRefObject<ImageData[]> = useRef([])
  const historyPointer = useRef(0)

  const shouldDraw = useRef(false)
  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: RootState) => state.menu
  )
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem as keyof IToolboxState]
  )

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext("2d") as CanvasRenderingContext2D

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempContext = tempCanvas.getContext("2d")

      if (tempContext) {
        // Fill the background with the desired color
        tempContext.fillStyle = COLORS.WHITE
        tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

        // Draw the existing canvas content over the background
        tempContext.drawImage(canvas, 0, 0)

        // Generate the data URL from the temporary canvas
        const URL = tempCanvas.toDataURL("image/jpeg")
        const anchor = document.createElement("a")
        anchor.href = URL
        anchor.download = "sketch.jpg"
        anchor.click()
      }
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1

      const imageData = drawHistory.current[historyPointer.current]
      if (!imageData || Boolean(!drawHistory.current)) return
      context.putImageData(imageData, 0, 0)
    }
    dispatch(actionItemClick(null))
  }, [actionMenuItem, dispatch])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext("2d") as CanvasRenderingContext2D

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
    const context = canvas.getContext("2d") as CanvasRenderingContext2D

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const beginPath = (x: number, y: number) => {
      context.beginPath()
      context.moveTo(x, y)
    }
    const drawline = (x: number, y: number) => {
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
      const imageData: ImageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      )
      drawHistory.current.push(imageData)
      historyPointer.current = drawHistory.current.length - 1
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)

    canvas.addEventListener("touchstart", handleMouseDown)
    canvas.addEventListener("touchmove", handleMouseMove)
    canvas.addEventListener("touchend", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)

      canvas.removeEventListener("touchstart", handleMouseDown)
      canvas.removeEventListener("touchmove", handleMouseMove)
      canvas.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  return <canvas ref={canvasRef}></canvas>
}

export default Board
