import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import OrderProduct from './OrderProduct';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';
import styled from 'styled-components';

export default class OrderDetails extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    console.log("value.detailOrderProducts")
                    console.log(value.detailOrderProducts)
                    return value.detailOrderProducts.map(product => {
                        return <OrderProduct key={product.id} product={product} />
                    })
                }}
            </ProductConsumer>
        )
    }
}

