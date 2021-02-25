import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class Login extends Component {
  state = {}
  loginHandler = () => {
      this.props.login(this.state);
  }
changeHandler = (e) => {
  let temp = {... this.state}
  temp[e.target.name] = e.target.value;
  this.setState(temp)
  console.log(temp);
} 
     
  render() {
    return (
        <Row className="justify-content-md-center">
        <Col xs={5}>
            <Card className={"border border-dark bg-white text-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faUserPlus}/> Login
                </Card.Header>
                <Card.Body>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="emailAddress" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Button variant="primary" block onClick={this.loginHandler}>Login</Button>  
   <p>Don't have account? <Link to="/register">Sign Up</Link></p> 
                    </Card.Body>
                    </Card>
                    </Col>
                    
                    </Row>
                    
                    
    )
  }
}
