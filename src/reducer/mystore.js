import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import AdminReducer from './adminReducer';
import categoryReducer from "./CategoryReducer"
import productReducer from "./ProductReducer"
import thunk from 'redux-thunk';
let composerEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    adminReducer: AdminReducer,
    CategoryReducer: categoryReducer,
    ProductReducer: productReducer

})

let enhancedMiddleware = composerEnhance(applyMiddleware(thunk))

export default createStore(combinedReducers, enhancedMiddleware)
