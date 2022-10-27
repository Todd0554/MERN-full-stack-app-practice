import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
// import { PRODUCT_UPDATE_RESET } from '../contents/productConstents'

const ProductEditScreen = () => {
  const {id: productId} = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails


  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [dispatch, navigate, productId, product])
  
  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch update product
  }

  
  const uploadFileHandler = async (e) => {

  }

  return (
    <FormContainer>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        Back
      </Link>
      <h1>Edit Product</h1>
      {/* {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type='name'
              placeholder='insert product name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price: </Form.Label>
            <Form.Control
              type='number'
              placeholder='insert product price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image: </Form.Label>
            <Form.Check
              type='text'
              placeholder='insert image path'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Check>
            {/* <Form.File
              id='image-file'
              label='select image'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />} */}
          </Form.Group>


          <Form.Group controlId='brand'>
            <Form.Label>Brand: </Form.Label>
            <Form.Control
              type='text'
              placeholder='insert product brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>{' '}
          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='insert count left in stock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category: </Form.Label>
            <Form.Control
              type='text'
              placeholder='insert product category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description: </Form.Label>
            <Form.Control
              type='text'
              placeholder='insert product description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>


          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ProductEditScreen
