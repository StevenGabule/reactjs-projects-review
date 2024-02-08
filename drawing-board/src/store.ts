import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit"
import { currentStroke } from './modules/currentStrokeSlice'
import { historyIndex } from './modules/historyIndexSlice'
import { strokes } from './modules/strokesSlice'
import logger from "redux-logger"
import { RootState } from "./utils/types"

const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
	reducer: { historyIndex, strokes, currentStroke },
	middleware
})