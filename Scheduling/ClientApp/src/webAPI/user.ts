
export const getUserData = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUser{
				name
				surname
				email
				position
				department
				computedProps {
					permissions
					timerHistories
						  {
							id
							startTime
							finishTime
						  }
				}
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

export const getUsersOnVacationWithinTeamByDate = async (token: string, date: Date) => {
	const query = JSON.stringify({
		query: `query{
				getUsersOnVacation(date: "${date.toISOString()}"){
					name
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
