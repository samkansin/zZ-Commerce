import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Card, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {AuthProvider} from './components/Auth';
=======
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
>>>>>>> 882f42d (Update CSS and HTML)
import { Navbar, Products, Cart, CheckOut, RegisterForm1, RegisterForm2, Addresscheckout, SignIn, ForgotPassword, SendEmail, CheckOutHistory } from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
<<<<<<< HEAD
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
=======
>>>>>>> 882f42d (Update CSS and HTML)

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    console.log(item);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <AuthProvider>
<<<<<<< HEAD
    <Router>
      
        <CssBaseline />
        
        <Switch>
          <Route exact path="/">
            <RegisterForm1  />
          </Route>
          <Route exact path="/signin">
            <SignIn/>
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword/>
          </Route>
          <Route path="/personalinfo">
            <RegisterForm2  />
=======
      <Router>
        <CssBaseline />
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <RegisterForm1 />
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/personalinfo">
            <RegisterForm2 />
>>>>>>> 882f42d (Update CSS and HTML)
          </Route>
          <Route exact path="/shop">
            <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
<<<<<<< HEAD
          <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route exact path="/checkout">
            <CheckOut cart={cart}/> 
=======
            <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route exact path="/checkout">
            <CheckOut cart={cart} />
>>>>>>> 882f42d (Update CSS and HTML)
          </Route>
          <Route exact path="/address">
            <Addresscheckout refreshCart={refreshCart} cart={cart} products={products} />
          </Route>
<<<<<<< HEAD
          <Route exact path='/sendemail'>
            <SendEmail />
          </Route>
          <Route exact path='/checkouthistory'>
            <CheckOutHistory />
          </Route>
        </Switch>
      
    </Router>
=======
          <Route exact path="/sendemail">
            <SendEmail />
          </Route>
          <Route exact path="/checkouthistory">
            <CheckOutHistory />
          </Route>
        </Switch>
      </Router>
>>>>>>> 882f42d (Update CSS and HTML)
    </AuthProvider>
  );
};

export default App;
