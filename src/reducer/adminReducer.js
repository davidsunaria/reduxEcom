import { login } from "../action/types"
import { http } from "../BaseApi"



let intial = {
    loginsign: false
}



function AdminReducer(state = intial, action) {
    console.log(action.payload)

    switch (action.type) {
        case login:

            return { ...state, loginsign: true }

    }

    return state

}






export default AdminReducer;