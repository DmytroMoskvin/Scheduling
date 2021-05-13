import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/configureStore';
import{ UserData, UserState } from '../store/User/types';
import { LoginForm } from './LoginForm';
import { ProfileForm } from './Profile';
import '../style/LoadingAnimation.css';
import { LoadingAnimation } from './Loading';
import Cookies from 'js-cookie';
import { actionCreators } from '../store/User/actions';
import { getUserData } from '../webAPI/user';

type UserProps =
    UserState &
    typeof actionCreators &
    RouteComponentProps<{}>;

class User extends React.PureComponent<UserProps, { isLoading: boolean, showError: boolean }> {
    public state = {
        isLoading: false,
        showError: false
    };
    
    async componentDidMount(){
        const token = Cookies.get('token');
        
        if(token){
            
            this.props.logIn(token);
            const data = await getUserData(token);    
           
            if(data.data){
                this.props.setUserData(data.data.getCurrentUser); 
                return;
            }
        }
        this.props.logOut();

      }

    public render(){
        
        if(!this.props.logged){
            if(!this.state.isLoading){
                return (
                    <LoginForm 
                        logIn = {(token: string) => this.props.logIn(token)}
                        toggleLoading = {this.toggleLoading}
                        setError = {(error: boolean) => this.setError(error)}
                        showError = {this.state.showError}
                        token = {this.props.token}
                        setUserData = {(userData: UserData) => this.props.setUserData(userData)}/>
                );
            }
            return (<LoadingAnimation/>);
        }
        return (<ProfileForm logOut = {() => this.props.logOut()} user = {this.props.user}/>);
        
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
    actionCreators
)(User);