import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
 
  return (
    <>
      <Link className="ProductCard" to={`/product/${product._id}`}>
            <img
              src={product.images}
              alt={product.name}
              className="ProductImg"
            />
            <p className="productName">{product.name}</p>
            <span className="p__Price">{`${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
            'VND'}).format( product.price)}`}</span>
      
      </Link>
    </>
  );
};

export default ProductCard;
