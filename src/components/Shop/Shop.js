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
    const cartItem = {
      'unique_key': selectedItem.unique_key,
      'name': selectedItem.name,
      'image': selectedItem.image,
      'price': selectedItem.price, 
      'qty': 1,
    } 
    // console.log(selectedItem);
   
    if(cart.length > 0){ 
      const restElement = cart.filter((elem)=> elem.unique_key !== selectedItem.unique_key);
      for (let index = 0; index < cart.length; index++) {
          const element = cart[index];
        if (element.unique_key === selectedItem.unique_key) {
          const updatedItem = element;
          updatedItem.qty = updatedItem.qty + 1; 
          setCart([...restElement, updatedItem]);
          // console.log(restElement);
          // console.log("checked! and exist");
          return
        } else{
          setCart([...cart, cartItem]);
          // console.log("checked! but not exist");
        }
      }
     
    } else{
      setCart([...cart, cartItem]);
      // console.log("not checked!");
    }
    // console.log(cart);
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
    // console.log(operationType, operationalProductID, "++");
    const restElement = cart.filter((elem)=> elem.unique_key !== operationalProductID);
    // console.log(restElement);
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
    if (element.unique_key === operationalProductID) {
      const updatedItem = element;
      if(operationType === 'decrement' && updatedItem.qty > 1){
        updatedItem.qty = updatedItem.qty - 1; 
      } 
      if(operationType === 'increment') {
        updatedItem.qty = updatedItem.qty + 1; 
      }
      
      setCart([...restElement, updatedItem]);
      // console.log(restElement);
      // console.log("Update");
      return
    } 
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
