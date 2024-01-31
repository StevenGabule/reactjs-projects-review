import { useEffect, useState } from 'react';
import TimerActionButton from './TimerActionButton'
const Timer = ({ 
		title, 
		elapsed, 
		project, 
		onEditClick, 
		id, 
		runningSince, 
		onStartClick, 
		onTrashClick, 
		onStopClick 
	}) => {
	
	const [forceUpdateInterval, setForceUpdateInterval] 
	= useState(null);
	
	useEffect(() => {
		const intervalId = setInterval(() => {
			setForceUpdateInterval(prev => !prev);
		}, 50);
		
		return () => {
			clearInterval(intervalId);
		}
	}, [])
	
	const elapsedStr = window.helpers.renderElapsedString(elapsed, runningSince);
	
	const handleTrashClick = () => {
		onTrashClick(id);
	}
	
	const handleStartClick = () => {
		onStartClick(id)
	}
	
	const handleStopClick = () => {
		onStopClick(id);
	}
	
	return (
		<div className='ui centered card'>
			<div className='content'>
				<div className='header'>
					{title}
				</div>
				<div className='meta'>
					{project}
				</div>
				<div className='center aligned description'>
					<h2>{elapsedStr}</h2>
				</div>
				<div className='extra content'>
					<span 
						className='right floated edit icon'
						onClick={onEditClick}
						>
						<i className='edit icon' />
					</span>
					<span 
						onClick={handleTrashClick}
						className='right floated trash icon'>
						<i className='trash icon' />
					</span>
				</div>
			</div>
			<TimerActionButton 
				timerIsRunning={!!runningSince}
				onStartClick={handleStartClick}
				onStopClick={handleStopClick}
			/>
		</div>
	)
}
export default Timer;