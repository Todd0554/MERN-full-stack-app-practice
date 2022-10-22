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
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'



const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    
    // dispatch action
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, userInfo} = userRegister
    
    const {search} = useLocation()

    const redirect = search ? search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password not match")
        } else {
            dispatch(register(name, email, password))
        }
    }

  return (
    <FormContainer>
        <h1>Register</h1>
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
            <br/>
            <Button type="submit" variant='primary'>Register</Button>
        </Form>
        <Row className="py-3">
            <Col>
                Already registered? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>Log In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen