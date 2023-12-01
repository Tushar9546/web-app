import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as AuthReducer } from "./AuthRedux/reducer";
import { reducer as AccountReducer } from "./AppRedux/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  AccountReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
