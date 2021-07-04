import React from "react"
import { Table, Form, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { AddCategory, LoadApi, DeleteCategory } from "../action/adminAction"




function Category(props) {
    const [isclick, setclick] = React.useState(false)
    const [category, setcategory] = React.useState({
        "Title": "pant",
        "Description": "eferferfr"
    })


    function addcategory() {

        setclick(true)

    }

    function submit(event) {

        // console.log(category.Title)
        event.preventDefault()
        setclick(false)
        setcategory({})
        props.AddCategory(category)



    }

    function changehandler(event) {
        setcategory({
            ...category,
            [event.target.name]: event.target.value
        })
    }

    React.useEffect(() => {
        props.LoadApi();
    }, [])

    function Delete(id) {
        console.log("cata", id)
        props.DeleteCategory(id)
    }

    function categoryList() {
        // console.log("test", props.list)
        return props.list.map(singleData => {

            return <>
                <tr key={singleData.id}>
                    <td>{singleData.id}</td>
                    <td>{singleData.Title}</td>
                    <td>{singleData.Description}</td>
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
            <button className="btn-primary btn mt-5 " onClick={addcategory}>ADD</button>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList()}
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
                                name="Title" value={category.Title}
                                onChange={changehandler}
                            />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><h3>Description</h3></Form.Label>
                            <Form.Control type="text" placeholder="Description"
                                name="Description" value={category.Description} onChange={changehandler} />
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
    // console.log(state.CategoryReducer.category)
    return { list: state.CategoryReducer.category }
}

export default connect(mapstatetoprops, { AddCategory, LoadApi, DeleteCategory })(Category)