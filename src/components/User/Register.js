import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";



export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser:{}
         }
    }
    registerHandler=(newUser)=>{
        axios.post("marketcom/user/registration",newUser)
        .then(response=>{
          console.log(response)
        })
        .catch(error=>{
          console.log(error);
        })
      }
    changeHandler=(e)=>{
        let temp={...this.state.newUser}
    temp[e.target.name]=e.target.value;
        this.setState({
            newUser: temp
        })
    }

  render() {
    return (
        <Row className="justify-content-md-center">
        <Col xs={5}>
            <Card className={"border border-dark bg-white text-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faUserPlus}/> Register
                </Card.Header>
                <Card.Body>
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
                  <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
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
                    <Button variant="primary" block onClick={()=>this.registerHandler(this.state.newUser)}>Register</Button>
                   <p>Already have account? <Link to="/login">Sign In</Link></p> 
                    </Card.Body>
                    </Card>
                    </Col>
                    </Row>
    )
  }
}
