import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Alert } from "react-bootstrap";


export default class Addshop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newUser : props.usera,
            shop:{},
            isAdd:false,
            successMessage: null,
            inforMessage: null

        }
    }
    addHandler =(event) =>{
      event.preventDefault()
      this.props.addShop(this.state.shop);
      this.setState({
        isAdd:true,
        successMessage: "Successfully Add Shop !!!",
        inforMessage: "you can only have one shop"

      })
  }
   
      changeHandler=(e)=>{
        let temp={...this.state.shop}
    temp[e.target.name]=e.target.value;
        this.setState({
            shop: temp
        })
    }
  render() {
    const inforMessage = this.state.inforMessage ? (
      <Alert variant="info">{this.state.inforMessage}</Alert>
    ) : null;
    const successMessage = this.state.successMessage ? (
      <Alert variant="success">{this.state.successMessage}</Alert>
    ) : null;
    
    return (
     
        <Row className="justify-content-md-center">
                      {inforMessage} {successMessage}
           {(!this.state.isAdd) ? 
        <Col xs={5}>
            <Card className={"border border-dark bg-white text-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faUserPlus}/> Add Shop
                </Card.Header>
                <Card.Body>
                <Form.Group>
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control type="text" name="shopName" onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Link to="/profile" className="nav-link">
                    <Button variant="primary" block  onClick={this.addHandler}>Add</Button>
                    </Link>
              </Card.Body>
              </Card>
              </Col>
              :null}
              </Row>
    )
  }
}
