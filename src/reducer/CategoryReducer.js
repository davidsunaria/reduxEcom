import { newcategory, LoadData, removeCategory } from "../action/types"
import { http } from "../BaseApi"



let intial = {
    category: []
}



function categoryReducer(state = intial, action) {
    // console.log(action.payload)

    switch (action.type) {
        case newcategory:
            let adddata = state.category.concat(action.payload)
            //  console.log("adddata", state.category)
            return { ...state, category: adddata }

        case LoadData:

            // let apidata = state.category.concat(action.payload)
            return { ...state, category: action.payload }

        case removeCategory:

            let FilterCategory = state.category.filter((singledata) => {
                if (action.payload == singledata.id) {
                    return false
                }
                else {
                    return true
                }
            })

            return { ...state, category: FilterCategory }

    }

    return state

}





export default categoryReducer;