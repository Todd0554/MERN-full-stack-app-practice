import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
    Button,
    Row, 
    Col,
    Form
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserProfile, updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../contents/userContents'

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
    const {loading, error, user} = userDetails
    
    const userLogIn = useSelector((state) => state.userLogIn)
    const {userInfo} = userLogIn

    const updateDetails = useSelector((state) => state.updateDetails)
    const {success} = updateDetails


    useEffect(() => {
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
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
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
        </Col>
    </Row>
  )
}

export default ProfileScreen