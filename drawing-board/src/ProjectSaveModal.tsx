import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCanvas } from './CanvasContext'
import { getCanvasImage } from './utils/canvasUtils'
import { getBase64Thumbnail } from './utils/scalar'
import { saveProject } from './modules/strokes/saveProject'
import { hide } from './modules/modals/slice'

export const ProjectSaveModal = () => {
	const [projectName, setProjectName] = useState("")
	const dispatch =useDispatch()
	const canvasRef = useCanvas()

	const onProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setProjectName(e.target.value)
	}

	const onProjectSave = async() => {
		const file = await getCanvasImage(canvasRef.current)
		if (!file) {
			return;
		}
		const thumbnail = await getBase64Thumbnail({file, scale: 0.1})
		dispatch(saveProject(projectName, thumbnail))
		setProjectName("")
		dispatch(hide())
	}

	return (
		<div className="window modal-panel">
			<div className="title-bar">
				<div className="title-bar-text">Save</div>
			</div>
			<div className="window-body">
				<div className="field-row-stacked">
					<label htmlFor="projectName">Project Name</label>
					<input type="text" id='projectName' onChange={onProjectNameChange} />
				</div>
				<div className="field-row">
					<button onClick={onProjectSave}>Save</button>
					<button onClick={() => dispatch(hide())}>Cancel</button>
				</div>
			</div>
		</div>
	)
}