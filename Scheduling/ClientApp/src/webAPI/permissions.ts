export const getPermissions = async (token: string) => {
    const query = JSON.stringify({
        query: `{
            getAllPermissions {
               id
               name
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
