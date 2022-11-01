import React, {useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
    Button,
    Table, 
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers, deleteUser} from '../actions/userActions'

import FormContainer from '../components/FormContainer'


const UserListScreen = () => {
    
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userList = useSelector((state) => state.userList)
    const {loading, error, users} = userList
    const userLogIn = useSelector((state) => state.userLogIn)
    const {userInfo} = userLogIn
    const userDelete = useSelector((state) => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, successDelete])

    //delete common user
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }


  return (
    <>
        <h1>Users List</h1>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr style={{textAlign: 'center'}}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr style={{textAlign: 'center'}} key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{
                            user.isAdmin 
                            ? <i className="fas fa-check" style={{color: 'green'}}></i> 
                            : <i className="fas fa-times" style={{color: 'red'}}></i>
                            }</td>
                            <td>
                                {user.isAdmin ? 
                                    <FormContainer>Admin</FormContainer>
                                 : (
                                    <FormContainer>
                                        {/* <LinkContainer to={`/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'><i className="fas fa-edit"></i></Button>
                                        </LinkContainer> */}
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}><i className="fas fa-trash"></i></Button>
                                    </FormContainer>
                                )}

                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default UserListScreen