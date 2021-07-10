import { newProduct, LoadData2, removeProduct, updateproduct } from "../action/types"
import { http } from "../BaseApi"



let intial = {
    product: []
}



function productReducer(state = intial, action) {
    // console.log(action.payload)

    switch (action.type) {
        case newProduct:
            let adddata = state.product.concat(action.payload)
            //  console.log("adddata", state.product)
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
        case updateproduct:

            let index = null
            for (let i = 0; i < state.product.length; i++) {
                if (action.payload.id == state.product[i].id) {
                    index = i
                    break
                }
            }
            //   console.log("index,", index)
            let updatedProduct = [...state.product]
            updatedProduct[index] = action.payload
            return { ...state, product: updatedProduct }


    }


    return state

}





export default productReducer;