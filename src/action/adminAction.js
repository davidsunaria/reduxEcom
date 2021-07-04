import { http } from "../BaseApi"
import { login, newcategory, LoadData, removeCategory } from "./types"


export const LoadApi = () => {

    return (dispatch) => {

        http.get("/category").then((res) => {
            // console.log(res.data)
            dispatch({
                type: LoadData,
                payload: res.data
            })
        })

    }


}

export const auth_check = (value) => {
    return (dispatch) => {
        http.get("/admin", { params: value }).then((res) => {

            // console.log("params", res)


            if (res.data.length == 0) {
                alert("wrong password")
            }
            else {
                dispatch({
                    type: login,
                    payload: res.data
                })

            }
        })
    }

}

export const AddCategory = (value) => {
    return (dispatch) => {
        http.post("/category", value).then((res) => {

            dispatch({
                type: newcategory,
                payload: res.data
            })
        })
    }
}

export const DeleteCategory = (value) => {

    return (dispatch) => {

        http.delete("/category/" + value).then((res) => {
            //  console.log("action", value)
            dispatch({
                type: removeCategory,
                payload: value
            })
        })

    }



}


