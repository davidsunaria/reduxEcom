import React from "react"
import { Table, Dropdown, Form, Button, Col } from "react-bootstrap"
import { connect } from "react-redux"
import { AddProduct, LoadApi2, DeleteProduct } from "../action/ProductAction"


function Product(props) {




    function categoryList() {
        console.log("prodct page list2", props.list2)
        return props.list2.map(singleData => {

            return <>
                <option value={singleData.id}>{singleData.Title}</option>
            </>

        })
    }

    const [isclick, setclick] = React.useState(false)
    const [Product, setProduct] = React.useState({
        "Title": "pant",
        "Description": "eferferfr",
        "Price": "12$"
    })


    function addProduct() {

        setclick(true)

    }

    function submit(event) {

        // console.log(Product.Title)
        event.preventDefault()
        setclick(false)
        setProduct({})
        props.AddProduct(Product)



    }

    function changehandler(event) {
        setProduct({
            ...Product,
            [event.target.name]: event.target.value
        })
    }

    React.useEffect(() => {
        props.LoadApi2();
    }, [])

    function Delete(id) {
        console.log("cata", id)
        props.DeleteProduct(id)
    }

    function ProductList() {
        // console.log("test", props.list)
        return props.list.map(singleData => {

            return <>
                <tr key={singleData.id}>
                    <td>{singleData.id}</td>
                    <td>{singleData.Title}</td>
                    <td>{singleData.Description}</td>
                    <td>{singleData.Price}</td>
                    <td><img src={singleData.imageUrl} width="70" /></td>
                    <td>{singleData.categoryId}</td>
                    <td><button className="btn btn-info" onClick={() => {
                        Delete(singleData.id)
                    }}>Delete</button></td>
                </tr>
            </>

        })
    }

    let data = null
    if (isclick == false) {
        data = <div className="text-center">
            <button className="btn-primary btn mt-5 " onClick={addProduct}>ADD</button>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category Id</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {ProductList()}
                </tbody>
            </Table>
        </div>
    }

    else {

        data = <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="text-center col-md-6 bg-danger p-3">
                    <Form onSubmit={submit} className="mt-5">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><h3>Title</h3></Form.Label>
                            <Form.Control type="text" placeholder="Title"
                                name="Title" value={Product.Title}
                                onChange={changehandler}
                            />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><h3>Description</h3></Form.Label>
                            <Form.Control type="text" placeholder="Description"
                                name="Description" value={Product.Description} onChange={changehandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><h3>Price</h3></Form.Label>
                            <Form.Control type="text" placeholder="Description"
                                name="Price" value={Product.Price} onChange={changehandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><h3>Image Url</h3></Form.Label>
                            <Form.Control type="text" placeholder="ImageUrl"
                                name="imageUrl" onChange={changehandler} />
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Category Detail</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="categoryId" onChange={changehandler}>
                                <option>Choose...</option>
                                {categoryList()}
                            </Form.Control>
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
    }


    return (
        <>
            { data}

        </>
    )




}





function mapstatetoprops(state) {
    return { list: state.ProductReducer.product, list2: state.CategoryReducer.category }
}


export default connect(mapstatetoprops, { AddProduct, LoadApi2, DeleteProduct })(Product)