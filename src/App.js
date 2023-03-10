import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import {
  Navbar,
  Products,
  Cart,
  CheckOut,
  RegisterForm1,
  RegisterForm2,
  Addresscheckout,
  SignIn,
  ForgotPassword,
  SendEmail,
  CheckOutHistory,
} from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

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
      <HashRouter basename={'/zZ-Commerce'}>
        <CssBaseline />
        <Switch>
          <Route exact path='/'>
            <SignIn />
          </Route>
          <Route path='/signup'>
            <RegisterForm1 />
          </Route>
          <Route path='/forgotpassword'>
            <ForgotPassword />
          </Route>
          <Route path='/personalinfo'>
            <RegisterForm2 />
          </Route>
          <Route path='/shop'>
            <Navbar
              totalItems={cart.total_items}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route path='/cart'>
            <Navbar
              totalItems={cart.total_items}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route path='/checkout'>
            <CheckOut cart={cart} />
          </Route>
          <Route path='/address'>
            <Addresscheckout
              refreshCart={refreshCart}
              cart={cart}
              products={products}
            />
          </Route>
          <Route path='/sendemail'>
            <SendEmail />
          </Route>
          <Route path='/checkouthistory'>
            <CheckOutHistory />
          </Route>
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
