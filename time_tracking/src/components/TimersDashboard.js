import { useState, useEffect } from 'react'
import EditableTimerList from './EditableTimerList'
import ToggleableTimerForm from './ToggleableTimerForm'
import {v4 as uuidv4} from 'uuid'

const TimersDashboard = () => {
	const [timers, setTimers] = useState([]);
	
	useEffect(() => {
		loadTimersFromServer();
		setInterval(loadTimersFromServer, 5000)
	}, []);
	
	const loadTimersFromServer = () => {
		window.client.getTimers(
		(serverTimers) => setTimers(serverTimers)
		)
	}
	
	
	const handleCreateFormSubmit = (timer) => {
		createTimer(timer)
	}
	
	const createTimer = (timer) => {
		const t = window.helpers.newTimer(timer);
		setTimers(timers.concat(t));
		window.client.createTimer(t);
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
		window.client.updateTimer(attrs);
	}
	
	const handleTrashClick = (timerId) => {
		deleteTimer(timerId);
	}
	
	const deleteTimer = (timerId) => {
		setTimers(prev => prev.filter((t) => t.id !== timerId));
		window.client.deleteTimer({ id: timerId })
	}
	
	const startTimer = (id) => {
		const start = Date.now();
		
		setTimers(prev => prev.map((timer) => {
			if(timer.id === id) {
				return Object.assign({}, timer, {
					runningSince: start
				})
			} else {
				return timer;
			}
		}));
		
		window.client.startTimer({id, start})
	}
	
	const stopTimer = (id) => {
		const stop = Date.now();
		
		setTimers(prev => prev.map(timer => {
			if(timer.id === id) {
				const lastElapsed = stop - timer.runningSince;
				return Object.assign({}, timer, {
					elapsed: timer.elapsed + lastElapsed,
					runningSince: null
				})
			} else {
				return timer;
			}
		}))
		
		window.client.stopTimer({ id, stop })
		
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