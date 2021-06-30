import {createStore, combineReducers} from "redux"

import usuario from "./reducers/usuario"
import notas from "./reducers/notas"

const store = createStore(combineReducers({notas, usuario})); 

export default store;