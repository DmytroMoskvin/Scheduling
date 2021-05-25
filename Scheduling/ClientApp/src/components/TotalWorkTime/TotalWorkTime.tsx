import Cookies from "js-cookie";
import * as React from "react";
import { useState } from "react";
import { getAllWorkHoursOfMonth } from "../../Utils/utils";
import { getUserData } from "../../webAPI/user";

export const TotalWorkTime: React.FunctionComponent<{}> = () => {

	const [totalWorkTime, setTotalWorkTime] =  useState(0);

	async function getTotalWorkTime() {
		const token = Cookies.get('token') || '';
		const data =  await getUserData(token);
		
		if(data.data === null){
			return;
		}

		setTotalWorkTime(data.data.getCurrentUser.computedProps.totalWorkTime)
		
	}
	getTotalWorkTime();

	return ( 
		<div className='total-work-time'>
			Total work time: <br />
			{totalWorkTime || 0}h / {getAllWorkHoursOfMonth()}h
		</div>
	);
}
