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
            console.log("true!!!")
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
             cartTotal: 0
        }
        
    }

    componentDidMount(){
        this.loadProductList();
        this.addTotals();
    }

    loadProductList = () => {
        axios.get("/marketcom/product/indexall")
             .then(response =>{
            console.log("response:   ")
            console.log(response)
            this.setState(()=>{
                        return {products: response.data}
                    })

            console.log("products from loadProductList:  ");
            console.log(this.state.products);
            let id = localStorage.getItem('productDetailId');
            console.log("id from local storage: "+id); 
            id = parseInt(id);
            console.log("product from local storage: "); 
            const myProduct = this.getItem(id);
            console.log(myProduct);
        })
        .catch(error =>{
            console.log("Error retreiving products!!");
            console.log(error);
        })
    }


    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
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
                console.log("cart after totals:  ")
                console.log(this.state.cart)
                console.log("product after totals:  ")
                console.log(product)
                console.log("product state after totals:  ")
                console.log(this.state.products)
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
    product.count = product.count +1
    product.total = product.count * product.productPrice;
    console.log("typeof product.price")
    console.log(typeof product.productPrice)
    this.setState(() => {return{cart:[...tempCart]}}, ()=>{this.addTotals()})
    console.log("cart state after increment:  ")
    console.log(this.state.cart)
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
   let tempProducts = [...this.state.products];
   let tempCart = [...this.state.cart];

   tempCart = tempCart.filter(item => item.id !== id);
   const index = tempProducts.indexOf(this.getItem(id));
   let cart =  JSON.parse(localStorage.getItem('cart'));
   cart.splice(index, 1);
   localStorage.setItem('cart', JSON.stringify(cart));
   let removedProduct = tempProducts[index];
   removedProduct.inCart = false;
   removedProduct.count = 0;
   removedProduct.total = 0;
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
    this.setState(() => {
        return { cart: []};
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
    this.setState(()=>{
        return{
            cartSubTotal: subTotal,
            cartTax: tax,
            cartTotal: total
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
                  addTotals: this.addTotals
              }}>
                  {this.props.children}
              </ProductContext.Provider>                
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };