import React, {useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {
    Button,
    Table,
    Row,
    Col 
} from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts} from '../actions/productActions'
import {deleteProduct} from '../actions/productActions'

const ProductListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList
    const userLogIn = useSelector((state) => state.userLogIn)
    const {userInfo} = userLogIn
    const productDelete = useSelector((state) => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            navigate('/login')
        }
        // eslint-disable-next-line 
    }, [dispatch, navigate, userInfo, successDelete])

    const createProductHandler = () => {

    }

    //delete product
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }
  return (
    <>
        <Row>
            <Col><h1>Products List</h1></Col>
            <Col className="text-right"><Button className="my-3" onClick={createProductHandler}>Create product</Button></Col>
        </Row>
        {loadingDelete && <Loader /> }
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr style={{textAlign: 'center'}}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr style={{textAlign: 'center'}} key={p._id}>
                            <td>{p._id}</td>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${p._id}/edit`}>
                                    <Button variant='light' className='btn-sm'><i className="fas fa-edit"></i></Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(p._id)}><i className="fas fa-trash"></i></Button>                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ProductListScreen