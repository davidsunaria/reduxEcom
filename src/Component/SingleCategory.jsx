import React from "react"
import { connect } from "react-redux"
import { http } from "../BaseApi"
import { BrowserRouter, Link, Route, withRouter, useLocation } from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Form, Card, Button } from 'react-bootstrap'
import { AddProduct, LoadApi2, DeleteProduct } from "../action/ProductAction"
import { addItem } from "../action/CartAction"



function SingleCategory(props) {
    //  console.log("singlecategory", props)
    //  const [selectedProduct, setProduct] = React.useState([])
    React.useEffect(() => {
        props.LoadApi2();
    }, [])
    const location = useLocation()


    let param = location.search.replace("?categoryId=", "")



    // React.useEffect(() => {
    //     http.get("/Product/").then((res) => {
    //         setProduct([...res.data])
    //     })
    // }, [])


    function getProduct() {

        let filterData = props.list.filter((singledata) => {
            if (singledata.categoryId == param) {
                return true
            }
            else {
                return false
            }
        })

        function addcart(data) {
            props.addItem(data)
        }
        return filterData.map(singledata => {
            let deductAmount = (singledata.Price * parseInt(singledata.Discount)) / 100
            let finalRate = singledata.Price - deductAmount
            return <div className="col-md-4 mt-3 position-relative Card " >
                <Card style={{ width: '18rem' }} className="image ">
                    <Card.Img variant="top" src={singledata.imageUrl} className="cardImg mx-auto d-block  " />
                    <div class="overlay">
                        {/* <Button variant="info" className="text" onClick={
                            () => {
                                addcart(singledata)
                            }}>Add to Cart</Button> */}
                        <div className="text" onClick={
                            () => {
                                addcart(singledata)
                            }}>Add to Cart</div>
                    </div>
                    <Card.Body>
                        <Card.Title>{singledata.Title}</Card.Title>
                        <Card.Text>
                            {singledata.Description}
                        </Card.Text>
                        <Card.Text>
                            <span className="font-weight-bold">   {"Rs. " + finalRate + " "}</span>
                            <span style={{ textDecoration: "line-through" }} className="font-weight-light">  {singledata.Price + " Rs"}</span>
                            <span className="text-warning">  {"(" + singledata.Discount + "off)"}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>
        })
    }

    return (

        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        {/* <h1 className="text-center text-white bg-dark mt-3"> <marquee width="100%" direction="left" >
                            There are 20% discount for every   </marquee></h1> */}
                    </div>
                </div>

                <div className="row mt-4">
                    {getProduct()}
                </div>

            </div>



        </>
    )
}


function mapstatetoprops(state) {
    console.log(state.ProductReducer)
    return { list: state.ProductReducer.product }
}


export default connect(mapstatetoprops, { LoadApi2, addItem })(SingleCategory)