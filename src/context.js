import React, { Component } from 'react';
import {detailProduct } from './data';
import axios from "axios";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    constructor(props) {
        super(props)
        if (!(localStorage.getItem('cart'))){
            localStorage.setItem('cart',  JSON.stringify([]));
        }
        this.state = {
             products: [],
             detailProduct: {},
             cart: JSON.parse(localStorage.getItem('cart')),
             modelOpen: false,
             modelProduct: {},
             cartSubTotal: 0,
             cartTax: 0,
             cartTotal: 0,
             cartTotalUSD: 0,
             orderId: "", 
             orders: []
        }
        this.addSingleProductToOrder = this.addSingleProductToOrder.bind(this)
        
    }

    componentDidMount(){
        this.loadProductList();
        //this.addTotals();
        console.log("products from didMount:   ")
        console.log(this.state.products)
        this.loadOrders();
    }

    loadProductList = () => {
        axios.get("/marketcom/product/indexall")
             .then(response =>{
            this.setState(()=>{
                        return {products: response.data}
                    })
            let tempProducts = [...this.state.products]
            let tempCart = JSON.parse(localStorage.getItem('cart'))
            let newProducts = tempProducts.map(
                function(el) {
                if(tempCart.length > 0){ 
                if (tempProducts.some(el => el.id === tempCart[0].id)){
                    let elemntFound = tempProducts.find(x => x.id === tempCart[0].id)
                    elemntFound.inCart = true
                    elemntFound.count = tempCart[0].count
                    elemntFound.total = tempCart[0].total
                    tempCart.splice(0,1)
                } else {
                    el.inCart = false
                    el.count = 0
                    el.total = 0
                }
            }
                return el
              })
              this.setState(()=>{
                return {products: newProducts}
            })
            console.log("products from loadProducts after loop:   ")
            console.log(this.state.products)
        })
        .catch(error =>{
            console.log("Error retreiving products!!");
            console.log(error);
        })
    }

    loadOrders = () => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        axios.get(`/marketcom/order/index?userId=${userId}`)
             .then(response =>{
            this.setState(()=>{
                        return {orders: response.data}
                    })
            
            console.log("orders from loadOrders:   ")
            console.log(this.state.orders)
        })
        .catch(error =>{
            console.log("Error retreiving orders!!");
            console.log(error);
        })
    }


    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product; 
    }

    addOrder = (details, data) => {
        const storedCart  = JSON.parse(localStorage.getItem('cart'));
        const params = JSON.stringify({
            "orderId": data.orderID,
            "payerId": data.payerID,
            "paymentId": data.paymentID,
            "billingToken": "ammola",
            "facilitatorAccessToken": data.facilitatorAccessToken,
            "amount": details.purchase_units[0].amount.value
            });
        const userId = JSON.parse(localStorage.getItem('userId'))
        const url = `marketcom/order/add?userId=${userId}`
        axios.post(url, params,{
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            
            })
            .then(response => {
                console.log(response);
                this.addProductsToOrder(response.data.id)               
                })
                
                .catch(error => {
                console.log(error);
                });
    }

    addSingleProductToOrder = (product) => {
        console.log("addSingleProductToOrder")
        const params = JSON.stringify({
            "quantity": product.count,
            "productTotal": product.total
            });
        console.log("product.id")
        console.log(product.id)
        console.log("orderId")
        console.log(this.state.orderId)
        const url = `marketcom/product-to-order/add?productId=${product.id}&orderId=${this.state.orderId}`
        axios.post(url, params,{
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            
            })
            .then(response => {
                console.log(response);
                
                })
            .catch(error => {
                console.log(error);
                });
        }

    addProductsToOrder = (orderId) => {
        this.setState(()=>{
            return {orderId: orderId}
        }) 
        console.log("addProductsToOrder")
        console.log(orderId)
        const storedCart  = JSON.parse(localStorage.getItem('cart'));
        console.log("storedCart  ")
        console.log(storedCart)
        storedCart.forEach(this.addSingleProductToOrder);
        this.clearCart()
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct:product}
        })
        localStorage.setItem('detailProduct', JSON.stringify(product));
        
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.productPrice;
        product.total = price;
        this.setState(() =>{
            return {cart:[...this.state.cart, product]}
        }, ()=>{this.addTotals()
                console.log("ADD TO CART")
                localStorage.setItem('cart', JSON.stringify(this.state.cart));
        })
    }

    openModel = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modelProduct:product,modelOpen:true}
        })
    }

    closeModel = () =>{
        this.setState(()=>{
            return{modelOpen: false}
        })
    }

