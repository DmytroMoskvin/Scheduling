export const removeUser = async (email: string, token: string) => {
    const query = JSON.stringify({
        query: `mutation {
            removeUser (email: "${email}")
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
