import { newProduct, LoadData2, removeProduct } from "../action/types"
import { http } from "../BaseApi"



let intial = {
    product: []
}



function productReducer(state = intial, action) {
    // console.log(action.payload)

    switch (action.type) {
        case newProduct:
            let adddata = state.product.concat(action.payload)
            console.log("adddata", state.product)
            return { ...state, product: adddata }

        case LoadData2:

            //  let apidata = state.product.concat(action.payload)
            return { ...state, product: action.payload }

        case removeProduct:

            let Filterproduct = state.product.filter((singledata) => {
                if (action.payload == singledata.id) {
                    return false
                }
                else {
                    return true
                }
            })

            return { ...state, product: Filterproduct }

    }

    return state

}





export default productReducer;