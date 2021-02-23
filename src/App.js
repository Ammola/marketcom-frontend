import React, { Component } from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import logo from './Mylogo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Model from './components/Model';
import Register from './components/User/Register'
import { decode } from "jsonwebtoken";


function App() {
  return (
   <>
     <Navbar />
     <Switch>
       <Route exact path="/" component={ProductList}/>
       <Route path="/details" component={Details}/>
       <Route path="/cart" component={Cart}/>
       <Route path="/register"  component={Register}/>
       <Route component={Default}/>
     </Switch>
     <Model />
   </>
  );
}

export default App;
