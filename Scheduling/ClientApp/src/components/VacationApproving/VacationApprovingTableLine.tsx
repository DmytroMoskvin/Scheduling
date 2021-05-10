import * as React from 'react';
import { useState } from 'react';

type LineProps = {
    request: {
        id: number,
        startDate: Date,
        finishDate: Date,
        name: string,
        status: string,
        comment: string
    },
    considerRequest: Function
}


export const ApprovingLine: React.FunctionComponent<LineProps> = ({ request, considerRequest }) => {
    
  const [comment, setComment] = useState("");

    const validateDate = (date: number) => {
        return date < 10 ? '0' + date : date;
    }

  const convertDate = (date: Date) => {
    let dateObj = new Date(date);
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
      return (validateDate(day) + "/" + validateDate(month) + "/" + year);
}

  const handleSubmit = async (reaction: string) => {
      let reac = reaction === 'true'? true : false;
      considerRequest(reac, request.id, comment);
    }

    return (
        <React.Fragment>
            <td>{convertDate(request.startDate)}-{convertDate(request.finishDate)}</td>
            <td>{request.name}</td>
            <td>{request.comment}</td>
            <td><textarea className={"my-comment"} onInput={event => setComment(event.currentTarget.value)}/></td>
            <td className={"align-center"}>
                <button type='button' value='true' className={"button-vacation-agree"} onClick={event => handleSubmit(event.currentTarget.value)}>
                    <span>&#10003;</span>
                </button>
                <button type='button' className={"button-vacation-disagree"} onClick={event => handleSubmit(event.currentTarget.value)}>X</button>
            </td>
        </React.Fragment>
    );
}