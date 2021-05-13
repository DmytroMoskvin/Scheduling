import * as React from 'react';
import { VacationRequest } from '../../store/VacationRequest/types';
import { LoadingAnimation } from '../Loading';
import '../../style/VacationRequest/RequestItem.css';
import { useState } from 'react';
import { getRequestInfo } from '../../webAPI/vacationRequest';

type RequestInfo = {
    requests: Array<{
        id: number,
        startDate: Date,
        finishDate: Date,
        name: string,
        status: string,
        comment: string,
    }>,
    comment: string
}

type ItemProps = {
    request: VacationRequest,
    removeRequest: Function,
    token: string,
}

export const RequestItem: React.FunctionComponent<ItemProps> = ({ token, request, removeRequest }) => {
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [requestInfo, setInfo] = useState({
        comment: '',
        responses: Array<{
            response: boolean,
            responderName: string,
            comment: string
        }>(),
    });

    const getFullInfo = async () => {
        setLoading(true);
        setOpen(true);
        let info = await getRequestInfo(token, request.id);
        if(info.data.getVacationRequestInfo !== undefined){
            setInfo({comment: request.comment, responses: info.data.getVacationRequestInfo});
        }
        setLoading(false);
    }

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

    let infoDiv = (
        <div>
            <div className='info-data-container'>
                <h5>My comment:</h5>
                <p>{requestInfo.comment}</p>
            </div>
            <div className='info-data-container' hidden={requestInfo.responses.length === 0}>
                <h5>Responses:</h5>
                <div className='info-responses-container'>
                    {requestInfo.responses.map(r =>
                        <p>{r.response? 'Approved ' : 'Declined '} by {r.responderName}. {r.comment}</p>
                    )}
                </div>
            </div>
            <button type='button' hidden={requestInfo.responses.length > 0} className='remove-request-button' onClick={() => removeRequest(request.id)}>Remove request</button>
        </div>
	);

    if(isLoading){
        infoDiv = (<LoadingAnimation/>);
    }

    return (
        <React.Fragment>
            <div className={`request-item ${isOpen? 'opened' : ''}`}>
                <div className='requets-brief-info' onClick={() => isOpen? setOpen(false): getFullInfo()}>
                    <p>{convertDate(request.startDate)}-{convertDate(request.finishDate)}</p>
                    <p>{request.comment}</p>
                    <p>{request.status}</p>
                    <button type='button' className='show-full-info-button' onClick={() => isOpen? setOpen(false): getFullInfo()}>ᐯ</button>
                </div>
                <div className='request-full-info'>
                    {infoDiv}
                </div>
            </div>
        </React.Fragment>
    );
}