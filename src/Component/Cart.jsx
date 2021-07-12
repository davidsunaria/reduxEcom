import React from "react"
import { connect } from "react-redux"
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { IoMdAddCircle } from 'react-icons/io';
import { AiFillMinusCircle } from 'react-icons/ai';
import { Increment, Decrement, DeleteCart } from "../action/CartAction"

function Cart(props) {

    const [SubCount, setcount] = React.useState(0)
    const [SubTotal, settotal] = React.useState(0)



    function incr(id) {
        console.log(id)
        props.Increment(id)
        makeTotal()
    }

    function decr(id) {
        console.log(id)
        props.Decrement(id)
        makeTotal()
    }

    function Delete(id) {
        props.DeleteCart(id)
        makeTotal()
    }

    function proceed() {

        if (props.login == false) {
            props.history.push("/login")
        }
        else {
            props.history.push("/Order")
        }
    }

    function makeTotal() {
        let subtotal = 0
        let subcount = 0
        props.List.forEach((singleData) => {
            console.log(singleData.Price)
            subtotal = subtotal + singleData.Price
            subcount = subcount + singleData.count
        })


        setcount(subcount)
        settotal(subtotal)

    }




    let cartproducts = props.List.map((value) => {
        let deductAmount = (value.Price * parseInt(value.Discount)) / 100
        let finalRate = value.Price - deductAmount
        console.log(deductAmount)
        return <>
            <tr key={value.id} align="center">
                <td><img src={value.imageUrl} width="100px" height="100" /></td>
                <td>{value.Title}</td>
                <td style={{ textDecoration: "line-through" }}>{value.Price} </td>
                <td >{value.Discount} </td>
                <td>{finalRate} </td>
                <td>
                    <span style={{ cursor: "pointer" }} onClick={() => {
                        decr(value.id)
                    }}>< AiFillMinusCircle /></span>

                    {value.count}
                    <span style={{ cursor: "pointer" }} onClick={() => {
                        incr(value.id)
                    }}><IoMdAddCircle /></span>
                </td>
                <td>{finalRate * value.count} </td>
                <td> <button className="btn btn-danger" onClick={() => {
                    Delete(value.id)
                }}>delete</button>   </td>
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
                    <th>Discount</th>
                    <th>With Discount</th>
                    <th>Quantity</th>
                    <th>Amount per Item</th>
                    <th>
                    </th>
                </tr>

            </thead>
            <tbody>
                {cartproducts}
            </tbody>

            <tr align="center"> <td colspan="8" className="font-weight-bold"> Total Quantity:{SubCount} <br />  Total Price:{SubTotal}</td></tr>
            <tr align="center"> <td colspan="8">
                <Button className="btn btn-primary mt-2" onClick={proceed}>Proceed</Button>
            </td></tr>
        </Table>
    </Container>

}

function mapstatetoprops(state) {
    //  console.log("cart component", state.cartReducer.Cart)
    return {
        List: state.cartReducer.Cart,
        TotalCount: state.cartReducer.SubCount,
        login: state.visitorReducer.visitorlogin
    }
}

export default connect(mapstatetoprops, { Increment, Decrement, DeleteCart })(Cart)
