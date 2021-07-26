import { customerlogin, logout, SignUp } from "../action/types"
import { http } from "../BaseApi"



let intial = {
    visitorlogin: false,

}


if (localStorage.getItem("token") && localStorage.getItem("email")) {
    intial.visitorlogin = true;
    intial.customer = localStorage.getItem("email")
}


function visitorReducer(state = intial, action) {

    switch (action.type) {

        case customerlogin:


            // let newcustomer = state.customer.concat(action.payload)
            return { ...state, customer: action.payload.email, visitorlogin: true }
        case logout:

            return { ...state, visitorlogin: false }


    }

    return state

}

export default visitorReducer





