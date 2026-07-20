import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import Search from './pages/Search';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollManager from './components/ScrollManager';

export default function App(){
  return <><ScrollManager/><Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="/checkout" element={<Checkout />} />
  </Routes></>;
}
