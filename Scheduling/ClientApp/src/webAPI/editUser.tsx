export const editUser = async (id: number, name: string, surname: string, email: string, position: string, token: string) => {
    const query = JSON.stringify({
        query: `mutation {
            editUser(
                id: ${id}
                name: "${name}"
                surname: "${surname}"
                email: "${email}"
                position: "${position}"
              ) {
                  success
                  message
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
    }).then(data => data.json());
};
