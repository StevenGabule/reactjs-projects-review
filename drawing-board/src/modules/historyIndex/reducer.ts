import { createReducer } from "@reduxjs/toolkit"
import { redo, undo } from './slice'
import { endStroke } from '../sharedActions'
import { RootState } from '../../types';

const initialState: RootState["historyIndex"] = 0
export const reducer = createReducer(initialState, (builder) => {
	builder.addCase(undo, (state, action) => {
		return Math.min(state + 1, action.payload)
	})
	builder.addCase(redo, (state, action) => {
		return Math.max(state - 1, 0)
	})
	builder.addCase(endStroke, (state, action) => {
		return 0
	})
})