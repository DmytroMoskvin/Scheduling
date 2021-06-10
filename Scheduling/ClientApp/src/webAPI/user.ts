export const getUserData = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUser {
				id
				name
				surname
				email
				position
				department
				computedProps {
				  userPermissions {
					permission {
					  name
					}
					permissionId
					userId
				  }
				  userTeam {
					team {
					  name
					}
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