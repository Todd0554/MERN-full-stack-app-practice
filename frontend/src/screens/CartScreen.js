import React, {useEffect } from 'react'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
    Row, 
    Col, 
    Image, 
    ListGroup, 
    Card, 
    Button,
    Form
  } from 'react-bootstrap'
import {addToCart, removerFromCart} from '../actions/cartActions'
import Message from '../components/Message'



const CartScreen = () => {
    const productID = useParams().id;
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state) => state.cart)
    const { search } = useLocation();
    const navigate = useNavigate()
    
    const qty = search ? Number(search.split("=")[1]) : 1;
    
    useEffect(() => {
      if (productID) {
        dispatch(addToCart(productID, qty))
      }
    }, [dispatch, productID, qty])
    
    const removeFromCartHandler = (id) => {
      dispatch(removerFromCart(id))
    }

    const checkoutHandler = () => {
      navigate('/login?redirect=shipping')
    }

    return (
      <Row>
        <Col md={8}>
          <h1>Cart</h1>
          {cartItems.length === 0 ? 
          (<Message>
            Cart is empty
            <Link to='/'>Back to Homepage</Link>
           </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>
                        {item.price}
                      </Col>
                      <Col md={2}>
                        <Form.Select 
                          
                          value={item.qty} 
                          onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map(i => (<option key={i+1} value={i+1}>{i+1}</option>))}
                        </Form.Select>
                      </Col>
                      <Col>
                        <Button
                          type='button'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>There are ({cartItems.reduce((acc, item) => acc+ item.qty, 0)}) items in your cart</h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className="btn btn-dark col-12" type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>PAY ALL</Button>
                  </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
  };

export default CartScreen