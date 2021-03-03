import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faStore} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

const styles = {
  transition: 'all 1s ease-out'
};
const URL="http://marketcomweb007-env.eba-knfd2xiy.us-east-2.elasticbeanstalk.com/"
const CroUrl="https://cors-anywhere.herokuapp.com/"
export default class Editshop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newshop : props.shops,
            isEdit:false,
            successMessage: null,
            opacity: 1
        }
    }
    onHide() {
      this.setState({
          opacity: 0
      });
  }

  editHandler=(newshop)=>{
    axios.put(CroUrl+URL+"marketcom/shop/edit",newshop,
    {
      headers: {
        'Content-Type': 'application/json',
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
        let temp={...this.state.newshop}
    temp[e.target.name]=e.target.value;
        this.setState({
            newshop: temp
        })
    }
  render() {
    const successMessage = this.state.successMessage ? (
      <Alert variant="success" style={{...styles, opacity: this.state.opacity}}onClick={this.onHide.bind(this)}dismissible >{this.state.successMessage}</Alert>
    ) : null;
    return (
      <div>
               {successMessage}

        <Row className="justify-content-md-center" >
          
        <Col xs={5}>
            <Card className={"border border-dark bg-white text-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faStore}/> Edit Shop
                </Card.Header>
                <Card.Body>
                <Form.Group>
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control type="text" name="shopName" value={this.state.newshop.shopName} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Link  to="/"className="nav-link">
                    <Button variant="warning" block  onClick={()=>this.editHandler(this.state.newshop)}>Update</Button>
                    
                    </Link>
              </Card.Body>
              </Card>
              </Col>
              </Row>
      </div>
    )
  }
}
