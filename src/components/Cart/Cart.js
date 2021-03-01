import React, { Component } from 'react'
import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from'./EmptyCart'
import { ProductConsumer } from '../../context'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        let storedCart = localStorage.getItem('cart');
                        if(storedCart.length > 0 ){
                        storedCart  = JSON.parse(localStorage.getItem('cart'));
                        value.cart = storedCart;
                        }
                        console.log("value.cart from Cart  :");
                        console.log(value.cart);
                        const {cart} = value;
                        
                        if(cart.length>0){
                            return(
                                <>
                                <div className="container">
                                <Title name="your" title="cart"/>
                                <CartColumns />
                                <CartList value={value}/>
                                <CartTotals value={value} history={this.props.history}/>
                                </div>
                                 </>
                            )
                        }
                        else{
                            return  <EmptyCart />
                        }
                    }}
                </ProductConsumer>
               
            </section>
        )
    }
}
