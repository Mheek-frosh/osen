import { Link } from 'react-router-dom';
import { ArrowUpRight } from '../components/Icons';
export default function NotFound(){return <section className="not-found section-pad"><p className="eyebrow">404 · Osen Luxe</p><h1>Not found.</h1><p>The page you are looking for has moved or no longer exists.</p><Link className="btn btn-dark" to="/">Return home <ArrowUpRight/></Link></section>}
