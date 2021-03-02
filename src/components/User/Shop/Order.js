import React, { Component } from 'react'
import axios from "axios";

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state ={
            newUser : props.usera,
            newOrder:{},
            viewForm: false,
            viewEditForm:false,
            hide:false,
            opacity: 1,
            successMessage: null,
            message:null,
        }}
        async componentDidMount() {
       
            this.loadshHandler();
           
    }
    
        async loadshHandler(id){
            const userId = JSON.parse(localStorage.getItem('userId'))
            axios.get(`/marketcom/order/index?userId=${userId}`)
            .then(response =>{
                console.log(response)
                this.setState({
                    newOrder: response.data,
                  
                })
            })
            .catch(error =>{
                console.log("Error retreiving shop !!");
                console.log(error);
            })
        }

  render() {
    return (
      <div>
        <h1>{this.state.newOrder.productTotal}</h1>
      </div>
    )
  }
}
