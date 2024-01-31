import { useState } from 'react';

const TimerForm = ({ id, title = '', project = '', onFormSubmit, onFormClose }) => {
	const [name, setName] = useState(title);
	const [proj, setProj] = useState(project);
	const submitText = id ? 'Update' : 'Create';
	
	const handleSubmit = () => {
		onFormSubmit({ id, title: name, project: proj })
	}
	
	return (
		<div className='ui centered card'>
			<div className='content'>
				<div className='ui form'>
					<div className='field'>
						<label>Title</label>
						<input 
							type='text' 
							value={name} 
							onChange={(e) => setName(e.target.value)} />
					</div>
					
					<div className='field'>
						<label>Project</label>
						<input 
							type='text' 
							onChange={(e) => setProj(e.target.value)} value={proj} />
					</div>
					
					<div className='ui two bottom attached buttons'>
						<button 
							className='ui basic blue button'
							onClick={handleSubmit}
							>
							{submitText}
						</button>
						<button 
							className='ui basic red button'
							onClick={onFormClose}
							>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TimerForm;