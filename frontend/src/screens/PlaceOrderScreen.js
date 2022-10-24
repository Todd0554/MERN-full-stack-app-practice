import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Image, Card, List, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'


const PlaceOrderScreen = () => {
    const {postalAddress, paymentMethod, cartItems} = useSelector((state) => state.cart)
    const cart = useSelector((state) => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num*100) / 100).toFixed(2)
    }

    cart.productsPrice = addDecimals(cartItems.reduce((acc, p) => acc + p.price * p.qty, 0))
    cart.postalPrice = addDecimals(cart.productsPrice > 1500 ? 0 : 10)
    cart.totalPrice = addDecimals(cartItems.reduce((acc, p) => acc + p.price * p.qty, 0) + (cart.productsPrice > 1500 ? 0 : 10))

    const placeOrderHandler = (e) => {
        e.preventDefault()
    }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Address</h2>
                        <p>
                            <strong>Postal Address: </strong>
                            {postalAddress.address}, {postalAddress.suburb}, {postalAddress.postcode}, {postalAddress.state}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment</h2>
                        <strong>Payment Method: </strong>
                        {paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <h2>Product</h2>
                    {cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                        <ListGroup>
                            {cartItems.map((p, i) => (
                                <ListGroup.Item key={i}>
                                    <Row>
                                        <Col md={1}>
                                            <Image 
                                                src={p.image}
                                                alt={p.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col>
                                            <Link to={`/products/${p.product}`}>{p.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                           {p.qty} X {p.price} = ${p.qty * p.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )
                    }
                </ListGroup.Item>
                </ListGroup>
                
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Total: </h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Products price: </Col>
                                <Col>${cart.productsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Postal price: </Col>
                                <Col>${cart.postalPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total price: </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                            <ListGroup.Item>
                                <Button 
                                    type='button'
                                    className='col-12'
                                    onClick={placeOrderHandler} 
                                    disabled={cartItems.length === 0}>Submit Order</Button>
                            </ListGroup.Item>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen