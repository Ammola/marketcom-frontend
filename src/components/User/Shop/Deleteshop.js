import React, { Component } from 'react'
import axios from "axios";
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';



export default class Deleteshop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newshop : props.shops,
        }
    }
    deleteshop= (id) =>{
        axios.delete(`/marketcom/shop/delete?id=${id}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response=>{
            console.log(response)
          })
          .catch(error=>{
            console.log(error);
          })
        }
  render() {
    return (
      <div>
              <Button variant="primary" block onClick={()=>this.deleteshop(this.state.newshop.id)}>Delete</Button>
      </div>
    )
  }
}
