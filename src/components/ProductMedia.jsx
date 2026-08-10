import {sanityImageUrl} from '../lib/sanity'

export default function ProductMedia({product, as: Element = 'div', className = '', width = 900, height = 1100, style, ...props}) {
  const localImageClass = typeof product?.image === 'string' ? product.image : ''
  const remoteImage = typeof product?.image === 'object' ? sanityImageUrl(product.image, width, height) : ''
  const backgroundStyle = remoteImage ? {
    backgroundImage: `url("${remoteImage}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  } : undefined

  return <Element
    className={`${className} sheet ${localImageClass}`.trim()}
    style={{...backgroundStyle, ...style}}
    {...props}
  />
}
