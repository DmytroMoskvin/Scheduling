
export const getUserRequests = async (token: string) => {
	const query = JSON.stringify({
		query: `{
			getCurrentUserRequests{
                id
                userId
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

export const addUserRequest = async (token: string, request: {startDate: Date, finishDate: Date, comment: string}) => {
	const validateDate = (date: number) => {
		return date < 10? '0' + date : date;
	}

	const convertDate = (date: Date) => {
        let dateObj = new Date(date);
		let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        return (year + "-" + validateDate(month) + "-" + validateDate(day));
    }

	const query = JSON.stringify({
		query: `mutation{
			addVacationRequest(startDate: "${convertDate(request.startDate)}" finishDate: "${convertDate(request.finishDate)}" comment: "${request.comment}"){
                id
                userId
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

export const removeUserRequest = async (token: string, id: number) => {
	const query = JSON.stringify({
		query: `mutation{
			removeVacationRequest(id: ${id})
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