import { createAction } from '@reduxjs/toolkit'
import { Stroke } from "../../types"
export const END_STROKE = "END_STROKE"

export const endStroke = createAction<{
	stroke: Stroke
	historyIndex: number
	}>("endStroke")