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
            newShop:{},
            viewForm: false,
            viewEditForm:false,
            hide:false
        }
this.showForm=this.showForm.bind(this);
this.showrditForm=this.showrditForm.bind(this)

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

    showForm(){
      this.setState({
        viewForm: true,
        hide:true


      })

    }
    showrditForm(){
      this.setState({
        viewEditForm: true

      })

    }

    addShop=(shop)=>{
      axios.post(`marketcom/shop/add?id=${this.state.newUser.id}`,shop, {headers: {'Content-Type': 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")}})
      .then(response=>{
        console.log(response)
        this.loadshHandler();

      })
      .catch(error=>{
        console.log(error);
      })
    }
    editShop=(shop)=>{
      axios.put(`marketcom/shop/edit?userId=${this.state.newUser.id}`,shop,
      {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }})
      .then(response=>{
        console.log(response)
        this.loadshHandler();
      })
      .catch(error=>{
        console.log(error);
      })
    }

    deleteshop= (userId,id) =>{
      axios.delete(`/marketcom/shop/delete?userId=${this.state.newUser.id}`,{
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      .then(response=>{
          console.log(response);
          this.loadshHandler();
        })
        .catch(error=>{
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
      <td> 
        
            {(this.state.newShop.id ==null&&!this.state.hide) ?
             <Button variant="primary" block className="btn btn-warning mr-1" onClick={this.showForm}>Add Shop</Button> :null} 
             <Button variant="primary" block className="btn btn-warning mr-1" onClick={this.showrditForm}>Edit Shop</Button>  
            <Button variant="primary" block className="btn btn-warning mr-1" onClick={()=>this.deleteshop(this.state.newShop.id)}>Delete</Button>           
       
             <Link  to={"shopproduct"} variant="primary" block  className="btn btn-warning mr-1"><FontAwesomeIcon icon={faSignInAlt} /> Proudct</Link></td>

      </tr>
      </tbody>
      </Table>
      {(this.state.viewForm) ?  <Addshop addShop={this.addShop}/>:null}
      {(this.state.viewEditForm) ?<Editshop shops={this.state.newShop} editShop={this.editShop}/>:null}

          <Route  path="/shopproduct"  component={() =><Productpro shops={this.state.newShop}/>}/>
      </Router>
    )
  }
}
