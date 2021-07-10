import { http } from "../BaseApi"
import { customerlogin, logout, SignUp } from "./types"



export const VisitorLogin = (value) => {
    console.log("vaue", value)
    return (dispatch) => {
        http.get("/newusers", { params: value }).then((res) => {
            console.log("vaue", res.data)
            if (res.data.length > 0) {
                dispatch({
                    type: customerlogin,
                    payload: res.data
                })


            }

            else {
                alert("wrong password and username")
            }

        })
    }
}

export const visitorLogout = () => {
    return {
        type: logout,
    }

}

export const VisitorSignUp = (value) => {
    console.log("regsiter", value)
    return (dispatch) => {
        http.post("/newusers", value).then((res) => {
            console.log("regsiter response", res.data)
            dispatch({
                type: SignUp,
                payload: ""
            })
        })
    }
}



