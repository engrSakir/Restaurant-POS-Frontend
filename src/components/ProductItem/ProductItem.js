import React from 'react';
import taka from './../../assets/img/taka.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const ProductItem = ({product, handleCart}) => {
    return (
      
        <div className="product-item" key={product.unique_key}>
            <div className="product-item-inner" onClick={() => handleCart(product)}>
                <div className="product-thumb">
                    {product.image? <img src={product.image} alt=""/>: <img src="https://via.placeholder.com/60" alt="" />} 
                </div>
                <div className="product-info">
                    <h3>{product.unique_key} - {product.name} </h3>  
                    <p> {!product.multiple?  <><img src={taka} alt="" /> <span>{product.price}</span> </>:  <FontAwesomeIcon icon={faBoxOpen} />} {product?.sub_category? '-' + product.sub_category : ""}</p>
                    
                </div>
            </div> 
        </div>
        
    );
};

export default ProductItem;