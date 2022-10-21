import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {
    Button,
    Row, 
    Col,
    Form
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {logIn} from '../actions/userActions'
import FormContainer from '../components/FormContainer'



const LogInScreen = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogIn = useSelector((state) => state.userLogIn)
    const {loading, error, userInfo} = userLogIn
    
    const {search} = useLocation()

    const redirect = search ? search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(logIn(email, password))
    }

  return (
    <FormContainer>
        <h1>Log In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
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
            <Button type="submit" variant='primary'>Log In</Button>
        </Form>
        <Row className="py-3">
            <Col>
                New user? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LogInScreen