import { InsertEmoticon } from "@material-ui/icons"
import { addcartData, incre, decre, deleteCart } from "../action/types"
import Cart from "../Component/Cart"



let intial = {
    Cart: [],

}



function cartReducer(state = intial, action) {


    switch (action.type) {
        case addcartData:



            action.payload.count = 1
            let finalCart = [...state.Cart]
            let check = finalCart.every((val) => {
                return val.id !== action.payload.id
            })


            if (check) {
                let newcart = finalCart.concat(action.payload)
                return { ...state, Cart: newcart }
            }
            else {

                let itemInc = finalCart.find(value => {
                    if (value.id == action.payload.id) {
                        return true
                    }
                    else {
                        return false
                    }
                })
                itemInc.count += 1
                console.log(itemInc)
                let oldItem = state.Cart.filter(value => {
                    return value.id != action.payload.id
                })


                let finalInc = oldItem.concat(itemInc)
                return { ...state, cart: finalInc }
            }

        // if (state.Cart.length == 0) {
        //     action.payload.count = 1
        //     let newcart = state.Cart.concat(action.payload)
        //     return { ...state, Cart: newcart }
        // }
        // else {
        //     let newcart3 = state.Cart.map((value) => {
        //         console.log("new cart", value)
        //         if (value.id != action.payload.id) {
        //             console.log("new cart", value)
        //             return action.payload
        //         }
        //     })


        // }

        case incre:
            let selectItem = state.Cart.map((value) => {
                if (value.id == action.payload) {
                    // console.log("new cart", value)
                    value.count++
                }
                return value
            })
            //  console.log(selectItem)

            return { ...state, Cart: selectItem }

        case decre:
            let minuscart = state.Cart.map((value) => {
                if (value.id == action.payload) {
                    if (value.count > 1) {
                        value.count--
                    }

                }
                return value
            })

            return { ...state, Cart: minuscart }

        case deleteCart:
            let deletedCart = state.Cart.filter((value) => {
                if (value.id == action.payload) {
                    return false
                }
                else {
                    return true
                }
            })
            return { ...state, Cart: deletedCart }
    }
    return state

}


export default cartReducer;