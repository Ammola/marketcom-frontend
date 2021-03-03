import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class OrderProduct extends Component {
  render() {
    const { id, quantity, productTotal } = this.props.product;
    //const myImg = require(img); 
    //var imageName = require(img);
    return (
      <table className="table">
        <tbody>
          <tr>
            <td>{id}</td>
            <td style={{ width: '50%' }}>{quantity} pieces</td>
            <td style={{ width: '50%' }}>{productTotal} USD</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

