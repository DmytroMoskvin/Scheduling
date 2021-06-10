export const getUsersData = async (token: string) => {
  const query = JSON.stringify({
    query: `{
      getUsers {
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
          team {
            name
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