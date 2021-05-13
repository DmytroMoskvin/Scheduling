export const authenticate = async (login: string, password: string) => {
	const query = JSON.stringify({
		query: `mutation {
			authentication (email: "${login}" password: "${password}")
		}`
	});

 return fetch('/graphql', {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: query
	})
	.then(data => data.json());
};