import React, { useState } from "react";
import "./Shop.scss";
import { Col, Container, Row } from "react-bootstrap";
import useProducts from "../../hooks/useProducts";

import CartItem from '../CartItem/CartItem';
import VariationProductModal from "../VariationProductModal/VariationProductModal";
import ProductItem from "../ProductItem/ProductItem";

const Shop = () => {
  const [products] = useProducts();
  const [cart, setCart] = useState([]);

  const [show, setShow] = useState(false);
  const [variationProduct, setVariationProduct] = useState({})

  const createShoppingCart = selectedItem => {
    const exist = cart?.find((cartItem) => cartItem.unique_key === selectedItem.unique_key);
    if(exist){
      setCart(cart.map((x) => x.unique_key === selectedItem.unique_key? { ...x, qty: x.qty + 1 } : {...x}))
    } else{
      setCart([ ...cart, {...selectedItem, qty: 1}])
    } 
  }

 
  const handleCart = product => {    
      if(!product.multiple){        
        createShoppingCart(product)
      } else{
        setShow(true);
        setVariationProduct(product)
      }
  }

  const incDecHandle = (operationType, operationalProductID) => {
    if(operationType === "increment"){
      setCart(cart.map((x) => x.unique_key === operationalProductID? { ...x, qty: x.qty + 1 } : {...x}))
    }else{
      setCart(cart.map((x) => x.unique_key === operationalProductID && x.qty > 1? { ...x, qty: x.qty - 1 } : {...x}))
    }
  }

  
  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg="9">
            <div className="product-wrapper main-product-grid">
              {products.map((product) => <ProductItem key={product.unique_key} product={product} handleCart={handleCart}></ProductItem>)}
            </div>
          </Col>
          <Col lg="3">

           <div className="cart-wrapper"> 
              {cart?.map((cartItem)=> <CartItem key={cartItem.unique_key} cart={cartItem} incDecHandle={incDecHandle}> {cartItem.name}</CartItem>)}
           </div>
          </Col>
        </Row>
      </Container>
      <VariationProductModal show={show} setShow={setShow} variationProduct={variationProduct} handleCart={handleCart}></VariationProductModal>
    </div>
  );
};

export default Shop;
