const Button = ({ onGreatClick }) => {
	return (
		<div>
			<h1>What do you think of React?</h1>
			<button name='button-1' value='great' onClick={onGreatClick}>
				Great
			</button>
			<button name='button-2' value='amazing' onClick={onAmazingClick}>
				Amazing
			</button>
		</div>
	)
}

export default Button;