import { http } from "../BaseApi"
import { customerlogin, logout, SignUp } from "./types"



export const VisitorLogin = (value) => {
    console.log("vaue", value)
    return (dispatch) => {
        http.post("/auth/login", value).then((res) => {

            console.log(" res.data", res.data.access_token)
            if (res.data.access_token) {
                localStorage.setItem("token", res.data.access_token)
                localStorage.setItem("email", value.email)
                dispatch({
                    type: customerlogin,
                    payload: value
                })


            }

            else {
                alert("wrong password and username")
            }

        })
    }
}

export const visitorLogout = () => {
    localStorage.removeItem("token");
    return {
        type: logout,
    }

}

export const VisitorSignUp = (value) => {
    console.log("regsiter", value)
    return (dispatch) => {
        http.post("/auth/register", value).then((res) => {
            console.log("regsiter response", res)
            localStorage.setItem("token", res.data.access_token)
            dispatch({
                type: SignUp,
                payload: ""
            })
        }).catch((error) => {
            console.log("error", error.response);
            alert(error.response.data.message)
        });
    }
}



