"use client"
import { COLORS, MENU_ITEMS } from "@/Shared/Constants"
import styles from "./Toolbox.module.css"
import classes from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { changeBrushSize, changeColor } from "@/Shared/Slice"
import { ChangeEvent } from "react"
import { RootState } from "@/Shared/Stores/store"
import { IToolboxState } from "@/Shared/Interfaces"

const Toolbox = () => {
  const dispatch = useDispatch()
  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  )
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem as keyof IToolboxState]
  )

  const updateBrushSize = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value)
    dispatch(
      changeBrushSize({
        item: activeMenuItem as keyof IToolboxState,
        size: Number(e.target.value),
      })
    )
    // socket.emit('changeConfig', {color, size: e.target.value })
  }

  const updateColor = (newColor: string) => {
    dispatch(
      changeColor({
        item: activeMenuItem as keyof IToolboxState,
        color: newColor,
      })
    )
    // socket.emit('changeConfig', {color: newColor, size })
  }

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={classes(styles.colorBox, {
                [styles.active]: color === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => updateColor(COLORS.BLACK)}
            />
            <div
              className={classes(styles.colorBox, {
                [styles.active]: color === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => updateColor(COLORS.RED)}
            />
            <div
              className={classes(styles.colorBox, {
                [styles.active]: color === COLORS.GREEN,
              })}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => updateColor(COLORS.GREEN)}
            />
            <div
              className={classes(styles.colorBox, {
                [styles.active]: color === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => updateColor(COLORS.BLUE)}
            />
            <div
              className={classes(styles.colorBox, {
                [styles.active]: color === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => updateColor(COLORS.ORANGE)}
            />
            <div
              className={classes(styles.colorBox, {
                [styles.active]: color === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => updateColor(COLORS.YELLOW)}
            />
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
              value={size}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Toolbox
