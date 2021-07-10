import { http } from "../BaseApi"
import { addcartData, incre, decre } from "./types"

export const addItem = (data) => {
    return {
        type: addcartData,
        payload: data
    }

}


export const Increment = (data) => {
    console.log(data)
    return {
        type: incre,
        payload: data
    }

}

export const Decrement = (data) => {
    console.log(data)
    return {
        type: decre,
        payload: data
    }

}