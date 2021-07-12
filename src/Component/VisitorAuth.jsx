import React, { useState } from "react"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal } from 'react-bootstrap'
import { connect } from "react-redux"
import { VisitorLogin } from "../action/FrontLogin"



function VisitorAuth(props) {

    const [visitor, setVisitor] = useState({});


    function changeInput(event) {
        setVisitor(
            {
                ...visitor, [event.target.name]: event.target.value
            }
        )
    }

    if (props.login == true) {
        // console.log(props)
        props.history.goBack()

    }
    function submit(event) {
        event.preventDefault()
        props.VisitorLogin(visitor)
        setVisitor({})
    }

    function Register() {
        props.history.push("/SignUp")
    }



    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4"> </div>
                    <div className="col-4 bg-success p-3">
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
                                Login
  </Button>
                            <Button variant="warning" type="submit" className="ml-2" onClick={Register}>
                                SignUp
  </Button>
                        </Form>

                    </div>
                </div>

            </div >
        </>
    )
}

function mapstatetoprops(state) {
    // console.log(state.CategoryReducer.category)
    return {
        login: state.visitorReducer.visitorlogin
    }
}

export default connect(mapstatetoprops, { VisitorLogin })(VisitorAuth)