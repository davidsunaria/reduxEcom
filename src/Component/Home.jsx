import React, { useState } from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal } from 'react-bootstrap'
import { connect } from "react-redux"
import { LoadApi } from "../action/adminAction"
import { VisitorLogin } from "../action/FrontLogin"
import SingleCategory from "./SingleCategory"
import About from "./About"
import Home2 from "./Home2"
//import Login from "./Admin"

function Home(props) {


    React.useEffect(() => {
        props.LoadApi();
    }, [])
    // model part
    const [show, setShow] = useState(false);
    const [visitor, setVisitor] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //model end

    function changeInput(event) {
        setVisitor(
            {
                ...visitor, [event.target.name]: event.target.value
            }
        )
    }
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
    if (props.login == true) {
        // console.log(props)
        props.history.goBack()

    }
    function submit(event) {
        event.preventDefault()
        props.VisitorLogin(visitor)
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
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            {categoryList()}
                        </NavDropdown>
                    </Nav>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    {/* <LinkContainer to="" className="btn btn-warning ml-4" onClick={handleShow} >
                        <Nav.Link className="text-dark" >Login</Nav.Link>
                    </LinkContainer> */}
                    <Button variant="warning" onClick={handleShow} className="btn btn-warning ml-4">
                        Login
  </Button>
                </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home2} />
            <Route path="/about" component={About} />
            <Route path={"/Product"} component={SingleCategory} />

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Login Detail</Modal.Title>
                </Modal.Header>
                <Form className="bg-primary p-3" onSubmit={submit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email"
                            name="username" value={visitor.username} onChange={changeInput} />
                        <Form.Text className="text-white">
                            We'll never share your email with anyone else.
                  </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            name="password" value={visitor.password} onChange={changeInput} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox" >
                        <Form.Check type="checkbox" label="Check me out" className="text-white" />
                    </Form.Group>
                    <Button variant="warning" type="submit">
                        Submit
  </Button>
                </Form>

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
    // console.log(state.CategoryReducer.category)
    return {
        list: state.CategoryReducer.category,
        "login": state.adminReducer.loginsign
    }
}

export default connect(mapstatetoprops, { LoadApi, VisitorLogin })(Home)


