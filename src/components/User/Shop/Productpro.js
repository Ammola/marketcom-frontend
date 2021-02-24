import React, { Component } from 'react'
import axios from "axios";
import ProductNewForm from './ProductNewForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom';


export default class Productpro extends Component {
    constructor(props){
        super(props);
        this.state ={
            shop : props.shops,
            newProudct:{}
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
          <Link  to={"addProduct"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Add Shop</Link>
          <Route  path="/addProduct"  component={() =><ProductNewForm shops={this.state.shop}/>}/>
      </div>
      </Router>
    )
  }
}
