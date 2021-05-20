import Cookies from 'js-cookie';
import * as React from 'react';
import { Component } from 'react';
import { Accordion, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/configureStore';
import { actionCreators } from '../../store/Timer/actions';
import { TimerType } from '../../store/Timer/types';
import '../../style/RequestsTable.css';
import { deleteTimer, getUserTimerData } from '../../webAPI/timer';
import Popup from './Popup';

interface IProps {
    timerHistory: Array<TimerType>;
    deleteTime: (time: number) =>
        ({
            type: "DELETE_TIME",
            time: number
        });
}

interface IState {
    showPopup: boolean;
    editId: number;
    startTime: Date;
    finishTime: Date;
    buttonText: string;
    isModified?: boolean;
}

class TimerHistoryTable extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showPopup: false,
            editId: 0,
            startTime: new Date(),
            finishTime: new Date(),
            buttonText: "",
        };
    }
    async componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            const data = await getUserTimerData(token);
        }
        console.log(this.props.timerHistory);
    }
    async deleteTimerValue(id: number) {
        const token = Cookies.get('token');
        let data;
        if (token != undefined)
            data = await deleteTimer(token, id);

        if (data.data) {
            this.props.deleteTime(data.data.deleteTimerFinishValue.id);
        }

    }
    convertMiliseconds(finishTime: Date, startTime: Date) {
        if (finishTime == null) {
            return ""
        }
        var millis = new Date(finishTime).valueOf() - new Date(startTime).valueOf();
        var minutes;
        var hours;
        minutes = Math.floor((millis / (1000 * 60)) % 60);
        hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        return hours + ":" + minutes;
    }
    togglePopup(idArg = "", startTime = new Date(), finishTime = new Date()) {
        if (idArg == "")
            this.setState({
                showPopup: !this.state.showPopup,
                editId: Number(idArg),
                startTime: new Date(new Date(startTime) + " UTC"),
                finishTime: new Date(new Date(finishTime) + " UTC"),
            });
        else {
            if (typeof (idArg) == "string") {
                var date = this.props.timerHistory.find(({ id }) => id == Number(idArg));
                if (date != undefined)
                    this.setState({
                        showPopup: !this.state.showPopup,
                        startTime: new Date(new Date(date.startTime) + " UTC"),
                        editId: Number(idArg),
                        finishTime: new Date(new Date(date.finishTime) + " UTC"),
                    });
            }
            else {
                this.setState({
                    showPopup: !this.state.showPopup,
                })
            }
        }
    }
    convertDateToHoursMinutes(time: Date) {
        let hours = new Date(time).getHours();
        let hoursStr = (hours < 10) ? "0" + hours : hours;
        let minutes = new Date(time).getMinutes();
        let minutesStr = (minutes < 10) ? "0" + minutes : minutes;
        return (hoursStr + ":" + minutesStr);
    }
    changePopUpButtonText(text: string) {
        this.setState({
            buttonText: text
        })
    }
    getConvertedDate(date: Date) {
        return (new Date(date + " UTC").toLocaleDateString());
    }
    renderAccordions = (array) => {

        var b = [... new Set(array.map((item) =>
            (new Date(item["startTime"]).toLocaleDateString())
        ))];

        var a = b.map(item => array.filter(a => new Date(a.startTime).toLocaleDateString() == item));


        var j = (b.map((item) => [item, array.filter(a => new Date(a.startTime).toLocaleDateString() == item)]));

        console.log(a);

        //var b = [... new Set(array.map(function (item) { return new Date(item["startTime"]).toLocaleDateString(); }))]; // ������� ������� ����


         return (
             j.map(this.renderAccordion)
        )
    }
    renderAccordion = (r, index) => {
        return (
            <td colSpan={5} style={{ textAlign: "center" }}>
                <Accordion key={index} >
                    <Accordion.Toggle as={Card.Header} eventKey={r} style={{ display: "flex", justifyContent: "space-between" }}>
                            {r[0]} <i>+</i>
                        </Accordion.Toggle>
                    <Accordion.Collapse eventKey={r}>
                        <table>
                            <thead><th>Date</th><th>Interval</th><th>Time(h:m)</th><th>Modified time</th><th></th></thead>
                                {this.renderRow(r[1])}
                        </table>

                        
                        </Accordion.Collapse>
                </Accordion>
            </td>
            )
    }
    renderRow(arr) {
        return (arr.map((r) => <tr key={arr[0].id}>
            <td>
                {this.getConvertedDate(new Date(r.startTime))}
            </td>
            <td>{
                ((new Date((new Date(r.startTime)).toString() + " UTC"))
                    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}-{(r.finishTime == null ? "still in action" :
                        ((new Date((new Date(r.finishTime)).toString() + " UTC"))
                            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })))}</td>
            <td>{
                this.convertMiliseconds(r.finishTime, new Date(r.startTime))
            }</td>
            <td>{
                r.isModified == true &&
                "+"
            }</td>
            <td>
                <button onClick={() => {
                    this.togglePopup(r.id.toString(), new Date(r.startTime), new Date(r.finishTime))
                    this.changePopUpButtonText("Edit")
                }}>Edit</button>
                <button onClick={() => {
                    this.deleteTimerValue(r.id)
                }}>Delete</button>
            </td>
        </tr>))
    }
    render() {
        if (this.props.timerHistory != undefined && this.props.timerHistory.length > 0) {
            this.props.timerHistory
                .sort((a: TimerType, b: TimerType) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf());
            console.log('table' + this.props.timerHistory[0].id);
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Timer history</h5>
                        <table id='history' style={{ display: "flex", flexDirection: "column", width: "25vw" }}>
                            <tbody style={{ display: "flex", flexDirection: "column" }}>
                                {this.renderAccordions(this.props.timerHistory.slice(0).reverse())}
                            </tbody>
                        </table>
                        <button id='send-request' onClick={() => {
                            this.togglePopup()
                            this.changePopUpButtonText("Add")
                        }}>Add new item</button>

                        {this.state.showPopup ?
                            <Popup
                                closePopup={this.togglePopup.bind(this)}
                                editId={this.state.editId}
                                startTime={this.state.startTime}
                                finishTime={this.state.finishTime}
                                buttonText={this.state.buttonText}
                            />
                            : null
                        }
                    </div>
                </React.Fragment>)
        }
        else {
            return (
                <React.Fragment>
                    <div id='vacation-history'>
                        <h5>Timer history</h5>
                        <table id='history'>
                            <tbody>
                                <tr>
                                    <th>Interval</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                            </tbody>
                        </table>
                        <button id='send-request' onClick={() => {
                            this.togglePopup()
                            this.changePopUpButtonText("Add")
                        }}> Add new item</button>
                        {this.state.showPopup ?
                            <Popup
                                closePopup={this.togglePopup.bind(this)}
                                editId={this.state.editId}
                                startTime={this.state.startTime}
                                finishTime={this.state.finishTime}
                                buttonText={this.state.buttonText}
                            />
                            : null
                        }
                    </div>
                </React.Fragment>)
        }
    }
}
export default connect(
    (state: ApplicationState) => state.timerHistory,
    actionCreators
)(TimerHistoryTable);


