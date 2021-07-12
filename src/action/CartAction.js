import { http } from "../BaseApi"
import { addcartData, incre, decre, deleteCart } from "./types"

export const addItem = (data) => {
    return {
        type: addcartData,
        payload: data
    }

}


export const Increment = (data) => {
    return {
        type: incre,
        payload: data
    }

}

export const Decrement = (data) => {
    return {
        type: decre,
        payload: data
    }

}

export const DeleteCart = (data) => {
    return {
        type: deleteCart,
        payload: data
    }

}