import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  ListGroup,
  Row,
  Col,
  Image,
  Card,
  Modal,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
    getOrderDetail,
    payOrder,
    deliverOrder,
} from '../actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ORDER_PAY_RESET } from '../contents/orderContents'


const OrderScreen = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()
    const userLogIn = useSelector((state) => state.userLogIn)
    const {userInfo} = userLogIn
    const orderDetail = useSelector((state) => state.orderDetail)
    const {order, loading, error} = orderDetail
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay
    // SDK for PAYPAL
    const [SDK, setSDK] = useState(false)

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num*100) / 100).toFixed(2)
        }
        order.productsPrice = addDecimals(order.orderItems.reduce((acc, p) => acc + p.price * p.qty, 0))
    }



    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult))
    }
    
    useEffect(() => {
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            // use js to directly create the script, this is safe because it will not be shown in browser dom
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true

            script.onload = () => {
                setSDK(true)
            }
            document.body.appendChild(script)
        }
        if (!userInfo) {
            navigate('/login')
        }
        if (!order || order._id !== id || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetail(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSDK(true)
            }
        }
    }, [dispatch, navigate, order, id, successPay, userInfo])

  return (
    loading ? <Loader/> 
    : error ? 
    <Message variant='danger'>{error}</Message>
    : (
    <>
        <h1>Order number: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <strong><h2>Address</h2></strong>
                        <p>Name: {order.user.name}</p>
                        <p>Email: <a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Postal Address: </strong>
                            {order.postalAddress.address}, {order.postalAddress.suburb}, {order.postalAddress.postcode}, {order.postalAddress.state}
                        </p>
                        {order.isDelivered ? (<Message variant="success">Already prepare to post</Message>) : (<Message variant="danger">Haven't prepared to post.</Message>)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment</h2>
                        
                        <p>
                            <strong>Payment Method: </strong>
                            {order.paymentMethod}
                        </p>
                        
                        {order.isPaid ? (<Message variant="success">Already paid</Message>) : (<Message variant="danger">Haven't paid.</Message>)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <h2>Product</h2>
                    {order.orderItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                        <ListGroup>
                            {order.orderItems.map((p, i) => (
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
                                <Col>${order.productsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Postal price: </Col>
                                <Col>${order.postalPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total price: </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {order.paymentMethod === 'PayPal' && (!SDK ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        ></PayPalButton>
                                    )
                                    )}
                                </ListGroup.Item>
                            )}
                                
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>)
  )
}

export default OrderScreen