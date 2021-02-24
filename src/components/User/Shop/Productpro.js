import React, { Component } from 'react'
import axios from "axios";
import ProductNewForm from './ProductNewForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';
import EditProduct from './EditProduct'


export default class Productpro extends Component {
    constructor(props){
        super(props);
        this.state ={
            shop : props.shops,
            newProudct:[]
        }

    }
    componentDidMount(){
        this.loadProductList();
    }

    loadProductList = (id) => {
        axios.get(`/marketcom/product/index?id=${this.state.shop.id}`)
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



  render() {
    return (
        <Router>
      <div>
      <h1>Authors List</h1>
                {/* <ul>
                    {this.state.newProudct.map((product, index) =>
                    <div  key={index}>
                    <li>{this.state.product.id}</li>
                    </div>)}
                    </ul> */}
          <Link  to={"addProduct"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Add Product</Link>
          <Link  to={"editProduct"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Edit Product</Link>
          <Route  path="/addProduct"  component={() =><ProductNewForm shops={this.state.shop}/>}/>
          <Route  path="/editProduct"  component={() =><EditProduct pro={this.state.newProudct}/>}/>

      </div>
      </Router>
    )
  }
}
