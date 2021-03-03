import React, { Component } from 'react'
import axios from "axios";
import {Row, Col, Card, Form, InputGroup, FormControl, Button} from 'react-bootstrap';


const URL="http://marketcomweb007-env.eba-knfd2xiy.us-east-2.elasticbeanstalk.com/"
const CroUrl="https://cors-anywhere.herokuapp.com/"
export default class Deleteshop extends Component {
    constructor(props){
        super(props);
        this.state ={
            newshop : props.shops,
            user:props.userd
        }
    }
    deleteshop= (userId,id) =>{
        axios.delete(CroUrl+URL+`shop/delete?userId=${this.state.user.id}`,{
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
