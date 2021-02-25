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




export default class Productpro extends Component {
    constructor(props){
        super(props);
        this.state ={
            shop : props.shops,
            newProudct:[],
            isEdit: false,
            clickedProductId : ''
        }

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
            console.log("Error retreiving Authors !!");
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
            })
            .catch(error =>{
                console.log("Error Deleting product!")
                console.log(error)
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
                    isEdit:false
                })
            })
            .catch(error =>{
                console.log("Error product author");
                console.log(error)
            })
    }




  render() {
    return (
      
     
      <div>
                {(!this.state.isEdit) ?    <ProductNewForm  addProduct={this.addProduct} /> : null}
                <h1 className="col-10 mx-auto text-center text-slanted my-5">Proudct List</h1>
               
                
                    {this.state.newProudct.map((product, index) =>
                    <div  key={index}>
                    <Productshop  key={index} {...product} deleteProduct ={this.deleteProduct} editView={this.editView}/>
                    {(this.state.isEdit && this.state.clickedProductId === product.id) ? <EditProduct  product={product} editProduct={this.editProduct}/> : null}
                    </div>)}
                    
                    
            </div>
           
            

    )
    

                {/* <ul>
                    {this.state.newProudct.map((product, index) =>
                    <div  key={index}>
                    <li>{this.state.product.id}</li>
                    </div>)}
                    </ul> */}
          {/* <Link  to={"addProduct"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Add Product</Link>
          <Link  to={"editProduct"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Edit Product</Link> */}
          {/* <Route  path="/addProduct"  component={() =><ProductNewForm shops={this.state.shop}/>}/>
          <Route  path="/editProduct"  component={() =><EditProduct pro={this.state.newProudct}/>}/> */}
    
    
    
  }
}
