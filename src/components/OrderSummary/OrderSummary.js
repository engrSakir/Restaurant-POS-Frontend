import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import "./OrderSummary.scss";

const OrderSummary = ({ cart, more }) => {
  //    const {payment_methods, tables, waiters} = more;
  //    console.log(more.payment_methods)
  const payment_methods = [
    { id: 1, name: "Cash" },
    { id: 2, name: "bKash" },
    { id: 3, name: "Card" },
    { id: 4, name: "Rocket" },
  ];

  const itemsPrice = cart.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.qty,
    0
  );
  const OrderVat = itemsPrice * 0.1;
  const shippingCharge = 30;
  const [placeOrder, setPlaceOrder] = useState();
  let disabled = true;

  useEffect(() => {
    payment_methods?.map((payMethod) => setValue(payMethod.name, 0));
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedPayMode = watch("paymentMethods", []);
  const selectedPaidAmount = 0 +
    selectedPayMode &&
    watch(selectedPayMode, 0).reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue),0);
  if (itemsPrice === selectedPaidAmount) {
    disabled = false;
  }
  const setRestAmount = (setDataFor) => {
    const restAmount = itemsPrice - selectedPaidAmount;
    const existAmount = parseInt(watch(setDataFor));
    setValue(setDataFor, restAmount + existAmount);
  };

  const onSubmit = (data) => {
    console.log(data);
    alert(`Your order placed to ${data.waitersName}`);

    const recivedBillMethod = data.paymentMethods?.map((pay) => {
      return `${pay} - ${data[pay]}`;
    });

    console.log(recivedBillMethod);
  };

  return (
    <div>
      <h5 className="text-center mb-3">Total {itemsPrice} Collected: {selectedPaidAmount}</h5>
      {/* <p>{config.logo}</p> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="payment-methods">
          {payment_methods.map((payMode) => (
            <div className="payment-input-wrapper" key={payMode.id}>
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
                    {...register(payMode.name)}
                  />
                  <div
                    onClick={() => setRestAmount(payMode.name)}
                    className="set-rest-amount"
                  >
                    <FontAwesomeIcon icon={faHandHoldingDollar} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {selectedPaidAmount > itemsPrice && (
          <Alert className="py-2" variant="danger">
            Paid amount is not valid
          </Alert>
        )}

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
        <button
          disabled={disabled}
          type="submit"
          className="btn btn-secondary my-2 w-100"
        >
          pay
        </button>
      </form>
    </div>
  );
};

export default OrderSummary;
