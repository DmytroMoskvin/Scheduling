
export const getUserData = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUser {
				name
				surname
				email
				position
				department
				userPermissions {
				  permission {
					permissionName
				  }
				  permissionId
				  userId
				}
				team {
				  name
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