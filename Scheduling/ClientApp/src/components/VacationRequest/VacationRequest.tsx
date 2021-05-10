import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/configureStore';
import{ VacationRequestState } from '../../store/VacationRequest/types';
import '../../style/VacationRequest/VacationRequest.css';
import { actionCreators } from '../../store/VacationRequest/actions';
import { RequestsTable } from './RequestsTable';
import { addUserRequest, getUserRequests, removeUserRequest } from '../../webAPI/vacationRequest';
import { UserState } from '../../store/User/types';
import { DataRangePicker } from './DataRangePicker';
import Timer from './../Timer/timer';


type VacationPageProps =
    UserState &
    VacationRequestState &
    typeof actionCreators &
    RouteComponentProps<{}>;

class VacationRequest extends React.PureComponent<VacationPageProps, {}> {
    public state = {
        startDate: null,
        finishDate: null,
        focusedInput: null,
        comment: '',
        loading: false
    };

    async requestListUpdate() {
        let requests = [];
        this.setState({loading: true});
        if(this.props.token) {
            requests = await getUserRequests(this.props.token);
            if(requests !== undefined)
                this.props.setHistory(requests.data.getCurrentUserRequests);
        }
        this.setState({loading: false});
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
            this.setState({loading: true});
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
            this.setState({loading: false});
        }
    }  

    async removeRequest (id: number) {
        let requests = []
        if(this.props.token)
        {
            this.setState({loading: true});
            requests = await removeUserRequest(this.props.token, id);
            console.log('requests');
            console.log(requests.data.removeVacationRequest);
            if(requests !== undefined && requests.data.removeVacationRequest === true){
                this.props.removeVacationRequest(id);
                console.log(this.props.requestHistory);
            }
            this.setState({loading: false});
        }
    }

    public render(){
        if(this.props.logged){
            return (
                <React.Fragment>
                    <main>
                        <div id='vacation-container'>
                            <form id='vacation-request'>
                                <h2>Vacation</h2>
                                <div className='data-container'>
                                    <label>Data range</label>
                                    <DataRangePicker availableDays={7} setRange={(startDate: Date, finishDate: Date) => this.setState({startDate, finishDate})}/>
                                </div>
                                <div className='data-container'>
                                    <label htmlFor='comment'>Comment</label>
                                    <textarea id='comment' onInput={(event) => this.setState({comment: event.currentTarget.value})}></textarea>
                                </div>
                                <button id='send-request' type='button' disabled={this.state.loading} onClick={()=> this.handleSubmit()}>Request vacation</button>
                            </form>
                            <div id='vacation-info'>
                                <div className='time-tracker'>
                                    <Timer/>
                                </div>
                            </div>
                        </div>
                        <RequestsTable loading={this.state.loading} requests={this.props.requestHistory} removeRequest={async (id: number) => await this.removeRequest(id)}/>
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
)(VacationRequest);