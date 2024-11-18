import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { COLORS, MENU_ITEMS } from "../Constants"
import { IToolboxState } from "../Interfaces"

const initialState: IToolboxState = {
  [MENU_ITEMS.PENCIL]: {
    color: COLORS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER]: {
    color: COLORS.WHITE,
    size: 3,
  },
  [MENU_ITEMS.UNDO]: {},
  [MENU_ITEMS.REDO]: {},
  [MENU_ITEMS.DOWNLOAD]: {},
  [MENU_ITEMS.CLEAR]: {},
}

export const toolboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (
      state: IToolboxState,
      action: PayloadAction<{ item: keyof IToolboxState; color: string }>
    ) => {
      state[action.payload.item].color = action.payload.color
    },
    changeBrushSize: (
      state: IToolboxState,
      action: PayloadAction<{ item: keyof IToolboxState; size: number }>
    ) => {
      state[action.payload.item].size = action.payload.size
    },
  },
})

export const { changeColor, changeBrushSize } = toolboxSlice.actions

export default toolboxSlice.reducer
