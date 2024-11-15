"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons"
import styles from "./Menu.module.css"
import classes from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { actionItemClick, menuItemClick } from "@/Shared/Slice"
import { MENU_ITEMS } from "@/Shared/Constants"

const Menu = () => {
  const dispatch = useDispatch()
  const activeMenuItem = useSelector((state: any) => state.menu?.activeMenuItem)
  const handleMenuClick = (itemName: any) => {
    dispatch(menuItemClick(itemName))
  }

  const handleActioItemClick = (itemName: any) => {
    dispatch(actionItemClick(itemName))
  }

  return (
    <div className={styles.menuContainer}>
      <div
        className={classes(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div
        className={classes(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActioItemClick(MENU_ITEMS.UNDO)}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActioItemClick(MENU_ITEMS.REDO)}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActioItemClick(MENU_ITEMS.DOWNLOAD)}
      >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
    </div>
  )
}

export default Menu
