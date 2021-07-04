import { http } from "../BaseApi"
import { newProduct, LoadData2, removeProduct } from "./types"


export const LoadApi2 = () => {

    return (dispatch) => {

        http.get("/Product").then((res) => {
            // console.log(res.data)
            dispatch({
                type: LoadData2,
                payload: res.data
            })
        })

    }


}


export const AddProduct = (value) => {
    return (dispatch) => {
        http.post("/Product", value).then((res) => {

            dispatch({
                type: newProduct,
                payload: res.data
            })
        })
    }
}

export const DeleteProduct = (value) => {

    return (dispatch) => {

        http.delete("/Product/" + value).then((res) => {
            //  console.log("action", value)
            dispatch({
                type: removeProduct,
                payload: value
            })
        })

    }



}


