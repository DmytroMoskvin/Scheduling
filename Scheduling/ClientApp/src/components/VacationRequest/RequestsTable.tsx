import * as React from 'react';
import { VacationRequest } from '../../store/VacationRequest/types';
import { LoadingAnimation } from '../Loading';
import '../../style/VacationRequest/RequestsTable.css';

type TableProps = {
    requests: Array<VacationRequest>
    removeRequest: Function
    loading: Boolean
}

export const RequestsTable: React.FunctionComponent<TableProps> = ({ loading, requests, removeRequest }) => {

    const validateDate = (date: number) => {
		return date < 10? '0' + date : date;
	}

	const convertDate = (date: Date) => {
        let dateObj = new Date(date);
		let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        return (validateDate(day) + "/" + validateDate(month) + "/" + year);
    }

    return (
        <React.Fragment>
            <div id='vacation-history'>
                <h5 className={loading? 'blured': ''}>Vacation history</h5>
                <table id='history' className={loading? 'blured': ''}>
                    <tbody>
                        <tr>
                            <th>Range</th>
                            <th>Status</th>
                            <th>Comment</th>
                            <th></th>
                        </tr>
                        {requests.map((r) => <tr key={requests.indexOf(r)}>
                            <td>{convertDate(r.startDate)}-{convertDate(r.finishDate)}</td>
                            <td>{r.status}</td>
                            <td>{r.comment}</td>
                            <td className='table-button-delete'><button onClick={() => removeRequest(r.id)}>Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
                {loading? <div className='overflow-loading'><LoadingAnimation/></div>: null}
            </div>
        </React.Fragment>
    );
}