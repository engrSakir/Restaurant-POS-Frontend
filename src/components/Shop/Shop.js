import React, { useEffect, useState } from "react";
import "./Shop.scss";
import { Col, Container, Row } from "react-bootstrap";
import useProducts from "../../hooks/useProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import taka from './../../assets/img/taka.svg';
import CartItem from '../CartItem/CartItem';

const Shop = () => {
  const [products] = useProducts();
  // console.log(products);
  const [cart, setCart] = useState([]);
  const [excistingItem, setExcistingItem] = useState(null);

  const createShoppingCart = selectedItem => {
    const cartItem = {
      'item_id': selectedItem.item_id,
      'name': selectedItem.name,
      'image': selectedItem.image,
      'price': selectedItem.price, 
      'qty': 1,
    } 
    // console.log(cartItem);
   
    if(cart.length > 0){ 
      const restElement = cart.filter((elem)=> elem.item_id !== selectedItem.item_id);
      for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        if (element.item_id === selectedItem.item_id) {
          const updatedItem = element;
          updatedItem.qty = updatedItem.qty + 1; 
          setCart([...restElement, updatedItem]);
          console.log("checked! and exist");

        } else{
          setCart([...cart, cartItem]);
          console.log("checked! but not exist");
        }
      }
     
    } else{
      setCart([...cart, cartItem]);
      console.log("not checked!");
    }
    console.log(cart);
  }

  const handleCart = product => {    
      
      if(!product.multiple){        
        createShoppingCart(product)
      
      } else{
        alert("Select variation!!!")
      }
  }
  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg="9">
            <div className="product-wrapper">
              {products.map((product) => (
                // 
                <div className="product-item" key={product.item_id} onClick={() => handleCart(product)}>
                  <div className="product-item-inner">
                  <div className="product-thumb">
                    {product.image? <img src={product.image} alt=""/>: <img src="https://via.placeholder.com/60" alt="" />} 
                  </div>
                  <div className="product-info">
                    <h3>{product.item_id} - {product.name}</h3>  
                   <p> {!product.multiple?  <><img src={taka} alt="" /> <span>{product.price}</span> </>:  <FontAwesomeIcon icon={faBoxOpen} />}</p>
                  </div>
                  </div> 
                </div>
              ))}
            </div>
          </Col>
          <Col lg="3">
           <div className="cart-wrapper"> 
              {cart?.map((cartItem)=> <CartItem  key={cartItem.item_id} cart={cartItem}> {cartItem.name}</CartItem>)}
           </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
