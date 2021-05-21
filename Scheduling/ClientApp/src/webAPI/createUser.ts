export const createUser = async (name: string, surname: string, email: string, position: string,
    department: string, permissions: string[], teamId: number, token: string) => {
    const query = JSON.stringify({
        query: `mutation {
            createUser(
              name: "${name}",
              surname: "${surname}",
              email: "${email}",
              position: "${position}",
              department: "${department}",
              permissions: [${permissions}],
              team: ${teamId}
            )
          }`
    });

    return fetch('/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: query
    }).then(data => data.json());
};
