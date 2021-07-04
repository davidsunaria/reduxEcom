import React, { useState } from "react"
import { connect } from "react-redux"
import { Button, Form } from "react-bootstrap"
import { auth_check } from "../action/adminAction"

function Login(props) {

    const [userdetail, setuser] = useState({
        username: "raman",
        password: "karan"
    })

    function changehandler(event) {

        console.log(event.target.value)
        setuser(
            {
                ...userdetail,
                [event.target.name]: event.target.value,
            })
    }

    function submit(event) {
        event.preventDefault()
        props.auth_check(userdetail)

    }

    if (props.login == true) {
        props.history.push("/admin/dashboard")

    }

    console.log(props)
    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4"> </div>
                    <div className="col-4 bg-success p-3">
                        <Form onSubmit={submit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter email" name="username"
                                    value={userdetail.username} onChange={changehandler} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                  </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    value={userdetail.password} onChange={changehandler} name="password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
  </Button>
                        </Form>
                    </div>

                </div>

            </div>
        </>
    )
}


function myStateToProp(state) {
    console.log(state.adminReducer)
    return { login: state.adminReducer.loginsign }
}

export default connect(myStateToProp, { auth_check })(Login)


