import {createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index.js';
import searchDataWithAPI from '../middlewares';
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(searchDataWithAPI, thunk));

export default store;