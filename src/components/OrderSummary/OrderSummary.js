import React, {useEffect, useRef, useState} from "react";
import {Alert} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons';
import {useReactToPrint} from 'react-to-print';
import "./OrderSummary.scss";
import BillPrint from "../BillPrint/BillPrint";

const OrderSummary = ({cart}) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const payment_methods = [
        {id: 1, name: "Cash"},
        {id: 2, name: "bKash"},
        {id: 3, name: "Card"},
        {id: 4, name: "Rocket"},
    ];
    const discountType = [
        {id: 1, name: "Percent"},
        {id: 2, name: "Fixed"},
    ];

    const itemsPrice = cart.reduce(
        (previousValue, currentValue) =>
            previousValue + currentValue.price * currentValue.qty,
        0
    );
    // const OrderVat = itemsPrice * 0.1;
    const OrderVat = 0;

    let shippingCharge = 0;

    const [placeOrder, setPlaceOrder] = useState();
    const [showOrderDetails, setShowOrderDetails] = useState(false);


    let disabled = true;

    useEffect(() => {
        payment_methods?.map((payMethod) => setValue(payMethod.name, 0));
        setValue('discountPercentAmount', 0);
        setValue('discountFixedAmount', 0);
        setValue('tablesNumber', null);
        setValue('waitersName', null);
    }, []);


    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const selectedPayMode = watch("paymentMethods", []);
    const selectedDiscountMode = watch("discountType", []);
    const selectedTablesNumber = watch("tablesNumber");
    const shippingAddress = watch("shippingAddress");
    // console.log(selectedTablesNumber);
    if (selectedTablesNumber === "online") {
        shippingCharge = 30;
    } else {
        shippingCharge = 0;
    }
    const fixedDiscountRecived = 0 + (selectedDiscountMode && selectedDiscountMode.includes("discountFixed")) ? parseInt(watch("discountFixedAmount")) : 0;
    const percentDiscountRecived = 0 + (selectedDiscountMode && selectedDiscountMode.includes("discountPercent")) ? Math.round((itemsPrice * parseInt(watch("discountPercentAmount"))) / 100) : 0;

    const discountAmount = fixedDiscountRecived + percentDiscountRecived;
    const productPriceAfterDiscount = itemsPrice - discountAmount;
    const payableBillAmount = productPriceAfterDiscount + OrderVat + shippingCharge;

    const selectedPaidAmount = 0 +
        selectedPayMode &&
        watch(selectedPayMode, 0).reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0);

    if (payableBillAmount === selectedPaidAmount) {
        disabled = false;
    }
    const setRestAmount = (setDataFor) => {
        const restAmount = payableBillAmount - selectedPaidAmount;
        const existAmount = parseInt(watch(setDataFor));
        setValue(setDataFor, restAmount + existAmount);
    };

    const payAmountByMethod = selectedPayMode && selectedPayMode?.map((pay) => {
        return {
            paymentMethod: [pay],
            paymentAmount: parseInt(watch(pay))
        }
    });
    console.log(payAmountByMethod)
    const printableContent = {
        name: "Minar",
        address: 'lorem more mmvkvmdfalbl',
        cart,
        itemsPrice,
        discountAmount,
        shippingCharge,
        OrderVat,
        payableBillAmount,
        payAmountByMethod,
        shippingAddress,
    }
    const onSubmit = (data) => {
        console.log(data);
        const recivedBillMethod = data.paymentMethods?.map((pay) => {
            return {[pay]: data[pay]}
        });

        console.log(recivedBillMethod);
        handlePrint();
    };

    return (
        <div>
            <div className="d-none">
                <BillPrint ref={componentRef} printContent={printableContent}></BillPrint>
            </div>

            <h5 onClick={() => setShowOrderDetails(!showOrderDetails)}
                className="text-center mb-3"> {itemsPrice} - {discountAmount} = {itemsPrice - discountAmount} <span
                className="text-danger">*</span></h5>
            {showOrderDetails && (
                <div className="order-details">
                    <table className="table table-bordered table-sm table-striped">
                        <tbody>
                        <tr>
                            <td>Product Price</td>
                            <td>{itemsPrice}</td>
                        </tr>
                        <tr>
                            <td>Vat</td>
                            <td>{OrderVat}</td>
                        </tr>
                        {shippingCharge > 0 && (
                            <tr>
                                <td>Shipping</td>
                                <td>{shippingCharge}</td>
                            </tr>
                        )}

                        <tr>
                            <td>Sub Total</td>
                            <td>{itemsPrice + OrderVat + shippingCharge}</td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td>{discountAmount}</td>
                        </tr>
                        </tbody>
                        <tfoot className="bg-light fw-semibold">
                        <tr>
                            <td>Payable Amount</td>
                            <td>{payableBillAmount}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="order-form">
                    <div>
                        <div className="checkbox-input-wrapper">
                            <input id="discount-percent" type="checkbox"
                                   value="discountPercent" {...register("discountType")} />
                            <label htmlFor="discount-percent">Percent</label>
                            {selectedDiscountMode && selectedDiscountMode.includes("discountPercent") && (
                                <>
                                    <input type="number" min={0} max={100}
                                           className="form-control form-control-sm" {...register("discountPercentAmount")}/>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="checkbox-input-wrapper">
                            <input id="discount-fixed" type="checkbox"
                                   value="discountFixed" {...register("discountType")} />
                            <label htmlFor="discount-fixed">Fixed</label>
                            {selectedDiscountMode && selectedDiscountMode.includes("discountFixed") && (
                                <>
                                    <input type="number" min={0}
                                           className="form-control form-control-sm" {...register("discountFixedAmount")}/>
                                </>
                            )}

                        </div>
                    </div>
                    {payment_methods.map((payMode) => (
                        <div className="checkbox-input-wrapper" key={payMode.id}>
                            <input
                                id={payMode.id}
                                type="checkbox"
                                value={payMode.name}
                                {...register("paymentMethods")}
                            />
                            <label htmlFor={payMode.id}>{payMode.name}</label>
                            {selectedPayMode && selectedPayMode.includes(payMode.name) && (
                                <>
                                    <input
                                        type="number"
                                        min={1}
                                        className="form-control form-control-sm"
                                        {...register(payMode.name)}/>
                                    <div
                                        onClick={() => setRestAmount(payMode.name)}
                                        className="set-rest-amount">
                                        <FontAwesomeIcon icon={faHandHoldingDollar}/>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {selectedPaidAmount > payableBillAmount && (
                        <div className="full-width-field">
                            <Alert className="py-2" variant="danger">
                                Paid amount is not valid
                            </Alert>
                        </div>
                    )}

                    <div>
                        <label htmlFor="">Table Number</label>
                        <select {...register("tablesNumber", {required: true})}
                                className="form-select form-select-sm my-1">
                            {/*<option value="" disabled selected>Select</option>*/}
                            <option value="online">Online</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Waiters Name</label>
                        <select {...register("waitersName", {required: true})}
                                className="form-select form-select-sm my-1">
                            {/*<option value="" disabled selected>Select</option>*/}
                            <option value="Waiter-1">Waiter-1</option>
                            <option value="Waiter-2">Waiter-2</option>
                            <option value="Waiter-3">Waiter-3</option>
                        </select>
                    </div>
                    {shippingCharge > 0 && (
                        <div className="full-width-field">
                            <label>Shipping Address</label>
                            <textarea {...register("shippingAddress", {required: true})}
                                      className="form-control form-control-sm"></textarea>
                        </div>
                    )}
                    <div className="full-width-field">
                        <button
                            disabled={disabled}
                            type="submit"
                            className="btn btn-secondary my-2 w-100">
                            pay
                        </button>
                    </div>
                </div>


            </form>
            {/*<button onClick={handlePrint}>Print this out!</button>*/}

        </div>
    );
};

export default OrderSummary;
