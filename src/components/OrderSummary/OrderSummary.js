import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import './OrderSummary.scss';

const OrderSummary = ({cart, more}) => {
//    const {payment_methods, tables, waiters} = more;
//    console.log(more.payment_methods)
   const payment_methods = [{id:1, name: 'Cash'}, {id:2, name: 'bKash'},  {id:3, name: 'Card'}, {id:4, name: 'Rocket'}];

   const itemsPrice = cart.reduce((count, object) => count + object.price * object.qty, 0);
   const OrderVat = itemsPrice * 0.10;
   const shippingCharge = 30;


   const { register, handleSubmit, watch, formState: { errors } } = useForm();

   const onSubmit = data => console.log(data);

  

 const selectedPayMode = watch ('paymentMethods')

    return (
        <div>
            <h4 className='text-center mb-3'>Total {itemsPrice}</h4>
            {/* <p>{config.logo}</p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='payment-methods'>
                {payment_methods.map((payMode)=> (
                   <div className='payment-input-wrapper' key={payMode.id}> 
                     <input
                        id={payMode.id} 
                        type="checkbox"
                        value={payMode.name}
                        {...register("paymentMethods")} 
                    />
                    <label htmlFor={payMode.id}>{payMode.name}</label>
                    { selectedPayMode && selectedPayMode.includes(payMode.name)&& (
                        <input className='form-control form-control-sm' type="text" {...register(payMode.name)} />
                    )}
                   </div>
                ))}
               </div>
               {/* {payment_methods.map((payMode)=> (
                    selectedPayMode && selectedPayMode.includes(payMode.name)? (
                        <div>
                        <label>{payMode.name}</label>
                        <input type="text" {...register(payMode.name)} />
                    </div>
                    ) : ""
                ))} */}
       
                <Row>
                    <Col>
                    <label htmlFor="">Table Number</label>
                    <select {...register("tablesNumber")} className="form-select my-2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    </Col>
                    <Col>
                    <label htmlFor="">Waiters Name</label>
                    <select {...register("waitersName")} className="form-select my-2">
                        <option value="Waiter-1">Waiter-1</option>
                        <option value="Waiter-2">Waiter-2</option>
                        <option value="Waiter-3">Waiter-3</option>
                    </select>
           
                    </Col>
                </Row>
             
                
     
                <input type="submit" className="btn btn-secondary my-2 w-100" />
            </form>
        </div>
    );
};

export default OrderSummary;