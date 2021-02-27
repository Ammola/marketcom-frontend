import React, { Component } from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Editprofile from './editProfile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Shop from './Shop/Shop'
import {Row, Col, Card, Form, InputGroup, FormControl, Button,CardGroup} from 'react-bootstrap';
import img1 from '../../assets/Male-user-edit-icon.png'
import img2 from '../../assets/77c366436d8bd35fe8b3ce5b8c66992e.png'




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
          <CardGroup style={{  padding:'2%', width: '50%', float: 'none',
    margin: '0 auto' }} >
          <Card >
  <Card.Img variant="top" src={img1} />
  <Card.Body>
    <Card.Title>Edit Profile</Card.Title>
    <Link to="/editprofile" className="btn btn-warning"><FontAwesomeIcon icon={faSignInAlt} /> Edit Profile</Link>

    
  </Card.Body>
</Card>
{(this.state.user2.userRole === "ROLE_OWNER") ?
<Card >
  <Card.Img variant="top" src={img2} />
  <Card.Body>
    <Card.Title>Shop Option</Card.Title>
               <Link  to={"shop"} className="btn btn-warning"><FontAwesomeIcon icon={faSignInAlt} /> Shop</Link>
  </Card.Body>
</Card>:null}
</CardGroup>
               
               <Route  path="/editprofile"  component={() =><Editprofile usera={this.state.user2}/>}/>
               <Route  path="/shop"  component={() =><Shop usera={this.state.user2} />}/>
               


     
      </Router>
    )
  }
}
