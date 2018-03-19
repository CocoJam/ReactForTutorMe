import {createStore, applyMiddleware, combineReducers} from "redux";
import {render} from "react-dom";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import React from 'react';
import {Provider} from "react-redux"
import reducers from "./reducers/LoginAndRegisterReducer";
import stateExample1 from "./states/stateExample1";
import App from "./comp/ReactPlusReduxExample1"
import {loadStorage, saveState} from "./localStorage/storage";

console.log("this is the new page");
const mylogger = (store) => (next) => (action) => {
    console.log(store);
    console.log(next);
    console.log(action);
    next(action);
};
const loadState = loadStorage();
// if (loadState !== undefined){
//     loadState.login = false;
// }
const initalState = loadState|| stateExample1;
// let esc = encodeURIComponent;
// const params = {username: initalState.username, password: initalState.password};
// const query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
// fetch("/sql?" + query).then((res) => {
//     if (res.ok) {
//         return res.json();
//     }
//     else {
//         throw Error("parse error of responds")
//     }
// }).then((res) => {
//     initalState.login = true;
//     return res
// }).catch((err) => {
//     console.log("auto login problem");
//     console.log(err);
// });
const store = createStore( reducers, initalState, applyMiddleware(mylogger));

store.subscribe(function () {
    saveState(store.getState());
    console.log("store updated ", store.getState())
});


render(<Provider store={store}><App/></Provider>, window.document.getElementById("id"));