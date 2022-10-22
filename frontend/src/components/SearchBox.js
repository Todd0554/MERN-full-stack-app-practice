import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Form,
    Button
} from 'react-bootstrap'


const SearchBox = () => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }
  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control 
            type="search" 
            name='q' 
            className="me-2"
            aria-label="Search"
            onChange={(e) => {setKeyword(e.target.value)}} 
            placeholder="search..."
        ></Form.Control>
        <Button type="submit" variant='outline-success' className='p-2'>search</Button>
    </Form>
  )
}

export default SearchBox