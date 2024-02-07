function search(query, cb) {
	return fetch(`http://localhost:3001/api/food?q=${query}`, { accept: 'application/json' })
					.then(checkStatus)
					.then(parseJSON)
					.then(cb)
}