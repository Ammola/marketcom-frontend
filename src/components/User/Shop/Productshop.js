import React, { Component } from 'react'
import {Card,Button} from 'react-bootstrap';
import styled from 'styled-components';
import {faPhone, faEnvelope, faLock, faUndo, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class Productshop extends Component {
  render() {
    return (
        
        <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3" >
            <Card>
            
        <div className="card" >  
                
        <img src={this.props.productImage} alt="product" className="card-img-top" />
        <div className="card-footer d-flex justify-content-between ">
                    <p className="align-self-center mb-0">
                        {this.props.productName}
                    </p>
                    <h5 className="text-blue mb-0">
                        <Button variant="warning" size="sm" block onClick={()=>{this.props.deleteProduct(this.props.id)}}>
                            <FontAwesomeIcon icon={faTrashAlt}/> Delete</Button>
          <Button variant="warning" size="sm" block onClick={()=>{this.props.editView(this.props.id)}}>
          <FontAwesomeIcon icon={faEdit}/> Edit</Button>
          
                    </h5>
                    </div>          
          </div>
          </Card>
          </ProductWrapper>   
         
               
               
                
            
      
    )
  }
}

const ProductWrapper = styled.div`

.card{
    border-color:transparent;
    transition:all 1s linear;
    height: 100%;


    
}
.card-footer{
background: transparent;
border-top: transparent;
transition: all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background:rgba(247, 247, 247);
    }
}

.img-container{
    position: relative;
    overflow: hidden;
    width:50%;
}

.card-img-top{
    transition: all 1s linear;

}

.img-container: hover .card-img-top{
    transform: scale(1.2);
}


`
