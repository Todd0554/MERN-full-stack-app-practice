import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Button,
    Form
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {savePostalAddress} from '../actions/cartActions'
import FormContainer from '../components/FormContainer'


const ShippingScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {postalAddress} = useSelector((state) => state.cart)
  
  const [address, setAddress] = useState(postalAddress.address)
  const [state, setState] = useState(postalAddress.state)
  const [postcode, setPostcode] = useState(postalAddress.postcode)
  const [city, setCity] = useState(postalAddress.city)
  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePostalAddress({address, city, state, postcode}))
    navigate('/payment')
  }
  return (
    <FormContainer>
        <h1>Postal Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Detailed Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="example: 3/10 Nelson Street"
              value={address || ''}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="example: Melbourne"
              value={city || ''}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="example: Vic"
              value={state || ''}
              required
              onChange={(e) => setState(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="postcode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="example: 3130"
              value={postcode || ''}
              required
              onChange={(e) => setPostcode(e.target.value)}
            />
          </Form.Group>
            <Button type="submit" variant="primary">
              Next
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen