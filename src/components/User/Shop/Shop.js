import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Addshop from './Addshop'
import Editshop from './Editshop'
import Deleteshop from './Deleteshop'
import {Row, Col, Card, Form, InputGroup, FormControl, Button,CardGroup,Table} from 'react-bootstrap';
import Productpro from './Productpro'


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
            <Table striped bordered hover variant="blue" style={{  padding:'2%', width: '80%', float: 'none',
    margin: '0 auto' }}>
  <thead>
    <tr>
      <th><h1>Shop Name</h1></th>
      <th><h1>Action</h1></th>
      </tr>
      </thead>
      <tbody>
    <tr>
      <td>{this.state.newShop.shopName}</td>
      <td> {(this.state.newShop.id ==="0") ?
            null:<Link  to={"addShop"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Add Shop</Link>}{' '}
            <Link  to={"editShop"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Edit Shop</Link>{' '}
            <Link  to={"deleteShop"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Delete Shop</Link>{' '}
            <Link  to={"shopproduct"} className="btn btn-primary"><FontAwesomeIcon icon={faSignInAlt} /> Proudct</Link></td>{' '}

      </tr>
      </tbody>
      </Table>
            
           
            <Route  path="/addShop"  component={() =><Addshop usera={this.state.newUser}/>}/>
            <Route  path="/editShop"  component={() =><Editshop shops={this.state.newShop}/>}/>
            <Route  path="/shopproduct"  component={() =><Productpro shops={this.state.newShop}/>}/>

            {/* <Route  path="/deleteShop"  component={() =><Deleteshop shops={this.state.newShop}/>}/> */}
            {/* <button onClick={()=>this.deleteshop(this.state.newShop.id)}>Delete</button> */}
      </Router>
    )
  }
}
