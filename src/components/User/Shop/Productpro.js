import React, { Component } from 'react'
import axios from "axios";
import ProductNewForm from './ProductNewForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import EditProduct from './EditProduct'
import Productshop from './Productshop'
import {Card,CardGroup} from 'react-bootstrap';
import { ProductConsumer } from '../../../context';
import { Alert } from "react-bootstrap";

const styles = {
    transition: 'all 1s ease-out'
};


export default class Productpro extends Component {
    constructor(props){
        super(props);
        this.state ={
            shop : props.shops,
            newProudct:[],
            isEdit: false,
            clickedProductId : '',
            successMessage: null,
            message:null,
            opacity: 1


        }

    }
    onHide() {
        this.setState({
            opacity: 0
        });
    }
    componentDidMount(){
        this.loadProductList();
    }

    loadProductList = (id) => {
        axios.get(`/marketcom/product/index?id=${this.state.shop.id}`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }})
        .then(response =>{
            console.log(response)
            this.setState({
                newProudct: response.data
            })
        })
        .catch(error =>{
            console.log("Error retreiving Product !!");
            console.log(error);
        })
    }

    addProduct=(product,id)=>{
        axios.post(`/marketcom/product/add?shopId=${this.state.shop.id}`,product, 
            {headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(response=>{
              console.log(response)
              this.loadProductList();
             
            })
            .catch(error=>{
              console.log(error);
             
            })
          }
    deleteProduct= (id) =>{
        axios.delete(`/marketcom/product/delete?productId=${id}`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }})
            .then(response =>{
                console.log("Deleted!")
                this.loadProductList();
                this.setState({
                    successMessage: "Successfully Delete Product !!!",
            
                  })
            })
            .catch(error =>{
                console.log("Error Deleting product!")
                console.log(error)
                this.setState({
                    message: "Error Occured. Please try again later!!!",
            
                  })
            })
    }

    editView =(id) =>{
        this.setState({
            isEdit: !this.state.isEdit,
            clickedProductId: id
        })
    }

    editProduct = (product,id) =>{
        axios.put(`/marketcom/product/edit?shopId=${this.state.shop.id}`, product,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }})
            .then(response =>{
                console.log("Edited!!")
                console.log(response);
                this.loadProductList();
                this.setState({
                    isEdit:false,
                })
            })
            .catch(error =>{
                console.log("Error product ");
                console.log(error)
               
            })
    }




  render() {
    const message = this.state.message ? (
        <Alert variant="danger" style={{...styles, opacity: this.state.opacity}}onClick={this.onHide.bind(this)}dismissible>{this.state.message}</Alert>
      ) : null;
    const successMessage = this.state.successMessage ? (
        <Alert variant="success"style={{...styles, opacity: this.state.opacity}}onClick={this.onHide.bind(this)}dismissible>{this.state.successMessage}</Alert>
      ) : null;
    return (
      
     
      <div>
           {message} {successMessage}
                {(!this.state.isEdit) ?    <ProductNewForm  addProduct={this.addProduct} /> : null}
                <h1 className="col-10 mx-auto text-center text-slanted my-5">Proudct List</h1>
               
                
                    {this.state.newProudct.map((product, index) =>
                    <div  key={index}>
                    <Productshop  key={index} {...product} deleteProduct ={this.deleteProduct} editView={this.editView}/>
                    {(this.state.isEdit && this.state.clickedProductId === product.id) ? <EditProduct  product={product} editProduct={this.editProduct}/> : null}
                    </div>)}
                    
                    
            </div>
           
            

    )
    

    
    
  }
}
