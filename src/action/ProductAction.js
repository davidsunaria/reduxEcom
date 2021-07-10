import { http } from "../BaseApi"
import { newProduct, LoadData2, removeProduct, updateproduct } from "./types"


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


export const UpdateProduct = (value) => {
    console.log("updte", value)
    return (dispatch) => {

        http.patch("/Product/" + value.id, {
            Title: value.Title, Description: value.Description,
            Discount: value.Discount, Price: value.Price, imageUrl: value.imageUrl
        }).then((res) => {
            console.log("action", res.data)
            dispatch({
                type: updateproduct,
                payload: value
            })
        })

    }

}

