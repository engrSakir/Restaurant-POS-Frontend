import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import ProductItem from '../ProductItem/ProductItem';

const VariationProductModal = ({show, setShow, variationProduct, handleCart}) => {
  const {name, category_wise_items} = variationProduct
  //  console.log(variationProduct);
  const handleClose = () => setShow(false);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="product-wrapper variation-product-grid">
                {category_wise_items?.map((product) => <ProductItem product={product} key={product.unique_key} handleCart={handleCart}></ProductItem>)}
              </div>           
            </Modal.Body> 
          </Modal>
        </div>
    );
};

export default VariationProductModal;
