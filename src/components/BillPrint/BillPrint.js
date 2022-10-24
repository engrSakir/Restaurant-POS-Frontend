import React from 'react';
import {forwardRef} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import CartItem from "../CartItem/CartItem";

const BillPrint = forwardRef((props, ref) => {
    //console.log(props.printContent)
    return (
        <div ref={ref}>

                <Row>
                    <Col>
                        <div className="text-center">
                            <h4>{props.printContent.name}</h4>
                            <p>{props.printContent.address}</p>
                        </div>
                    </Col>
                </Row>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.printContent.cart?.map((cartItem, index) => (
                        <tr key={cartItem.unique_key}>
                            <td>{index+1}</td>
                            <td>{cartItem.name}
                            <div>{cartItem.price} X {cartItem.qty}</div>
                            </td>
                            <td>{cartItem.price * cartItem.qty}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>Sub Total: </td>
                        <td>{props.printContent.itemsPrice}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Shipping: </td>
                        <td>{props.printContent.shippingCharge}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Vat: </td>
                        <td>{props.printContent.OrderVat}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Discount: </td>
                        <td>{props.printContent.discountAmount}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Payable Amount: </td>
                        <td>{props.printContent.payableBillAmount}</td>
                    </tr>

                    <tr>
                        <td colSpan={3}>
                            Payment Method
                        </td>
                    </tr>
                    {props.printContent.payAmountByMethod && props.printContent.payAmountByMethod?.map((pay, index) => (
                        <tr key={index}>
                            <td colSpan={2}>{pay.paymentMethod}</td>
                            <td>{pay.paymentAmount}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

        </div>
    )
});

export default BillPrint;
