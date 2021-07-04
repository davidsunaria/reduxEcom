import React, { useState } from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import Category from "./Category"
import Product from "./Product"
import { connect } from "react-redux"

function DashBoard(props) {

    // if (props.login == false) {
    //     props.history.push("/admin/login")


    // }

    console.log(props)
    return (

        <div className="container">
            <h1 className="text-center">Dashboard</h1>
            <div className="row mt-5">
                <div className="col-md-4 bg-primary p-5 mt-5 ">
                    <Link className="text-white text-decoration-none">Dashboard</Link><br /> <br />
                    <Link className="text-white text-decoration-none" to="/admin/dashboard/product">Product</Link><br /> <br />
                    <Link className="text-white text-decoration-none" to="/admin/dashboard/category">Catagory</Link><br /> <br />
                </div>
                <div className="col-md-8 text-right">
                    <button className="btn btn-info mr-3">Profile</button>
                    <button className="btn btn-danger">Logout</button>
                    < Switch>
                        <Route path="/admin/dashboard/product" component={Product} />
                        <Route path="/admin/dashboard/category" component={Category} />
                    </Switch>

                </div>
            </div>
        </div>

    )


}

function mapstatetoprops(state) {
    // console.log(state.adminReducer)
    return { login: state.adminReducer.loginsign }
}

export default connect(mapstatetoprops)(DashBoard)
