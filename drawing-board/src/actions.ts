import { Point } from './types'

// ! when the user presses the mouse button. It will contain the coordinates in the payload.
export const BEGIN_STROKE = 'BEGIN_STROKE';

// ! dispatched when the user moves the pressed mouse
export const UPDATE_STROKE = 'UPDATE_STROKE';

// ! dispatch this action when the user releases the mouse.
export const END_STROKE = 'END_STROKE';

export const SET_STROKE_COLOR = 'SET_STROKE_COLOR'

export const setStrokeColor = (color: string) => {
	return {type: SET_STROKE_COLOR, payload: color}
}

export type Action =
	| {
		type: typeof BEGIN_STROKE
		payload: Point
	} | {
		type: typeof UPDATE_STROKE
		payload: Point
	} | {
		type: typeof END_STROKE
	} | {
		type: typeof SET_STROKE_COLOR
	}

export const beginStroke = (x: number, y: number) => {
	return { type: BEGIN_STROKE, payload: { x, y } }
}

export const updateStroke = (x: number, y: number) => {
	return { type: UPDATE_STROKE, payload: { x, y } }
}

export const endStroke = () => {
	return { type: END_STROKE }
}
