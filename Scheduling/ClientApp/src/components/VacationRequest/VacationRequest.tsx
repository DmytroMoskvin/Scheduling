import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import{ VacationRequest, VacationRequestState } from '../../store/VacationRequest/types';
import '../../style/VacationRequest/VacationRequest.css';
import { actionCreators } from '../../store/VacationRequest/actions';
import { addUserRequest, getUserRequests, removeUserRequest } from '../../webAPI/vacationRequest';
import { UserState } from '../../store/User/types';
import { DataRangePicker } from './DataRangePicker';
import Timer from './../Timer/timer';
import { RequestItem } from './VacationRequestItem';
import { LoadingAnimation } from '../Loading';


type VacationPageProps =
    UserState &
    VacationRequestState &
    typeof actionCreators &
    RouteComponentProps<{}>;

type DataObject = {
    vacationRequest: VacationRequest,
    vacationResponses: Array<{
        response: boolean,
        responderName: string,
        comment: string}>
}

class VacationRequestPage extends React.PureComponent<VacationPageProps, {}> {
    public state = {
        startDate: null,
        finishDate: null,
        focusedInput: null,
        comment: '',
        isLoading: false,
        showError: false
    };

    async requestListUpdate() {
        let requests = [];
        this.setState({isLoading: true});
        if(this.props.token) {
            console.log(this.props.token);
            requests = await getUserRequests(this.props.token);
            console.log(requests);
            if(requests !== undefined){
                this.props.setHistory(requests.data.getCurrentUserRequests);
                console.log(requests.data.getCurrentUserRequests);
            }
        }
        console.log(this.props.token);
        this.setState({isLoading: false});
    }

    componentDidMount(){
        this.requestListUpdate();
    }

    validateDate() {
        let startDate = this.state.startDate;
        let finishDate = this.state.finishDate;
        if (startDate && finishDate && startDate < finishDate) {
            return { startDate, finishDate }        
        }
        return null
    }

    clearForm () { 
        console.log('clear');
        let form = document.getElementById("vacation-request") as HTMLFormElement;
        if(form)
            form.reset();
    }

    async handleSubmit() {
        let date = this.validateDate();
        if(date && this.props.token) {
            this.clearForm();
            this.setState({isLoading: true});
            let comment = this.state.comment;
            let startDate = date.startDate;
            let finishDate = date.finishDate;
            let data = {startDate: startDate, finishDate: finishDate, comment};
            console.log(data);
            let newRequest = await addUserRequest(this.props.token, data);
            this.props.addVacationRequest(newRequest.data.addVacationRequest);
            //requestListUpdate();
            console.log(newRequest);
            console.log(this.props.requestHistory);
            this.setState({isLoading: false});
        }
    }  

    async removeRequest (id: number) {
        let requests = []
        if(this.props.token)
        {
            this.setState({isLoading: true});
            requests = await removeUserRequest(this.props.token, id);
            console.log('requests');
            console.log(requests.data.removeVacationRequest);
            if(requests !== undefined && requests.data.removeVacationRequest === true){
                this.props.removeVacationRequest(id);
                console.log(this.props.requestHistory);
            }
            this.setState({isLoading: false});
        }
    }

    checkDateRange(startDate: Date, finishDate: Date){
        let error = false;

        this.props.requestHistory.forEach(r => 
            {
                let existingStartDate = new Date(r.startDate);
                let existingFinishDate = new Date(r.finishDate);
                if(startDate >= existingStartDate && startDate <= existingFinishDate || finishDate >= existingStartDate && finishDate <= existingFinishDate){
                    error = true;
                }
            });
        
        console.log(this.state.showError);
        if(!error)
            this.setState({showError: false, startDate: startDate, finishDate: finishDate});
        else
            this.setState({showError: true, startDate: null, finishDate: null});
    }

    public render(){
        if(this.props.logged && this.props.token){
            return (
                <React.Fragment>
                    <main>
                        <div id='vacation-container'>
                            <form id='vacation-request'>
                                <h2>Vacation</h2>
                                <div className='data-container'>
                                    <label>Data range</label>
                                    <DataRangePicker availableDays={7} setRange={(startDate: Date, finishDate: Date) => this.checkDateRange(startDate, finishDate)}/>
                                </div>
                                <div className='data-container'>
                                    <label htmlFor='comment'>Comment</label>
                                    <textarea id='comment' onInput={(event) => this.setState({comment: event.currentTarget.value})}></textarea>
                                </div>
                                <div className='error-message-container'>
                                    {!!this.state.showError ? <p className='error-message'>You have already requested a vacation for this period!</p>: null}
                                </div>
                                <button id='send-request' type='button' disabled={this.state.isLoading} onClick={()=> this.handleSubmit()}>Request vacation</button>
                            </form>
                            <div id='vacation-info'>
                                <div className='time-tracker'>
                                    <Timer/>
                                </div>
                            </div>
                        </div>
                        <div id='vacation-history'>
                            <h5>Vacation history</h5>
                            {!this.state.isLoading?
                                this.props.requestHistory
                                .sort((a, b) => a.startDate != b.startDate? a.startDate > b.startDate? 1 : -1 : 0)
                                .map((r) =>
                                    <RequestItem key={r.id} token={this.props.token? this.props.token: ''} request={r} removeRequest={async (id: number) => await this.removeRequest(id)}/>
                                ):
                                <LoadingAnimation/>
                            }
                        </div>
                    </main>
                </React.Fragment>
            );
        }
        else{
            return <Redirect to='/'  />
        }  
    }
};

export default connect(
    (state: ApplicationState) => ({...state.loggedUser, ...state.vacationRequest}),
    actionCreators
)(VacationRequestPage);