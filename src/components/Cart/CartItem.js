import React from 'react'

export default function CartItem({item,value}) {
    console.log("item from CartItem:  ")
    console.log(item)
    console.log("value from CartItem:   ")
    console.log(value)
    const{id,productName,productImage,productPrice,total,count} = item;
    const {increment,decrement,removeItem} = value;
    return (
        <div className="row my-2 text-capitalized text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={productImage} style={{width:'5rem', height: '5rem'}} className="img-fluid" alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <span className="d-lg-none">product: </span>
            {productName}
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <span className="d-lg-none">price: </span>
            {productPrice}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div >
                        <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
                            -
                        </span>
                        <span className="btn btn-black mx-1">{count}</span>
                        <span className="btn btn-black mx-1" onClick={() => increment(id)}>
                            +
                        </span>
                    </div>

                </div>
            </div>
            {/* */}
            <div className="col-10 mx-auto col-lg-2">
            <div className="cart-icon" onClick={() => removeItem(id)}>
            <i className="fas fa-trash" />    
            </div>     
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>item total : SR {total}</strong>
            </div>
        </div>
    )
}
