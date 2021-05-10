export const restorePassword = async (login: string) => {
	const query = JSON.stringify({
		query: `mutation {
			sendResetPasswordLink (email: "${login}")
		}`
	});

 return fetch('/graphql', {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: query
	})
	.then(data => data.json());
};