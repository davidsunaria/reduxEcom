import React, { useState } from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import Login from "./Login"
import DashBoard from "./DashBoard"


function Admin(props) {
    return (
        <>
            <Switch>
                <Route exact path="/admin/login" component={Login} />
                <Route path="/admin/dashboard" component={DashBoard} />

            </Switch>

        </>
    )


}
export default Admin
