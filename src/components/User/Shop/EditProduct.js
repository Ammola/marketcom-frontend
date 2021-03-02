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

export default class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state ={
            newProduct : props.product,
            successMessage: null,
            opacity: 1
        }
    }
    onHide() {
        this.setState({
            opacity: 0
        });
    }
      editHandler =(event) =>{
        event.preventDefault()
        this.props.editProduct(this.state.newProduct);
        this.setState({
            successMessage: "Successfully Edit Product !!!",
    
          })
    }
      changeHandler=(e)=>{
        let temp={...this.state.newProduct}
    temp[e.target.name]=e.target.value;
        this.setState({
            newProduct: temp
        })
    }
  render() {
    const successMessage = this.state.successMessage ? (
        <Alert variant="success" style={{...styles, opacity: this.state.opacity}}onClick={this.onHide.bind(this)}dismissible>{this.state.successMessage}</Alert>
      ) : null;
    return (
        <div>
       {successMessage}
    <Row className="justify-content-md-center" >
    <Col xs={5}>
        <Card className={"border border-dark bg-white text-dark"}>
            <Card.Header>
                <FontAwesomeIcon icon={faUserPlus}/> Edit Product
            </Card.Header>
            <Card.Body>
                <Form>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="productName" value={this.state.newProduct.productName} onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="category" value={this.state.newProduct.category} onChange={this.changeHandler}>
                    <option value="">Select Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </Form.Control>
                </Form.Group>
          <Form.Group>
              <Form.Label>Product Size</Form.Label>
              <Form.Control type="text" name="productSize" value={this.state.newProduct.productSize} onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Imge</Form.Label>
              <Form.Control type="text" name="productImage" value={this.state.newProduct.productImage} onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Color</Form.Label>
              <Form.Control type="color" name="productColor" value={this.state.newProduct.productColor} onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="txt" name="productPrice"value={this.state.newProduct.productPrice}  onChange={this.changeHandler}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <Form.Control name="productDescription" as="textarea" rows={3} value={this.state.newProduct.productDescription} onChange={this.changeHandler}></Form.Control>
          </Form.Group>
                <Button variant="warning" block onClick={this.editHandler}>Update</Button>
               </Form>
                </Card.Body>
                </Card>
                </Col>
                </Row>
                </div>
    )
  }
}