increment = (id) =>{
    let tempCart =[...this.state.cart]
    const selectedProduct = tempCart.find(item=>item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]
    product.count = product.count + 1
    product.total = product.count * product.productPrice;
    // console.log("typeof product.price")
    // console.log(typeof product.productPrice)
    this.setState(() => {return{cart:[...tempCart]}}, ()=>{this.addTotals()})
    // console.log("cart state after increment:  ")
    // console.log(this.state.cart)
    localStorage.setItem('cart', JSON.stringify(this.state.cart))
}

decrement = (id) => {
    let tempCart =[...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if(product.count === 0){
        this.removeItem(id)
    }else {
        product.total = product.count * product.productPrice;
        this.setState(() => {return{cart:[...tempCart]}}, ()=>{this.addTotals()})
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }
    
}

removeItem = (id) => {
   console.log("hello from removeItem()")
   let tempProducts = [...this.state.products]
   let tempCart =  JSON.parse(localStorage.getItem('cart'))
   
//    console.log("tempProducts:   ")
//    console.log( tempProducts)
//    console.log("tempCart:   ")
//    console.log(tempCart)
//    console.log("id:   ")
//    console.log(id)

   const index = tempCart.indexOf(this.getItem(id))
//    console.log("index of the item to be removed:   "+index)

   tempCart = tempCart.filter(item => item.id !== id)

//    console.log("tempCart after filter:   ")
//    console.log(tempCart)
   //let cart =  JSON.parse(localStorage.getItem('cart'))
   //console.log("cart before splice:  ")
   //console.log(cart)
   //tempCart.splice(index, 1)
   //console.log("cart after splice:  ")
   //console.log(cart)

   localStorage.setItem('cart', JSON.stringify(tempCart))
   const productIndex = tempProducts.indexOf(this.getItem(id))
   let removedProduct = tempProducts[productIndex]
   removedProduct.inCart = false
   removedProduct.count = 0
   removedProduct.total = 0
   this.setState(()=>{
       return{
           cart:[...tempCart],
           products:[...tempProducts]
       }
   }, ()=>{
       this.addTotals();
   })
   
}

clearCart = () => {
    localStorage.setItem('cart',  JSON.stringify([]));
    let tempProducts = [...this.state.products]
    // console.log("tempProducts before the loop:   ")
    // console.log(tempProducts)
    tempProducts.forEach(function(obj) {
        if (obj.inCart) {
            obj.inCart = false        }
    });
    // console.log("tempProducts after the loop:   ")
    // console.log(tempProducts)
    this.setState(() => {
        return { cart: [], 
            products:[...tempProducts] };
    }, () => {
        this.addTotals();
    });
}

addTotals = () => {
    console.log("call addTotals()")
    let subTotal = 0;
    let cart =  JSON.parse(localStorage.getItem('cart'));
    cart.map(item => (subTotal += item.total))
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax
    const totalUSD = Math.round(total * 0.27)
    this.setState(()=>{
        return{
            cartSubTotal: subTotal,
            cartTax: tax,
            cartTotal: total, 
            cartTotalUSD: totalUSD
        }
    })
}

    
    render() {
        return (
              <ProductContext.Provider value={{
                  ...this.state, 
                  handleDetail: this.handleDetail,
                  addToCart: this.addToCart,
                  openModel: this.openModel,
                  closeModel: this.closeModel,
                  increment: this.increment,
                  decrement: this.decrement,
                  removeItem: this.removeItem,
                  clearCart: this.clearCart, 
                  getItem: this.getItem, 
                  loadProductList: this.loadProductList, 
                  addTotals: this.addTotals, 
                  addOrder: this.addOrder, 
                  addProductsToOrder: this.addProductsToOrder, 
                  addSingleProductToOrder: this.addSingleProductToOrder, 
                  loadOrders: this.loadOrders
              }}>
                  {this.props.children}
              </ProductContext.Provider>                
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };