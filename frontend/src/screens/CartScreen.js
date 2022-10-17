import React, {useEffect, } from 'react'
import {Link, useParams, useNavigate, useLocation, useSearchParams} from 'react-router-dom'
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
  import {addToCart} from '../actions/cartActions'

const CartScreen = () => {
    const productID = useParams().id;
    const { search } = useLocation();
    const [searchParms] = useSearchParams();
    

    const qty = search ? Number(search.split("=")[1]) : 1;
    

    console.log({ productID, qty, qtyParam: Number(searchParms.get("qty")) });

    return (
      <div>
        cart
      </div>
    );
  };

export default CartScreen