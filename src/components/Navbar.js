import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Mylogo.svg'
import styled from 'styled-components'
import { ButtonContainer } from './Button' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isAuth2:props.isAuth1
           // id:props.user1.id
         }
    }
    onLogoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        this.setState({
          isAuth2: false,
          user: null,
        });
      };
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
                    Creative Commons (Attribution 3.0 Unported);
                    https://www.iconfinder.com/Makoto_msk */}
                <Link to="/">
                    <img src={logo} alt="store" className="navbar-brand" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                    <Link to="/register" className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
                    </li>
                    <li className="nav-item ml-5">
                    { this.props.isAuth1 ?  <Link to="/logout" onClick={this.onLogoutHandler} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Logout</Link>
            :<Link to="/login" className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>}
                     </li>
                    <li className="nav-item ml-5">
                    { this.props.isAuth1 ? <Link to="/profile" className="nav-link"><FontAwesomeIcon icon={faSignOutAlt} /> Profile</Link>:null}
                    </li>
                    <li>
                        <Link to="/" className="nav-link">
                            Products
                        </Link>
                    </li>
                </ul>
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">
                        <i className="fas fa-cart-plus"/>
                        </span>
                        my cart
                    </ButtonContainer>
                </Link>
               
            </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link{
    color: var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform: capitalize;
}
`
