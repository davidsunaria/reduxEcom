import { http } from "../BaseApi"
import { login } from "./types"



export const VisitorLogin = (value) => {
    console.log("vaue", value)
    return (dispatch) => {
        http.get("/User", { params: value }).then((res) => {
            console.log("vaue", res.data)
            if (res.data.length > 0) {
                dispatch({
                    type: login,
                    payload: res.data
                })


            }

            else {
                alert("wrong password and username")
            }

        })
    }
}



