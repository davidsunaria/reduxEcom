import { login, logout, SignUp } from "../action/types"
import { http } from "../BaseApi"



let intial = {
    loginsign: false,
}



function AdminReducer(state = intial, action) {
    //  console.log(action.payload)

    switch (action.type) {
        case login:
            // let newcustomer = state.customer.concat(action.payload)
            return { ...state, loginsign: true }
        case logout:

            return { ...state, loginsign: false }


    }

    return state

}






export default AdminReducer;