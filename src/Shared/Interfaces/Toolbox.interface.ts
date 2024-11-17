import { MENU_ITEMS } from "../Constants"

export interface IToolboxState {
  [MENU_ITEMS.PENCIL]: {
    color: string
    size: number
  }
  [MENU_ITEMS.ERASER]: {
    color: string
    size: number
  }
  [MENU_ITEMS.UNDO]: Record<string, never>
  [MENU_ITEMS.REDO]: Record<string, never>
  [MENU_ITEMS.DOWNLOAD]: Record<string, never>
}
