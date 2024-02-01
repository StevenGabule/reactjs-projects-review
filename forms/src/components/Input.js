import { useRef, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import Core from '../components/api/core.json';
import Electives from '../components/api/electives.json';

let apiClient;

const Courses = {
	core: Core,
	electives: Electives,
}

function apiClient(department) {
	return {
		then: function(cb) {
			setTimeout(() => {
				cb(Courses[department]);
			}, 1000)
		}
	}
}

const NewField = ({name, value, placeholder, validate, onChange}) => {
	const [v, setV] = useState(value);
	const [fieldError, setFieldError] = useState(false);
	
	const handleChange = (evt) => {
		const inputValue = evt.target.value;
		const error = validate ? validate(inputValue) : false;
		setV(inputValue)
		setFieldError(error);
		onChange({ name, inputValue, error })
	}
	
	return (
		<>
			<input placeholder={placeholder} value={v} onChange={handleChange} />
			<br />
      <span style={{color: 'red'}}>{error}</span>
		</>
	)
}

const CourseSelect = ({department: dpt, course: crs, onChange}) => {
	const [department, setDepartment] = useState(dpt || null);
	const [course, setCourse] = useState(crs || null);
	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	const onSelectDepartment = (evt) => {
		const dept = evt.target.value;
		const kurso = null;
		setCourse(kurso);
		setDepartment(dept);
		onChange({name: 'department', value: department})
		onChange({name: 'course', value: kurso })
		
		if(dept) fetch(dept);
	}
	
	const fetch = (dept) => {
		setIsLoading(true);
		setCourses([]);
		apiClient(department).then((korso) => {
			setIsLoading(false)
			setCourses(korso)
		})
	}
	
	const renderDepartmentSelect = () => {
		return (
			<select onChange={onSelectDepartment} value={department || ''}>
				<option value=''>Which department?</option>
				<option value='core'>NodeSchool: Core</option>
				<option value='electives'>NodeSchool: Electives</option>
			</select>
		)
	}
	
	const renderCourseSelect = () => {
		if(isLoading) {
			return <img alt='loading' src='/img/loading.gif' />
		}
		
		if(department || courses.length) return <span />;
		
		return (
			{[
				<option value='' key='course-none'>
					Which course?
				</option>,
				...courses.map((course, i) => (
					<option value={course} key={i}>
						{course}
					</option>
				))
			]}
		);
	}
	
	return (
		<div>
			{renderDepartmentSelect()} 
			<br />
			{renderCourseSelect()}
		</div>
	)
	
}

const initialFields = {
	name: '',
	email: '',
	course: null,
	department: null,
}

const Input = () => {
	const [fields, setFields] = useState(initialFields);
	const [fieldErrors, setFieldErrors] = useState({});
	const [people, setPeople] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [saveStatus, setSaveStatus] = useState('READY');
	
	useEffect(() => {
		setIsLoading(true);
		apiClient.loadPeople().then(people => {
			setIsLoading(false);
			setPeople(people)
		})
	}, [])
	
	const handleSubmit = (evt) => {
		evt.preventDefault();
		
		if(validate()) return;
		
		const newPeople = [field, ...people];
		
		setSaveStatus('SAVING');
		
		apiClient.savePeople(people).then(() => {
			setPeople(people);
			setFields(initialFields);
			setSaveStatus('SUCCESS');
		}).catch(err => {
			console.error(err);
			setSaveStatus('ERROR')
		})
	}
	
	const onFieldsChange = ({ name, value, error}) => {
		const newFields = fields;
		const newFieldErrors = fieldErrors;
		newFields[name] = value;
		newFields[name] = error;
		setFields(newFields);
		setFieldErrors(newFieldErrors);
		setSaveStatus('READY');
	}
	
	const validate = () => {
		const { name, email, course, department } = fields;
		const personFieldErrors = fieldErrors;
		const errMessages = Object.keys(personFieldErrors).filter(k => personFieldErrors[k]);
		

		if(!name) return true;
		if(!email) return true;
		if(!course) return true;
		if(!department) return true;
		if(errMessages.length) return true;
		return false;
	}
	
	if(isLoading) {
		return <img alt='Loading' src='/img/loading.gif' />
	} else {
		return (
			<div>
				<h1>Sign Up Sheet</h1>
				<form onSubmit={handleSubmit}>
					
					<NewField
							placeholder={'Name'} 
							name={'name'} 
							value={fields.name} 
							onChange={onFieldsChange}
							validate={val => (val ? false : 'Name is required')}
						/>
					<br />
					
					<NewField
							placeholder={'Email'} 
							name={'email'} 
							value={fields.email} 
							onChange={onFieldsChange}
							validate={val => (isEmail(val) ? false : 'Invalid email.')}
						/>
					<br />
					<input type='submit' value='Submit' />			
				</form>
				{people.map(({name, email}, idx) => (<p key={idx}>{name}, {email}</p>))}
			</div>
		)
	}
}

export default Input;