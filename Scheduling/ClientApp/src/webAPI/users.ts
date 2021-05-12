export const getUsersData = async (token: string) => {
  const query = JSON.stringify({
    query: `{
      getUsers{
        name
        surname
        email
        position
        department
        userPermissions {
          permission {
            permissionName
          }
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