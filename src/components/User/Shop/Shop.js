import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Addshop from './Addshop'
import Editshop from './Editshop'
import Deleteshop from './Deleteshop'

export default class shop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newUser : props.usera,
            newShop:{}
        }

    }
    async componentDidMount() {
       
        this.loadshHandler();
       
}

    async loadshHandler(id){
        axios.get(`/marketcom/shop/index?id=${this.state.newUser.id}`)
        .then(response =>{
            console.log(response)
            this.setState({
                newShop: response.data,
              
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
            <h1>{this.state.newShop.shopName}</h1>
            <Link  to={"addShop"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Add Shop</Link>
            <Link  to={"editShop"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Edit Shop</Link>
            <Link  to={"deleteShop"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Delete Shop</Link>
            <Route  path="/addShop"  component={() =><Addshop usera={this.state.newUser}/>}/>
            <Route  path="/editShop"  component={() =><Editshop shops={this.state.newShop}/>}/>
            {/* <Route  path="/deleteShop"  component={() =><Deleteshop shops={this.state.newShop}/>}/> */}
            {/* <button onClick={()=>this.deleteshop(this.state.newShop.id)}>Delete</button> */}
      </Router>
    )
  }
}
