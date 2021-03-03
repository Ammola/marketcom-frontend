import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PayPalButton from './PayPalButton'



export default function CartTotals({ value, history }) {
    const { cartSubTotal, cartTax, cartTotal, clearCart, cartTotalUSD, addOrder, addProductsToOrder } = value
    //const totalUSD = parseInt(cartTotal) * 0.27
    console.log("cartTotalUSD: " + cartTotalUSD);
    useEffect(() => {
        value.addTotals()
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-auto col-sm-8 text-capitaliza text-right">
                        <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={() => clearCart()}>
                                clear cart

                        </button>
                        </Link>
                        <h5>
                            <span className="text-title">
                                subtotal :
                        </span>
                            <strong>SR {cartSubTotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">
                                tax :
                        </span>
                            <strong>SR {cartTax}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">
                                total :
                        </span>
                            <strong>SR {cartTotal}</strong>
                        </h5>
                        {!(localStorage.getItem('token')) ? <Link to="/register"><h3>
                            <span className="text-title">please join us to complete payment</span></h3></Link>
                        : <PayPalButton total={cartTotal} clearCart={clearCart} history={history} totalUSD={cartTotalUSD} addOrder={addOrder} addProductsToOrder={addProductsToOrder} />
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
