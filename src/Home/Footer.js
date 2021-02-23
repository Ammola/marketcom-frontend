import React, { Component } from 'react'
import "./Footer.css";


export default class Footer extends Component {
  render() {
    return (
        <footer className="footer">
        <div className="container1">
            <div className="d-flex justify-content-between">
                <div className="footer-left">
                    <div className="infoCont">
                    <h3>MARKET.COM</h3>
                    <p>(+966) 344-456-111</p>
                    <br/>
                    <p>from 02:00 to 18:00 working for your joyment</p>
                    </div>
                </div>
                <div className="footer-right">
                <div className="infoCont">
                    <h3>Social networks</h3>
                    <a href="#">
                        <i className="fab fa-linkedin fa-2x mr-3" style={{color: "white"}}></i>
                    </a>
                    <a href="#"><i className="fab fa-facebook-f fa-2x mr-3" style={{color: "white"}}></i></a>
                    <a href="#"><i className="fab fa-twitter fa-2x mr-3" style={{color: "white"}}></i></a>
                    </div>
                </div>
            </div>
            
        </div>
    </footer>
    )
  }
}
