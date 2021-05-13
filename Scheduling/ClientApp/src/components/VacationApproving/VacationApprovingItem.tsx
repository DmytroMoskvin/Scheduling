import * as React from 'react';
import { VacationRequest } from '../../store/VacationRequest/types';
import { LoadingAnimation } from '../Loading';
import '../../style/VacationRequest/RequestItem.css';
import { useState } from 'react';
import { getRequestInfo } from '../../webAPI/vacationRequest';

type ItemProps = {
    request: {
        id: number,
        startDate: Date,
        finishDate: Date,
        userName: string,
        status: string,
        comment: string
    },
    considerRequest: Function,
    token: string,
}

export const ApprovingItem: React.FunctionComponent<ItemProps> = ({ token, request, considerRequest }) => {
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    const getFullInfo = async () => {
        setLoading(true);
        setOpen(true);
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
                <h5>{request.userName}'s comment:</h5>
                <p>{request.comment}</p>
            </div>
            <div className='info-data-container'>
                <h5>My comment:</h5>
                <div className='approving-comment-container'>
                    <textarea name="comment" className="approving-comment" onInput={(event) => setComment(event.currentTarget.value)}></textarea>
                </div>
            </div>
            <div className='approving-button-container'>
                <button type='button' className='approve-request-button' onClick={() => considerRequest(request.id, true, comment)}>Approve</button>
                <button type='button' className='decline-request-button' onClick={() => considerRequest(request.id, false, comment)}>Decline</button>
            </div>
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
                    <p>{request.userName}</p>
                    <button type='button' className='show-full-info-button' onClick={() => isOpen? setOpen(false): getFullInfo()}>ᐯ</button>
                </div>
                <div className='request-full-info'>
                    {infoDiv}
                </div>
            </div>
        </React.Fragment>
    );
}