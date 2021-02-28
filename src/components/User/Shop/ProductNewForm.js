import React, { Component } from 'react'
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";



export default class ProductNewForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            shpq : props.shops,
            newProduct : {}
        }
    }

    addHandler =(event) =>{
        event.preventDefault()

        this.props.addProduct(this.state.newProduct);
    }
      changeHandler=(e)=>{
        let temp={...this.state.newProduct}
    temp[e.target.name]=e.target.value;
        this.setState({
            newProduct: temp
        })
    }
  render() {
    return (
        <div>
        {/* {message} {successMessage} */}
    <Row className="justify-content-md-center" >
    <Col xs={5}>
        <Card className={"border border-dark bg-white text-dark mt-3"}>
            <Card.Header>
                <FontAwesomeIcon icon={faUserPlus}/> Add Product
            </Card.Header>
            <Card.Body>
                <Form>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="productName" onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="category" onChange={this.changeHandler}>
                    <option value="">Select Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </Form.Control>
                </Form.Group>
          <Form.Group>
              <Form.Label>Product Size</Form.Label>
              <Form.Control type="text" name="productSize" onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Imge</Form.Label>
              <Form.Control type="text" name="productImage" onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Color</Form.Label>
              <Form.Control type="color" name="productColor" onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="txt" name="productPrice" onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <Form.Control name="productDescription" as="textarea" rows={3} onChange={this.changeHandler}></Form.Control>
          </Form.Group>
                <Button variant="warning" block onClick={this.addHandler}>Add</Button>
               </Form>
                </Card.Body>
                </Card>
                </Col>
                </Row>
                </div>
    )
  }
}
