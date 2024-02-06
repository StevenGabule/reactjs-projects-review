export const FETCH_PEOPLE_REQUEST = 'FETCH_PEOPLE_REQUEST';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';

function fetchPeopleRequest() {
	return { type: FETCH_PEOPLE_REQUEST };
}

function fetchPeopleSuccess(people) {
	return { type: FETCH_PEOPLE_SUCCESS, people };
}

export function fetchPeople() {
	return function(dispatch) {
		dispatch(fetchPeopleRequest());
		apiClient.loadPeople().then((people) => {
			dispatch(fetchPeopleSuccess(people));
		})
	}
}

export const SAVE_PEOPLE_REQUEST = 'SAVE_PEOPLE_REQUEST';
export const SAVE_PEOPLE_FAILURE = 'SAVE_PEOPLE_FAILURE';
export const SAVE_PEOPLE_SUCCESS = 'SAVE_PEOPLE_SUCCESS';

function savePeopleRequest() {
	return { type: SAVE_PEOPLE_REQUEST }
}

function savePeopleFailure(error) {
	return { type: SAVE_PEOPLE_FAILURE, error }
} 

function savePeopleSuccess(people) {
	return { type: SAVE_PEOPLE_SUCCESS, people }
} 

export function savePeople(people) {
	return function(dispatch) {
		dispatch(savePeopleRequest())
		apiClient.savePeople()
							.then((resp) => { dispatch(savePeopleSuccess(people)) })
							.catch((error) => { dispatch(savePeopleFailed(error)) })
	}
}

const apiClient = {
	loadPeople: function() {
		return {
			then: function(cb) {
				setTimeout(() => {
					cb(JSON.parse(localStorage.people || '[]'))
				}, 1000)
			}
		}
	},
	savePeople: function(people) {
		const success = !!(this.count++ % 2);
		return new Promise(function(resolve, reject) {
			setTimeout(() => {
				if(!success) return reject({ success });
				localStorage.people = JSON.stringify(people);
				resolve({success})
			}, 1000)
		})
	},
	count: 1
}


export function fetchPeople() {
	return function(dispatch) {
		dispatch(fetchPeopleSuccess());
		apiClient.loadPeople().then((people) => {
			dispatch(fetchPeopleSuccess(people));
		})
	}
}

export function savePeoepl(people) {
	return function(dispatch) {
		dispatch(savePeopleRequest());
		apiClient.savePeople(people)
			.then((resp) => { dispatch(savePeopleSuccess(people)) })
			.catch((err) => { dispatch(savePeopleFailure(err)) })
	}
}






