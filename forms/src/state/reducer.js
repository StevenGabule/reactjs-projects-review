const initiateState = {
	people: [],
	isLoading: false,
	saveStatus: 'READY',
	person: {
		name: '',
		email: '',
		course: null,
		department: null
	}
}

export function reducer(state = initiateState, action) {
	switch(action.type) {
		case FETCH_PEOPLE_REQUEST:
			return Object.assign({}, state, { isLoading: true })
			
		case FETCH_PEOPLE_SUCCESS:
			return Object.assign({}, state, { isLoading: false, people: action.people })
			
		case SAVE_PEOPLE_REQUEST:
			return Object.assign({}, state, { saveStatus: 'SAVING' })
			
		case SAVE_PEOPLE_FAILURE:
			return Object.assign({}, state, { saveStatus: 'ERROR' })
			
		case SAVE_PEOPLE_SUCCESS:
			return Object.assign({}, state, { 
				saveStatus: 'SUCCESS',
				people: action.people,
				person: { name: '', email: '', course: null, department: null }
			})
		default:
			return false;
	}
}