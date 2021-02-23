import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Editprofile from './editProfile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Shop from './Shop/Shop'


export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infouser:props.user1,
            user2:''
         }
         this.load=this.load.bind(this);

    }
    async componentDidMount() {
       
             this.load();
            
    }
     load(infouser){
        axios.get("/marketcom/user/profile",
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }})
        .then(response =>{
            console.log(response)
            this.setState({
              infouser: response.data,
              user2:response.data,
            })
        })
        .catch(error =>{
            console.log("Error retreiving Authors !!");
            console.log(error);
        })
    }
    
    
  render() {
      
    return (
        <Router>
      
               <Link  to={"editprofile"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Edit Profile</Link>
               {(this.state.user2.userRole === "ROLE_OWNER") ?
               <Link  to={"shop"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Shop</Link>:null}
               <Route  path="/editprofile"  component={() =><Editprofile usera={this.state.user2}/>}/>
               <Route  path="/shop"  component={() =><Shop usera={this.state.user2} />}/>
               


     
      </Router>
    )
  }
}
