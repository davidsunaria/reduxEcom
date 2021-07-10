import React from "react"
import { connect } from "react-redux"
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { IoMdAddCircle } from 'react-icons/io';
import { AiFillMinusCircle } from 'react-icons/ai';
import { Increment, Decrement } from "../action/CartAction"

function Cart(props) {


    function incr(id) {
        console.log(id)
        props.Increment(id)
    }

    function decr(id) {
        console.log(id)
        props.Decrement(id)
    }


    let cartproducts = props.List.map((value) => {
        return <>
            <tr key={value.id} align="center">
                <td><img src={value.imageUrl} width="100px" height="100" /></td>
                <td>{value.Title}</td>
                <td>{value.Price} $</td>
                <td>
                    <span style={{ cursor: "pointer" }} onClick={() => {
                        incr(value.id)
                    }}><IoMdAddCircle /></span>
                    {value.count}
                    <span style={{ cursor: "pointer" }} onClick={() => {
                        decr(value.id)
                    }}>< AiFillMinusCircle /></span>
                </td>
                <td>{value.Price * value.count} $</td>
                <td> <button className="btn btn-danger" >delete</button>   </td>
            </tr>
        </>
    })




    return <Container className="mt-3">
        <Table striped bordered hover>
            <thead>
                <tr align="center">
                    <th>Product image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount per Item</th>
                    <th>

                    </th>
                </tr>

            </thead>
            <tbody>
                {cartproducts}
            </tbody>
            <tr align="center">Total Quantity:</tr>
            <Button className="btn btn-primary mt-2">Add Address</Button>
        </Table>
    </Container>

}

function mapstatetoprops(state) {
    //  console.log("cart component", state.cartReducer.Cart)
    return {
        List: state.cartReducer.Cart
    }
}

export default connect(mapstatetoprops, { Increment, Decrement })(Cart)
