// store/store.ts
import { configureStore } from "@reduxjs/toolkit"
import { MenuReducer, ToolboxReducer } from "../Slice"

const store = configureStore({
  reducer: {
    toolbox: ToolboxReducer,
    menu: MenuReducer,
  },
})

export default store
