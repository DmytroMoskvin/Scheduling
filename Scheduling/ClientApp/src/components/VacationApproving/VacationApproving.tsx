import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import { actionCreators } from '../../store/VacationRequest/actions';
import { UserState } from '../../store/User/types';
import { considerVacationRequest, getAllRequests } from '../../webAPI/vacationApproving';
import '../../style/VacationApproving/VacationApprovingTable.css';
import { VacationRequest } from '../../store/VacationRequest/types';
import { ApprovingItem } from './VacationApprovingItem';
import { LoadingAnimation } from '../Loading';
import { RequestItem } from '../VacationRequest/VacationRequestItem';

type ApprovingRequest = {
    id: number,
    startDate: Date,
    finishDate: Date,
    userName: string,
    status: string,
    comment: string
}

type VacationApprovingProps =
    UserState &
    typeof actionCreators &
    RouteComponentProps<{}>;

class VacationApproving extends React.PureComponent<VacationApprovingProps, { requestsForConsideration: Array<ApprovingRequest>, responseHistory: Array<VacationRequest>, isLoading: boolean, comment: string}> {
    public state = {
        requestsForConsideration: Array<ApprovingRequest>(),
        responseHistory: Array<VacationRequest>(),
        isLoading: false,
        comment: ''
    }

    async considerRequest(requestId: number, response: boolean, comment: string) {
        if(this.props.token) {
            let res = await considerVacationRequest(this.props.token, requestId, response, comment);
            let index = null;
            let requests = this.state.requestsForConsideration.slice();
            let history = this.state.responseHistory.slice();
            let rec = requests.find(r => r.id === requestId);
            if(rec){
                index = requests.indexOf(rec);
                requests.splice(index, 1);
                history.push(res.data.considerVacationRequest);
                this.setState({requestsForConsideration: requests, responseHistory: history});
            }
        }
    }

    async requestListUpdate() {
        this.setState({isLoading: true});
        if(this.props.token) {
            let data = await getAllRequests(this.props.token);
            if(data !== undefined) {
                this.setState({
                    requestsForConsideration: data.data.getRequestsForConsideration,
                    responseHistory: data.data.getConsideredRequests
                });
                console.log(this.state.requestsForConsideration);
            }
        }
        this.setState({isLoading: false});
    }

    componentDidMount(){
        if(this.props.user && this.props.user.computedProps.permissions.includes('Manager'))
            this.requestListUpdate();
    }

    convertDate(date: Date) {
        let dateObj = new Date(date);
        let month = dateObj.getUTCMonth() + 1;
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return (year + "." + month + "." + day);
    }

    public render(){
        if(this.props.logged && this.props.token && this.props.user && this.props.user.computedProps.permissions.includes('Manager'))
            return (
                <React.Fragment>
                    <main>
                    <div id='vacation-approving'>
                        <h2>Vacation approving</h2>
                        {!this.state.isLoading?
                                this.state.requestsForConsideration.map((r) =>
                                    <ApprovingItem key={r.id} token={this.props.token? this.props.token: ''} request={r} considerRequest={async (requestId: number, response: boolean, comment: string) => await this.considerRequest(requestId, response, comment)}/>
                                ):
                                <LoadingAnimation/>
                            }
                    </div>
                    <div id='vacation-history'>
                        <h2>Response history</h2>
                        {!this.state.isLoading?
                                this.state.responseHistory.reverse().map((r) =>
                                <RequestItem key={r.id} token={this.props.token? this.props.token: ''} request={r} removeRequest={async (id: number) => {}}/>
                                ):
                                <LoadingAnimation/>
                            }
                    </div>
                    </main>
                </React.Fragment>
            );
        else
            return <Redirect to='/'/>
    }
}
export default connect(
    (state: ApplicationState) => state.loggedUser,
    actionCreators
)(VacationApproving);