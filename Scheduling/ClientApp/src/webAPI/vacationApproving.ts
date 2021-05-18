export const getAllRequests = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getRequestsForConsideration{
				id
				userId
				userName
				startDate
				finishDate
				comment
				status
			  }
			  getConsideredRequests{
				id
				userId
				userName
				startDate
				finishDate
				comment
				status
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

export const considerVacationRequest = async (token: string, id: number, reaction: Boolean, comment: string) => {

	const query = JSON.stringify({
		query: `mutation {
			considerVacationRequest(id: ${id} approved: ${reaction} comment: "${comment}"){
                id
                userId
				userName
                startDate
                finishDate
                status
                comment
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

// export const removeUserRequest = async (token: string, id: number) => {
// 	const query = JSON.stringify({
// 		query: `mutation{
// 			removeVacationRequest(id: ${id})
// 		}`
// 	});
  
// 	return fetch('/graphql', {
// 		method: 'POST',
// 		headers: {
// 			'content-type': 'application/json',
// 			'Authorization': `Bearer ${token}`
// 		},
// 		body: query
// 	})
// 	.then(data => data.json());
// };