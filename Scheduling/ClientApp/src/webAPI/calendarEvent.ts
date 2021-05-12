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