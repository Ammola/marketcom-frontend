import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Alert } from "react-bootstrap";

const styles = {
  transition: 'all 1s ease-out'
};
export default class Addshop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newUser : props.usera,
            shop:{},
            isAdd:false,
            successMessage: null,

        }
    }
    onHide() {
      this.setState({
          opacity: 0
      });
  }
    addHandler =(event) =>{
      event.preventDefault()
      this.props.addShop(this.state.shop);
      this.setState({
        isAdd:true,
        successMessage: "Successfully Add Shop !!!,you can only have one shop",

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
    
    const successMessage = this.state.successMessage ? (
      <Alert variant="success"style={{...styles, opacity: this.state.opacity}}onClick={this.onHide.bind(this)}dismissible>{this.state.successMessage}</Alert>
    ) : null;
    
    return (
     
        <Row className="justify-content-md-center">
                     {successMessage}
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
                    <Button variant="warning" block  onClick={this.addHandler}>Add</Button>
                    </Link>
              </Card.Body>
              </Card>
              </Col>
              :null}
              </Row>
    )
  }
}
