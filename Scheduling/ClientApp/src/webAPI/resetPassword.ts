export const resetPassword = async ( password: string, token: string ) => {
	const query = JSON.stringify({
		query: `mutation {
			resetPassword (password: "${password}")
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

export const checkAccessToResetPassword = async ( token: string ) => {
	const query = JSON.stringify({
		query: `mutation {
			checkAccessToResetPasswordPage
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