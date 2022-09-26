import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
const CartItem = ({cart, incDecHandle, updateQuantity, removeCartItem}) => {
    return (
        <div className='cart-item'>
           <div className='cart-thumb'>
               <div className="cart-thumb-inner">
                    <button onClick={()=> {removeCartItem(cart.unique_key)}} ><FontAwesomeIcon  icon={faTrash} /></button>
                   {cart.image? <img src={cart.image} alt=""/>: <img src="https://via.placeholder.com/60" alt="" />}
               </div>
           </div>
            <div className='cart-product-info'>
                <h6 className='m-0'>{cart.name}</h6>
                <p className='m-0'> {cart.price} x {cart.qty} = {cart.price * cart.qty}</p>
             </div>
             <div className='cart-qty-handeler'>
                <div className='qty-counter'>
                    <div>
                        <button onClick={()=> {incDecHandle('decrement', cart.unique_key)}}><FontAwesomeIcon icon={faMinus} /></button>
                    </div>
                    <div>
                        <input type="number" name={cart.unique_key} onChange={(event)=>updateQuantity( event, cart.unique_key)} value={cart.qty} />
                    </div>
                    <div>
                        <button onClick={()=> {incDecHandle('increment', cart.unique_key)}}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                </div>
             
             </div>
        </div>
    );
};

export default CartItem;
