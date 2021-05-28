import { UserDataSend } from "../store/UserManagement/types";

export const editUser = async (user: UserDataSend, token: string) => {
    const query = JSON.stringify({
        query: `mutation {
            editUser(
                id: ${user!.id}
                name: "${user!.name}"
                surname: "${user!.surname}"
                email: "${user!.email}"
                position: "${user!.position}"
                department: "${user!.department}"
                permissions: [${user!.permissionIds}]
                team: ${user!.teamId}
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
