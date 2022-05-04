
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import contactsReducer from "./contacts/contactsReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(contactsReducer, composeEnhancers(applyMiddleware(thunk)))

export default store;
export type AppDispatch = typeof store.dispatch
