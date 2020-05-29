import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {drivers} from "./drivers";
import {Driver} from "../services/drivers.service";
import {clientCoordinates} from "./clientCoordinates";
import {activeDriver} from "./activeDriver";



const reducer = combineReducers({
    drivers, clientCoordinates, activeDriver,
});

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk),
));

export default store;

export type Store = {
    drivers:{
        data: Driver[],
        errors: [],
        loading: boolean
    },
    clientCoordinates: {
        data: number[],
        loading: false,
        errors: [],
    }
    activeDriver: {
        data: Driver,
        loading: boolean
        errors: [],
    },
};
