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
            return <div className="col-md-4 mt-3 text-center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={singledata.imageUrl} className="cardImg mx-auto d-block" />
                    <Card.Body>
                        <Card.Title>{singledata.Title}</Card.Title>
                        <Card.Text>
                            {singledata.Description}
                        </Card.Text>
                        <Card.Text>
                            Price:   {singledata.Price + " Rs"}
                        </Card.Text>
                        <Button variant="primary" onClick={
                            () => {
                                addcart(singledata)
                            }}>Add to Cart</Button>
                    </Card.Body>
                </Card>
            </div>
        })
    }

    return (

        <>
            <div className="container">
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