const TimerActionButton = ({ timerIsRunning, onStartClick, onStopClick }) => {
	if(timerIsRunning) {
		return (
			<div 
				onClick={onStopClick}
				className='ui bottom attached red basic button'>
				Stop
			</div>
		)
	} else {
			return (
				<div 
					onClick={onStartClick}
					className='ui bottom attached green basic button'>
				Start
			</div>
			)
	}
}

export default TimerActionButton;