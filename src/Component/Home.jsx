import React, { useState } from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal, Table } from 'react-bootstrap'
import { connect } from "react-redux"
import { LoadApi } from "../action/adminAction"
import VisitorAuth from "./VisitorAuth"
import SingleCategory from "./SingleCategory"
import About from "./About"
import Home2 from "./Home2"
import SignUp from "./SignUp"
import Cart from "./Cart"
import { visitorLogout } from "../action/FrontLogin"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FaBeer } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

//import Login from "./Admin"

function Home(props) {


    React.useEffect(() => {
        props.LoadApi();
    }, [])


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function categoryList() {
        // console.log("test", props.list)
        return props.list.map(singleData => {
            //console.log("test", singleData)
            return <>
                <LinkContainer key={singleData.id} to={"/Product?categoryId=" + singleData.id} >
                    <NavDropdown.Item>{singleData.Title}</NavDropdown.Item>
                </LinkContainer>
            </>

        })
    }


    let cartproducts = props.CartList.map((value) => {
        return <>
            <tr key={value.id} align="center">
                <td><img src={value.imageUrl} width="50px" height="50" /></td>
                <td>{value.Title}</td>
                <td>{value.Price} $</td>
                <td> <button className="btn btn-danger" >delete</button>   </td>
            </tr>
        </>
    })

    function logout() {
        props.visitorLogout()

    }


    return (
        <>
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand><img src="/img/logo.png" alt="logo" width="70" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" >
                            <Nav.Link className="text-light" >Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about" >
                            <Nav.Link className="text-light" >About</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Products" id="basic-nav-dropdown">
                            {categoryList()}
                        </NavDropdown>

                    </Nav>

                    <LinkContainer to="/Cart" >
                        <Nav.Link className="text-light" > <ShoppingCartIcon /></Nav.Link>
                    </LinkContainer>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    {/* <LinkContainer to="" className="btn btn-warning ml-4" onClick={handleShow} >
                        <Nav.Link className="text-dark" >Login</Nav.Link>
                    </LinkContainer> */}

                    {
                        props.login === false ? <LinkContainer className="btn btn-danger ml-4" to="/login">
                            <Nav.Link >Login</Nav.Link>
                        </LinkContainer> :
                            // <LinkContainer className="btn btn-warning ml-4" to="/" onClick={logout}>
                            //     <Nav.Link >Logout</Nav.Link>
                            // </LinkContainer>
                            <NavDropdown title={props.name[0].username} id="basic-nav-dropdown" className="btn-sm btn-warning ml-4">
                                <LinkContainer to="/" >
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/" onClick={logout}>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                    }


                </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home2} />
            <Route path="/about" component={About} />
            <Route path={"/Product"} component={SingleCategory} />
            <Route path={"/login"} component={VisitorAuth} />
            <Route path={"/SignUp"} component={SignUp} />
            <Route path={"/Cart"} component={Cart} />


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body> <Table striped bordered hover>
                    <thead>
                        <tr align="center">
                            <th>Product image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartproducts}
                    </tbody>
                    <Button className="btn btn-primary mt-2">Add Address</Button>
                </Table></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

function mapstatetoprops(state) {
    // console.log(state.visitorReducer.customer)
    return {
        list: state.CategoryReducer.category,
        "login": state.visitorReducer.visitorlogin,
        "name": state.visitorReducer.customer,
        CartList: state.cartReducer.Cart
    }
}

export default connect(mapstatetoprops, { LoadApi, visitorLogout })(Home)


