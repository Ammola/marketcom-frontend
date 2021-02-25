import React, { Component } from 'react';
import {detailProduct } from './data';
import axios from "axios";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products: [],
             detailProduct: {},
             cart: [],
             modelOpen: false,
             modelProduct: {},
             cartSubTotal: 0,
             cartTax: 0,
             cartTotal: 0
        }
    }

    componentDidMount(){
        this.loadProductList();
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

    // setProducts = () => {
    //     let tempProducts = [];
    //     this.loadProductList.forEach(item => {
    //         const singleItem = {...item};
    //         tempProducts = [...tempProducts,singleItem];
    //     })
    //     this.setState(()=>{
    //         return {products: tempProducts}
    //     })
    // }

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
        // let product = getItem(id);
        // axios.post(`/marketcom/product/add?shopId=${id}`,product, 
        // {headers: {'Content-Type': 'application/json',}})
        // .then(response=>{
        //     console.log(response)
        //   })
        //   .catch(error=>{
        //     console.log(error);
        //   })
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        console.log("product from add to cart:    ");
        console.log(product);
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
        })
    }

    // addHandler=(newProduct,id)=>{
    //     axios.post(`/marketcom/product/add?shopId=${id}`,newProduct, 
    //     {headers: {'Content-Type': 'application/json',}})
    //     .then(response=>{
    //       console.log(response)
    //     })
    //     .catch(error=>{
    //       console.log(error);
    //     })
    //   }

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

    productDetail = (id) => {
        console.log(`Hello from product Details ${id}`);
    }

increment = (id) =>{
    let tempCart =[...this.state.cart];
    const selectedProduct = tempCart.find(item=>item.id === id)
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count +1;
    product.total = product.count * product.price;
    this.setState(() => {return{cart:[...tempCart]}}, ()=>{this.addTotals()})
    console.log("cart after increment:  ")
    console.log(this.state.cart)
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
        product.total = product.count * product.price;
        this.setState(() => {return{cart:[...tempCart]}}, ()=>{this.addTotals()})
    }
    
}

removeItem = (id) => {
   let tempProducts = [...this.state.products];
   let tempCart = [...this.state.cart];

   tempCart = tempCart.filter(item => item.id !== id);
   const index = tempProducts.indexOf(this.getItem(id));
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
    this.setState(() => {
        return { cart: []};
    }, () => {
        // this.setProducts();
        this.addTotals();
    });
}

addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total))
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
                  loadProductList: this.loadProductList
              }}>
                  {this.props.children}
              </ProductContext.Provider>                
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };