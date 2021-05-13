import * as React from 'react';
import '../../style/VacationApproving/VacationApprovingTable.css';
import { LoadingAnimation } from './../Loading';
import { ApprovingLine } from './VacationApprovingTableLine';

type TableProps = {
    requests: Array<{
        id: number,
        startDate: Date,
        finishDate: Date,
        name: string,
        status: string,
        comment: string
    }>
    loading: Boolean,
    considerRequest: Function
}


export const VacationApprovingTable: React.FunctionComponent<TableProps> = ({ loading, requests, considerRequest }) => {

    if(requests.length > 0)
        console.log('table' + requests[0].comment);
    return (
        <React.Fragment>
            <div id='vacation-approving'>
                <h2 className={loading? 'blured': ''}>Vacation approving</h2>
                <table id='approving' className={loading? 'blured': ''}>
                    <tbody>
                        <tr>
                            <th>Range</th>
                            <th>Name</th>
                            <th>User comment</th>
                            <th>My comment</th>
                            <th>My respons</th>
                        </tr>
                        {requests.filter(r => r.status === "Pending consideration").map((r) =>
                            <tr key={requests.indexOf(r)}>
                                <ApprovingLine request={r} considerRequest={(reaction: boolean, requestId: number, comment: string)=>considerRequest(reaction, requestId, comment)}/>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading? <div className='overflow-loading'><LoadingAnimation/></div>: null}
            </div>
        </React.Fragment>
    );
}