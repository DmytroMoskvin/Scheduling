import * as React from "react";

import NewsBlock from "../News/NewsBlock/";
import Profile from "../Profile/";
import {UserData, UserState} from "../../store/User/types";

import './style.css';
import './layout.css';
import {connect} from "react-redux";
import {ApplicationState} from "../../store/configureStore";
import {actionCreators} from "../../store/User/actions";
import Cookies from "js-cookie";
import {getUserData} from "../../webAPI/user";
import Timer from '../Timer/timer';
import WhoIsOut from "../WhoIsOut";

type MainPageProps =
    UserState &
    typeof actionCreators

class MainPage extends React.PureComponent<MainPageProps> {

    async componentDidMount(){
        const token = Cookies.get('token');

        if(token){

            this.props.logIn(token);
            const data = await getUserData(token);

            if(data.data && data.data.getCurrentUser){
                this.props.setUserData(data.data.getCurrentUser);
                return;
            }
        }
        this.props.logOut();

    }

    render()
    {
        return (
            <main className="main-page-container">
                <section className="main-block">
                    <div className="left-side">
                        <Profile user={this.props.user}/>
                    </div>
                    <div className="right-side">
                        <div className="top-side">
                            <div className="timer-container">
                                <Timer/>
                            </div>
                        </div>
                        <div className="bottom-side">
                            <WhoIsOut token={Cookies.get('token') || ""}/>
                        </div>
                    </div>
                </section>
                <aside className="aside-news">
                    <NewsBlock/>
                </aside>
            </main>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.loggedUser,
    actionCreators
)(MainPage);