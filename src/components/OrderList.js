import React, { Component } from 'react';
import Order from './Order';
import Title from './Title';
import { ProductConsumer } from '../context';
import CarouselImageSlider from '../Home/CarouselImageSlider'
export default class ProductList extends Component {
    // constructor(props) {
    //     super(props)
    
    //     this.state = {
    //          products: []
    //     }
    // }
    
    render() {
        return (
            <>
             <CarouselImageSlider/>
                <div className="py-5">
                    <div className="container">
                        <Title name="your" title="orders"/>
                        <div className="row">
                        <table className="table">
                             <thead>
                             <tr>
                               <th scope="col">Order ID</th>
                               <th scope="col">Amount</th>
                             </tr>
                           </thead>
                           </table>
                            <ProductConsumer>
                            {
                            value  =>{ 
                                const orders = value.orders;
                                console.log("orders.length")
                                console.log(orders.length)
                                if(orders.length > 0){
                                console.log("TRUE");
                           return value.orders.map( order => {
                            return <Order key={order.id} order={order} />})
                           } else {
                              return (<span>You dont have orders yet</span>)
                           }
                                    
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div> 
            </>
            //    
        )
    }
}
