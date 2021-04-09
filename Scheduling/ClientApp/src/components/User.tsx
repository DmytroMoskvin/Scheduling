import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as UserStore from '../store/User';
import { LoginForm } from './LoginForm';
import { ProfileForm } from './Profile';
import '../style/LoadingAnimation.css';
import { LoadingAnimation } from './Loading';

type UserProps =
    UserStore.UserState &
    typeof UserStore.actionCreators &
    RouteComponentProps<{}>;

class User extends React.PureComponent<UserProps, { isLoading: boolean, showError: boolean }>{
    public state = {
        isLoading: false,
        showError: false
    };
    
    public render(){
        if(!this.props.logged){
            if(!this.state.isLoading){
                    return (
                        <LoginForm logIn = {(loginData: UserStore.UserData) => this.props.logIn(loginData)}
                            toggleLoading = {this.toggleLoading}
                            setError = {(error: boolean) => this.setError(error)}
                            showError = {this.state.showError}/>
                    );
                }
            else{
                return (<LoadingAnimation/>);
            }
        }
        else{
            return (<ProfileForm logOut = {() => this.props.logOut()} user = {this.props.user}/>);
        }
    }

    private toggleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }
    private setError(error: boolean) {
        this.setState({
            showError: error
        });
    }
};

export default connect(
    (state: ApplicationState) => state.loggedUser,
    UserStore.actionCreators
)(User);