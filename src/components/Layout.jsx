import { Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from './Header';
import Footer from './Footer';
export default function Layout(){const {toast}=useCart();return <><Header/><main><Outlet/></main><Footer/><div className={`toast ${toast?'show':''}`} role="status">{toast}</div></>}
