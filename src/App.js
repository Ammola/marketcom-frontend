import React, { Component } from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import logo from './Mylogo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Model from './components/Model';
import Register from './components/User/Register'
import Login from './components/User/Login'
import Profile from './components/User/profile'
import { decode } from "jsonwebtoken";
import { Alert } from "react-bootstrap";
import axios from "axios";
import Footer from './Home/Footer'



export default class App extends Component {
  state = {
    isAuth: false,
    user: null,
    message: null,
    successMessage: null,
    infouser:null
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token != null) {
      let user = decode(token);
      if (user) {
        this.setState({
          isAuth: true,
          user: user,
        });
      } else if (!user) {
        localStorage.removeItem("token");
        this.setState({
          isAuth: false,
        });
      }
    }
  };
  loginHandler=(user)=>{
    axios.post("marketcom/user/authenticate",user)
    .then((response) => {
      console.log(response);
      console.log(response.data.token);
      if (response.data.token != null) {
        localStorage.setItem("token", response.data.token);
       let user = decode(response.data.token);
        this.setState({
          isAuth: true,
          user: user,
          successMessage: "Successfully logged in!!!",
            message: null
        });
       
      }
      else {
        this.setState({
          isAuth: false,
          user: null,
          message: "Incorrect username or password",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        isAuth: false,
        message: "Error Occured. Please try again later!!!",
      });
    });
};
render() {
  const { isAuth } = this.state;
  const { user } = this.state;
  const message = this.state.message ? (
    <Alert variant="danger">{this.state.message}</Alert>
  ) : null;
  const successMessage = this.state.successMessage ? (
    <Alert variant="success">{this.state.successMessage}</Alert>
  ) : null;
  return (
   <>
    {message} {successMessage}
     <Navbar isAuth1={this.state.isAuth}/>
     <Switch>
       <Route exact path="/" component={ProductList}/>
       <Route path="/details" component={Details}/>
       <Route path="/cart" component={Cart}/>
       <Route path="/register"  component={() => isAuth ? <ProductList/>:<Register/>}/>
       <Route path="/login"  component={() => isAuth ? <ProductList/> :<Login login={this.loginHandler}/>}/>
       <Route path="/profile"  component={()=> isAuth ? <Profile  user1={this.state.user}/>:null}/>
       <Route component={Default}/>
     </Switch>
     <Footer/>
     <Model />
   </>
  )
}
}