import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

export default class editProfile extends Component {
    constructor(props){
        super(props);
        this.state ={
            newUser : props.usera
        }
    }
    
    editrHandler=(newUser)=>{
        axios.put("marketcom/user/editPersonalInfo",newUser,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }})
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
                    <FontAwesomeIcon icon={faUserPlus}/> Update
                </Card.Header>
                <Card.Body>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName"value={this.state.newUser.firstName} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" value={this.state.newUser.lastName} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="emailAddress"value={this.state.newUser.emailAddress} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" name="resetPassword" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" name="phoneNumber"value={this.state.newUser.phoneNumber} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city"value={this.state.newUser.city} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" name="country" value={this.state.newUser.country} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Street</Form.Label>
                  <Form.Control type="text" name="street" value={this.state.newUser.street} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>ZipCode</Form.Label>
                  <Form.Control type="text" name="zipCode" value={this.state.newUser.zipCode} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
                    <Link to="/profile" className="nav-link">
                    <Button variant="primary" block onClick={()=>this.editrHandler(this.state.newUser)}>Update</Button>
                    </Link>
                    </Card.Body>
                    </Card>
                    </Col>
                    </Row>
    )
  }
}
