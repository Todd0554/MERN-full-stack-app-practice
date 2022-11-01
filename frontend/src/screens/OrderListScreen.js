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
import {listOrders} from '../actions/orderActions'
import {ORDER_LIST_RESET} from '../contents/orderContents'

const OrderListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const {loading, error, orders} = orderList

    const userLogIn = useSelector((state) => state.userLogIn)
    const {userInfo} = userLogIn

    const deleteHandler = (e) => {
    }

    useEffect(() => {
        dispatch({type: ORDER_LIST_RESET})
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [dispatch, navigate, userInfo])

  return (
    <>
        <Row>
            <Col><h1>Orders List</h1></Col>
        </Row>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr style={{textAlign: 'center'}}>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Post</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr style={{textAlign: 'center'}} key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid 
                                ? (order.paidAt.substring(0,10)) 
                                : (<i className="fas fa-times" style={{color:'red'}}></i>
                                )
                            }</td>
                            <td>{order.isDelivered 
                                ? (order.paidAt.substring(0,10)) 
                                : (<i className="fas fa-times" style={{color:'red'}}></i>
                                )
                            }</td>

                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>Check order</Button>    
                                </LinkContainer>
                                {/* <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(order._id)}><i className="fas fa-trash"></i></Button>   */}
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default OrderListScreen