import React from "react"
import { connect } from "react-redux"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { Container, Row, Col, Table, Button, Form, Card, Modal, Tab, Sonnet, Nav } from "react-bootstrap";
import { IoMdAddCircle } from 'react-icons/io';
import { AiFillMinusCircle } from 'react-icons/ai';
import { Increment, Decrement, DeleteCart } from "../action/CartAction"

function Order(props) {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function incr(id) {
        console.log(id)
        props.Increment(id)
    }

    function decr(id) {
        console.log(id)
        props.Decrement(id)
    }

    function Delete(id) {
        props.DeleteCart(id)
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
                <td>{finalRate * value.count} $</td>
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
            <tr align="center"> <td colspan="8"> Total Quantity:{props.TotalCount}</td></tr>
            <tr align="center"> <td colspan="8">
                <Button className="btn btn-primary mt-2" onClick={handleShow}>Proceed</Button>
            </td></tr>
        </Table>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Payment Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={5}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Credit/Debit Card</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Net banking</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">UPI</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Cash On Deleviery </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={7}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Card Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter email"
                                            />

                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Name On Card</Form.Label>
                                            <Form.Control type="text" placeholder="Password"

                                            />
                                        </Form.Group>

                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h4>Select bank</h4>
                                    <img
                                        className="d-block w-100"
                                        src="img/bankLogo.jpg"
                                    />

                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <Form >
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Enter Your UPI ID</Form.Label>
                                            <Form.Control type="text" placeholder="UPI ID"
                                            />

                                        </Form.Group>



                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <h3>Cash On Deleivery</h3>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer>

                <Link to="/Paymentdone">  <Button variant="primary" >
                    PAY  SECURELY
                    </Button></Link>
            </Modal.Footer>
        </Modal>


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

export default connect(mapstatetoprops, { Increment, Decrement, DeleteCart })(Order)
