import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({cart}) => {
    // console.log(cart);
    return (
        <div className='cart-item'>
           <div>
           {cart.image? <img src={cart.image} alt=""/>: <img src="https://via.placeholder.com/60" alt="" />} 
           </div>
            <div>
                <h6 className='m-0'>{cart.name}</h6>
                <p className='m-0'>{cart.price}</p>
             </div>
             <div>
                <div className='qty-counter'>
                    <div>
                        <button><FontAwesomeIcon icon={faMinus} /></button>
                    </div>
                    <div>
                        <input type="number" readOnly value={cart.qty} />
                    </div>
                    <div>
                        <button><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                </div>
             
             </div>
        </div>
    );
};

export default CartItem;