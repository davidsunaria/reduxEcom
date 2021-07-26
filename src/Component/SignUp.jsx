import React, { useState } from "react"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal } from 'react-bootstrap'
import { connect } from "react-redux"
import { http } from "../BaseApi"
import { VisitorSignUp } from "../action/FrontLogin"



function SignUp(props) {

    const [allvisitor, setallvisitor] = useState([])
    const [visitor, setVisitor] = useState({});


    function changeInput(event) {
        setVisitor(
            {
                ...visitor, [event.target.name]: event.target.value
            }
        )
    }

    React.useEffect(() => {
        http.get("/newusers").then((res) => {
            setallvisitor([...res.data])
        })

    }, [])


    // function submit(event) {
    //     allvisitor.forEach((value) => {
    //         if (value.username != visitor.username) {
    //             event.preventDefault()
    //             props.VisitorSignUp(visitor)
    //             setVisitor({})
    //             props.history.push("/login")
    //         }
    //         else {
    //             alert("user already register with same username")
    //         }
    //     })

    // }

    function submit(event) {
        event.preventDefault()
        props.VisitorSignUp(visitor)
        setVisitor({})
        props.history.push("/login")


    }

    // function Register() {
    //     props.history.push("/SignUp")
    // }


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
                                    name="email" value={visitor.email} onChange={changeInput} />
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
                                Register
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
        login: state.visitorReducer.visitorlogin,
    }
}

export default connect(mapstatetoprops, { VisitorSignUp })(SignUp)