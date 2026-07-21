import { Link } from 'react-router-dom';
import { formatNaira } from '../data/products';
import { useCart } from '../context/CartContext';
import { productImageStyle } from '../utils/productImage';

export default function ProductCard({product}){
  const {addItem}=useCart();
  return <article className="product-card">
    <div className={`product-image sheet ${product.image||''}`} style={productImageStyle(product)}>
      {product.badge&&<span className="tag">{product.badge}</span>}
      <Link className="product-hit" to={`/product/${product.id}`} aria-label={`View ${product.name}`}/>
      <button className="quick-add" onClick={()=>addItem(product.id)}>Quick add</button>
    </div>
    <div className="product-info"><div><h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3><p>{product.material}</p></div><strong>{formatNaira(product.price)}</strong></div>
  </article>;
}
