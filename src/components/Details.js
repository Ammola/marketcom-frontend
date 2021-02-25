import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import styled from 'styled-components';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    let product = JSON.parse(localStorage.getItem('detailProduct'));
                    console.log(product.id);
                    let {id, category, productImage, productDescription, productPrice, productName, productColor, inCart} = product;
                    console.log(productColor);
                    return(
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-Yellow my-5">
                                    <h1>{ productName }</h1>
                                </div>
                            </div>
                            {/* end title */}
                            {/* product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={productImage} className="img-fluid" alt="product"/>
                                    </div>
                                    {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h3>product type: {productName}</h3>
                                    <h5 className="text-title text-muted text-uppercase mt-3 mb-2">
                                    category: <span className="text-uppercase">{category}</span>
                                    </h5>
                                    <ColoredBox>
                                    <h5 className="text-title text-uppercase mt-3 mb-2">
                                    color: <span className="color-box" style={{backgroundColor: productColor}}></span>
                                    </h5>
                                    </ColoredBox>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        some info about product:
                                    </p>
                                    <p className="text-capitalize mt-1 mb-5">{productDescription}</p>
                                    <h4 className="text-blue">
                                        <strong>
                                        price: <span>SR</span>
                                        {productPrice}
                                        </strong>
                                    </h4>
                                    {/* buttons */}
                                    <div>
                                        <Link to="/">
                                            <ButtonContainer>back to products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer 
                                        cart
                                        disable={inCart?true:false}
                                        onClick={()=>{
                                            value.addToCart(id);
                                            value.openModel(id);
                                        }}
                                        >
                                            {inCart ? "inCart" : "add to cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}


const ColoredBox = styled.div`
.color-box {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #ccc;
    position: relative;
    left: 0.1rem;
    top: 0.1rem;
}
`
