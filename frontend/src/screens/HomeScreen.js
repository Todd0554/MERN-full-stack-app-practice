import React from 'react'
import {Row, Col} from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
        <h1>New Products</h1>
        <Row>{ products.map(product => {
            return (
                <Col sm={12} md={6} lg={3}>
                    <Product product={product} />
                </Col>
            )
        })}
        </Row>
    </>
  )
}

export default HomeScreen