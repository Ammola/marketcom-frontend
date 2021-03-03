import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faTshirt, faStore} from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Addshop from './Addshop'
import Editshop from './Editshop'
import Deleteshop from './Deleteshop'
import {Row, Col, Card, Form, InputGroup, FormControl, Button,CardGroup,Table} from 'react-bootstrap';
import Productpro from './Productpro'
import { Alert } from "react-bootstrap";


const styles = {
  transition: 'all 1s ease-out'
};

const URL="http://marketcomweb007-env.eba-knfd2xiy.us-east-2.elasticbeanstalk.com/"
const CroUrl="https://cors-anywhere.herokuapp.com/"
export default class shop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newUser : props.usera,
            newShop:{},
            viewForm: false,
            viewEditForm:false,
            hide:false,
            opacity: 1,
            successMessage: null,
            message:null,
        }
this.showForm=this.showForm.bind(this);
this.showrditForm=this.showrditForm.bind(this)

    }
    async componentDidMount() {
       
        this.loadshHandler();
       
}

    async loadshHandler(id){
        axios.get(CroUrl+URL+`/marketcom/shop/index?id=${this.state.newUser.id}`)
        .then(response =>{
            console.log(response)
            this.setState({
                newShop: response.data,
              
            })
        })
        .catch(error =>{
            console.log("Error retreiving shop !!");
            console.log(error);
        })
    }
    onHide() {
      this.setState({
          opacity: 0
      });
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
      console.log("shop")
      console.log(shop)
      axios.post(CroUrl+URL+`marketcom/shop/add?id=${this.state.newUser.id}`,shop, {headers: {'Content-Type': 'application/json',"Authorization": "Bearer " + localStorage.getItem("token")}})
      .then(response=>{
        console.log(response)
        this.loadshHandler();
        

      })
      .catch(error=>{
        console.log(error);
        
      })
    }
   

    deleteshop= (userId,id) =>{
      axios.delete(CroUrl+URL+`/marketcom/shop/delete?userId=${this.state.newUser.id}`,{
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      .then(response=>{
          console.log(response);
          this.loadshHandler();
          this.setState({
            successMessage: "Successfully Delete Shop!!!",
    
          })
        })
        .catch(error=>{
          console.log(error);
          this.setState({
            message: "Error Occured. Please try again later!!!",
    
          })
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
        <Router>
           {message} {successMessage}
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
             <Button variant="primary"  className="btn btn-warning mr-1" onClick={this.showForm}>Add Shop</Button> :null} 
             <Button variant="primary"  className="btn btn-warning mr-1" onClick={this.showrditForm} > <FontAwesomeIcon icon={faStore}/>Edit Shop</Button>  
            <Button variant="primary"  className="btn btn-warning mr-1" onClick={()=>this.deleteshop(this.state.newShop.id) }> <FontAwesomeIcon icon={faTrashAlt}/>Delete</Button>           
            {(this.state.newShop.id !=null) ?
             <Link  to={"shopproduct"} variant="primary"   className="btn btn-warning mr-1"><FontAwesomeIcon icon={faTshirt} /> Proudct</Link>:null}</td>
             

      </tr>
      </tbody>
      </Table>
      {(this.state.viewForm) ?  <Addshop addShop={this.addShop}/>:null}
      {(this.state.viewEditForm) ?<Editshop style={{...styles, opacity: this.state.opacity}}shops={this.state.newShop}/>:null}

          <Route  exact path="/shopproduct"  component={() =><Productpro shops={this.state.newShop}/>}/>
      </Router>
    )
  }
}
