import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class Order extends Component {
    render() {
        const { id, orderId, amount } = this.props.order;
        //const myImg = require(img); 
        //var imageName = require(img);
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <td style={{ width: '35%' }}>{orderId}</td>
                        <td style={{ width: '35%' }}>{amount} USD</td>
                        <td  style={{ width: '35%' }}>
                            <a onClick={() => this.props.orderDetail(id)} href="/order/details">Order Details</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

