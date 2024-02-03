const initiateState = {
	people: [],
	isLoading: false,
	saveStatus: 'READY',
	person: {
		name: '',
		email: '',
		course: null,
		department: null,
	}
}

export function reducer(state = initiateState, action) {
	switch(action.type) {
		case FETCH_PEOPLE_REQUEST:
			return Object.assign({}, state, {
				isLoading: true
			})
		case FETCH_PEOPLE_SUCCESS:
			return Object.assign({}, state, {
				people: action.people,
				isLoading: false
			})
		case SAVE_PEOPLE_REQUEST:
			return Object.assign({}, state, {
				people: action.people,
				person: {
					name: '',
					email: '',
					course: null,
					department: null,
				},
				saveStatus: 'SUCCESS'
			});
		default:
			return state;
	}
}