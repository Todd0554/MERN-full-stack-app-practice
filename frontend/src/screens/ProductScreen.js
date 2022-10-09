import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import {
  Row, 
  Col, 
  Image, 
  ListGroup, 
  Card, 
  Button
} from 'react-bootstrap'

import Rating from '../components/Rating'

const ProductScreen = () => {
  const {id} = useParams()
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      
      const {data} = await axios.post(`/api/product/${id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [id])

  


  return (
    
    <>
      <Link className="btn btn-dark my-3" to="/">Back</Link>
      <Row>
        <Col md={12} lg={6}><Image src={product.image} alt={product.name} fluid/></Col>
        <Col id="show-group" md={12} lg={3}>
          <ListGroup >
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item id="product-description">
              Description: ${product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={12} lg={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Storage:</Col>
                  <Col>{product.countInStock > 0 ? product.countInStock : "Out of stock"}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-dark col-12' type="button" disabled={product.countInStock === 0}>Add to cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen