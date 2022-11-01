import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
    Button,
    Row, 
    Col,
    Form,
    ListGroup,
    Image,
    Card,
    Table,
    
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserProfile, updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../contents/userContents'
import { getOrdersDetails } from '../actions/orderActions'

const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [message, setMessage] = useState("")
    
    // dispatch action
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDetails = useSelector((state) => state.userDetails)
    const {loadingUser, errorUser, user} = userDetails
    
    const ordersDetails = useSelector((state) => state.ordersDetails)
    const {orders, loading, error} = ordersDetails

    const userLogIn = useSelector((state) => state.userLogIn)
    const {userInfo} = userLogIn

    const updateDetails = useSelector((state) => state.updateDetails)
    const {success} = updateDetails


    useEffect(() => {
        if (userInfo) {
            dispatch(getOrdersDetails(userInfo._id))
        }
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name || success) {
                dispatch({type: USER_UPDATE_RESET})
                dispatch(getUserProfile('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({id: user._id, name, email, password}))
    }

  return (
    <Row>
        <Col md={3}>
        <h1>MyHome</h1>
        {success && <Message variant="success">Details updated</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {errorUser && <Message variant='danger'>{errorUser}</Message>}
        {loadingUser && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name: </Form.Label>
                <Form.Control 
                type='name' 
                placeholder='username' 
                value={name} 
                onChange={(e) => {
                    setName(e.target.value);
                }} />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control 
                type='email' 
                placeholder='email address' 
                value={email} 
                onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                type='password' 
                placeholder='insert password' 
                value={password} 
                onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm password: </Form.Label>
                <Form.Control 
                type='password' 
                placeholder='confirm password' 
                value={confirmPassword} 
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }} />
            </Form.Group>
            
            <Button type="submit" variant='primary'>Update</Button>
        </Form>
        </Col>
        
        <Col md={9}>
            <h1>Order</h1>
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr style={{textAlign: 'center'}}>
                        <th>ID</th>
                        
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Post</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr style={{textAlign: 'center'}} key={order._id}>
                            <td>{order._id}</td>
                            
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid 
                                ? (order.paidAt.substring(0,10)) 
                                : (
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>Pay now</Button>    
                                    </LinkContainer>
                                )
                            }</td>
                            <td>{order.isDelivered 
                                ? (order.paidAt.substring(0,10)) 
                                : (<i className="fas fa-times" style={{color:'red'}}></i>
                                )
                            }</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default ProfileScreen