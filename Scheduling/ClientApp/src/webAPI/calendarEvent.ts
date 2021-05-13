export const getUserEvents = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUserEvents{
					
						id
						workDate
						startWorkTime
						endWorkTime
					}
				
			
		}`
	});

	return fetch('/graphql', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: query
	})
		.then(data => data.json());
};

export const addEvent = async (workDate: Date, startWorkTime: Date, endWorkTime: Date, token: string) => {
	const query = JSON.stringify({
		query: `mutation {
			addCalendarEvent (
				workDate: "${workDate}"
				startWorkTime: "${startWorkTime}"
				endWorkTime: "${endWorkTime}")
		}`
	});

	return fetch('/graphql', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: query
	})
		.then(data => data.json());
};

export const removeEvent = async (token: string, id: number) => {
	const query = JSON.stringify({
		query: `mutation{
		  removeEvent(id: ${id}){
				id
				workDate
				startWorkTime
				endWorkTime
			}
		}`
	});

	return fetch('/graphql', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: query
	}).then(data => data.json());
};