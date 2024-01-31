import { useState } from 'react'
import EditableTimerList from './EditableTimerList'
import ToggleableTimerForm from './ToggleableTimerForm'
import {v4 as uuidv4} from 'uuid'

const DATA = [
	{
		title: 'Practice Squat',
		project: 'Gym Chores',
		id: uuidv4(),
		elapsed: 5456099,
		runningSince: Date.now(),
	},
	{
		title: 'Bake squash',
		project: 'Kitchen Chores',
		id: uuidv4(),
		elapsed: 1273998,
		runningSince: null,
	}
];

const TimersDashboard = () => {
	const [timers, setTimers] = useState(DATA);
	
	const handleCreateFormSubmit = (timer) => {
		createTimer(timer)
	}
	
	const createTimer = (timer) => {
		const t = window.helpers.newTimer(timer);
		setTimers(timers.concat(t));
	}
	
	const handleEditFormSubmit = (attrs) => {
		updateTimer(attrs);
	}
	
	const updateTimer = (attrs) => {
		setTimers(prev => prev.map((timer) => {
			if(timer.id === attrs.id) {
				return Object.assign({}, timer, {
					title: attrs.title,
					project: attrs.project,
				})
			} else {
				return timer;
			}
		}))
	}
	
	const handleTrashClick = (timerId) => {
		deleteTimer(timerId);
	}
	
	const deleteTimer = (timerId) => {
		setTimers(prev => prev.filter((t) => t.id !== timerId));
	}
	
	const startTimer = (timerId) => {
		const now = Date.now();
		setTimers(prev => prev.map((timer) => {
			if(timer.id === timerId) {
				return Object.assign({}, timer, {
					runningSince: now
				})
			} else {
				return timer;
			}
		}))
	}
	
	const stopTimer = (timerId) => {
		const now = Date.now();
		
		setTimers(prev => prev.map(timer => {
			if(timer.id === timerId) {
				const lastElapsed = now - timer.runningSince;
				return Object.assign({}, timer, {
					elapsed: timer.elapsed + lastElapsed,
					runningSince: null
				})
			} else {
				return timer;
			}
		}))
	}
	
	const handleStartClick = (timerId) => {
		startTimer(timerId);
	}
	
	const handleStopClick = (timerId) => {
		stopTimer(timerId);
	}
	
	return (
		<div className='ui three column centered grid'>
			<div className='column'>
				<EditableTimerList 
					timers={timers} 
					onFormSubmit={handleEditFormSubmit}
					onTrashClick={handleTrashClick}
					onStartClick={handleStartClick}
					onStopClick={handleStopClick}
					/>
				<ToggleableTimerForm 
					onFormSubmit={handleCreateFormSubmit} 
					/>
			</div>
		</div>
	)
}

export default TimersDashboard;