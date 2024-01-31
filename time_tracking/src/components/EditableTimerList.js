import EditableTimer from './EditableTimer';

const EditableTimerList = ({ 
	timers, 
	onFormSubmit, 
	onStartClick, 
	onStopClick, 
	onTrashClick 
}) => {
	return (
		<div id='timers'>
			{timers.map((timer) => (
				<EditableTimer 
					key={timer.id}
					{...timer}
					onFormSubmit={onFormSubmit}
					onTrashClick={onTrashClick}
					onStartClick={onStartClick}
					onStopClick={onStopClick}
				/>
			))}
		</div>
		
	) 
}

export default EditableTimerList;