export const removeUser = async (id: number, token: string) => {
    const query = JSON.stringify({
        query: `mutation {
            removeUser (id: ${id})
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
