import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Footer from "./components/Footer";
import Header from "./components/Header";

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LogInScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfiledScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {

  return (
      <Router>
          <Header />
          <main className='py-3'>
            <Container>
                <Routes>
                  <Route path='/login' element={<LogInScreen />}/>
                  <Route path='/register' element={<RegisterScreen />}/>
                  <Route path='/shipping' element={<ShippingScreen />}/>
                  <Route path='/payment' element={<PaymentScreen />}/>
                  <Route path='/placeorder' element={<PlaceOrderScreen />}/>
                  <Route path='/profile' element={<ProfiledScreen />}/>
                  <Route path='/' element={<HomeScreen />} exact/>
                  <Route path='/products/:id' element={<ProductScreen />}/>
                  <Route path='/cart/:id' element={<CartScreen />}/>
                  <Route path='/cart' element={<CartScreen />}/>
                  <Route path='/search/:keyword' element={<HomeScreen />} exact/>
                </Routes>
            </Container>
          </main>
          <Footer />
      </Router>
  );
}

export default App;
