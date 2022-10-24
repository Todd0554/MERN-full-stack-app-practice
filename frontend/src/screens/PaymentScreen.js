import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {postalAddress} = useSelector((state) => state.cart)
    if (!postalAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Please select payment method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <i style={{fontSize: '40px'}} className="fa-brands fa-cc-paypal"></i>
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Next
          </Button>
        </Form>
      </FormContainer>
  )
}

export default PaymentScreen