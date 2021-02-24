import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {id, category, img, productDescription, productPrice, productName, inCart} = value.detailProduct;
                    return(
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{ productName }</h1>
                                </div>
                            </div>
                            {/* end title */}
                            {/* product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} className="img-fluid" alt="product"/>
                                    </div>
                                    {/* product text */}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h3>model: {productName}</h3>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        made by: <span className="text-uppercase">{category}</span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                        price: <span>$</span>
                                        {productPrice}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        some info about product:
                                    </p>
                                    <p className="text-muted lead">{productDescription}</p>
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
