import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



export default class Addshop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newUser : props.usera,
            shop:{}
        }
    }
    addHandler=(shop,id)=>{
        axios.post(`marketcom/shop/add?id=${id}`,shop, {headers: {'Content-Type': 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")}})
        .then(response=>{
          console.log(response)
        })
        .catch(error=>{
          console.log(error);
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
    return (
        <Row className="justify-content-md-center">
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
                    <Button variant="primary" block  onClick={()=>this.addHandler(this.state.shop,this.state.newUser.id)}>Add</Button>
                    </Link>
              </Card.Body>
              </Card>
              </Col>
              </Row>
    )
  }
}
