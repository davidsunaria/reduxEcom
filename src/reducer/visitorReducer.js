import { customerlogin, logout, SignUp } from "../action/types"
import { http } from "../BaseApi"



let intial = {
    visitorlogin: false,
}



function visitorReducer(state = intial, action) {
    // console.log(action.payload)

    switch (action.type) {
        case customerlogin:
            // let newcustomer = state.customer.concat(action.payload)
            return { ...state, customer: action.payload, visitorlogin: true }
        case logout:

            return { ...state, visitorlogin: false }


    }

    return state

}

export default visitorReducer





