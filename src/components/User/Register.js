import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";




const styles = {
  transition: 'all 1s ease-out'
};
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser:{},
            message: null,
    successMessage: null,
    validated:false
         }
    }
    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
  }
    onHide() {
      this.setState({
          opacity: 0
      });
  }
    registerHandler=(newUser)=>{
    if (!this.valid()) {
        alert("Passwords don't match");
    } else {
        axios.post("marketcom/user/registration",newUser)
        .then(response=>{
          console.log(response)
          if (response.data != null) {
            this.setState({
              successMessage: "Successfully register in!!!",
                message: null
            });
          }
          else {
            this.setState({
              message: "password don't match!!!",
            });
          }
        })
        .catch(error=>{
          console.log(error);
        })}
      }
      valid(){
        var password_1=document.getElementById('pass1').value;
        var password_2=document.getElementById('pass2').value;
        var message=document.getElementById('message');

        if(password_1==''){
            message.innerHTML='Enter Password';
            message.style.color="blue";

        }else if(password_2==''){
            message.innerHTML='Enter Confirm Password';
             message.style.color="blue";
        }
        else if(password_1!=password_2){
            message.innerHTML='Password Dosent Match';
             message.style.color="red";
             return false;
        }
        else{
            message.innerHTML='Password Match';
            message.style.color="green";
            
        }
        return true;

    }
    changeHandler=(e)=>{
        let temp={...this.state.newUser}
    temp[e.target.name]=e.target.value;
        this.setState({
            newUser: temp
        })
    }

  render() {
    const message = this.state.message ? (
        <Alert variant="danger" style={{...styles, opacity: this.state.opacity}}onClick={this.onHide.bind(this)}dismissible>{this.state.message}</Alert>
      ) : null;
      const successMessage = this.state.successMessage ? (
        <Alert variant="success" style={{...styles, opacity: this.state.opacity}}onClick={this.onHide.bind(this)}dismissible>{this.state.successMessage}</Alert>
      ) : null;
    return (
        <div>
            {message} {successMessage}
        <Row className="justify-content-md-center" >
        <Col xs={5}>
            <Card className={"border border-dark bg-white text-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faUserPlus}/> Register
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={()=>this.valid()}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={this.changeHandler} id="pass1"></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword"  onKeyUp={this.valid} id="pass2"></Form.Control>
              </Form.Group>
              <p id="message"></p>
              {/* <div>{this.state.msg.password}</div>
              <div>{this.state.msg.compassword}</div> */}
              <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" name="phoneNumber" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" name="country" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Street</Form.Label>
                  <Form.Control type="text" name="street" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>ZipCode</Form.Label>
                  <Form.Control type="text" name="zipCode" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                        <Form.Label>Register As</Form.Label>
                        <Form.Control as="select" name="userRole" onChange={this.changeHandler}>
                            <option value="">Select Role</option>
                            <option value="ROLE_USER">Customer</option>
                            <option value="ROLE_OWNER">Shop Owner</option>
                        </Form.Control>
                    </Form.Group>
                    <Link to="/">
                    <Button variant="warning" block onClick={()=>this.registerHandler(this.state.newUser)}>Register</Button>
                    </Link>
                   <p>Already have account? <Link to="/login">Sign In</Link></p> 
                   </Form>
                    </Card.Body>
                    </Card>
                    </Col>
                    </Row>
                    </div>
    )
  }
}
