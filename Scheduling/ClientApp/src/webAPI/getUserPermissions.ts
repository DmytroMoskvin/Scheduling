export const getUserPermissions = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUser{
				computedProps {
					permissions
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