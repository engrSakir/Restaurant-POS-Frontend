import React, { useState } from 'react';

const OrderSummary = ({cart}) => {

   const itemsPrice = cart.reduce((count, object) => count + object.price * object.qty, 0);

    return (
        <div>
            <h4 className='text-center'>Total {itemsPrice}</h4>
        </div>
    );
};

export default OrderSummary;