import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class Editshop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newshop : props.shops,
        }
    }
    editHandler=(newshop)=>{
        axios.put("marketcom/shop/edit",newshop,
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
        let temp={...this.state.newshop}
    temp[e.target.name]=e.target.value;
        this.setState({
            newshop: temp
        })
    }
  render() {
    return (
      <div>
        <Row className="justify-content-md-center">
        <Col xs={5}>
            <Card className={"border border-dark bg-white text-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faUserPlus}/> Edit Shop
                </Card.Header>
                <Card.Body>
                <Form.Group>
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control type="text" name="shopName" value={this.state.newshop.shopName} onChange={this.changeHandler}></Form.Control>
              </Form.Group>
              <Button variant="primary" block onClick={()=>this.editHandler(this.state.newshop)}>Update</Button>
              </Card.Body>
              </Card>
              </Col>
              </Row>
      </div>
    )
  }
}
