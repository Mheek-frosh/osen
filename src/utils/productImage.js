export const productImageStyle=product=>product?.imageUrl
  ? {backgroundImage:`url(${JSON.stringify(product.imageUrl)})`,backgroundSize:'cover',backgroundPosition:'center'}
  : undefined;
