import * as React from 'react';
import Cookies from "js-cookie";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/configureStore';
import { actionCreators } from '../store/User/actions';
import './NavMenu.css';


class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false,
    };

    public render() {
        const token = Cookies.get('token');

        const homeLink = (token != null) ?
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem> : null;

        const vacationRequestLink = (token != null) ?
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/vacationrequest">Vacation</NavLink>
            </NavItem> : null;

        const userManagementLink = (token != null) ?
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/usermanagement">User management</NavLink>
            </NavItem> : null;

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Scheduling</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                {homeLink}
                                {vacationRequestLink}
                                {userManagementLink}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.loggedUser,
    actionCreators
)(NavMenu);
