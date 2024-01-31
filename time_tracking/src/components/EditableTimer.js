import TimerForm from './TimerForm';
import Timer from './Timer';
import { useState } from 'react'

const EditableTimer = ({
		id, 
		elapsed, 
		runningSince, 
		project, 
		title,
		onFormSubmit,
		onStartClick,
		onStopClick,
		onTrashClick
	}) => {
		console.log('runningSince', runningSince)
		const [editFormOpen, setEditFormOpen] = useState(false);
		
		const closeForm = () => {
			setEditFormOpen(false);
		}
		
		const openForm = () => {
			setEditFormOpen(true);
		}
		
		const handleEditClick = () => {
			openForm();
		}
		
		const handleFormClose = () => {
			closeForm();
		}
		
		const handleSubmit = (timer) => {
			onFormSubmit(timer);
			closeForm();
		}
	
	if(editFormOpen) {
		return (
			<TimerForm 
				id={id} 
				title={title} 
				project={project} 
				onFormSubmit={handleSubmit}
				onFormClose={handleFormClose}
				/>
		);
	} else {	
		return (
			<Timer
				id={id}
				title={title}
				project={project}
				elapsed={elapsed}
				runningSince={runningSince}
				onEditClick={handleEditClick}
				onTrashClick={onTrashClick}
				onStartClick={onStartClick}
				onStopClick={onStopClick}
			/>
			
		)
	}
}

export default EditableTimer;