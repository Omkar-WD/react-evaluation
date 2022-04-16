import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { countryReducer } from "./countryRedux/reducer";
import { cityReducer } from "./cityRedux/reducer";

const rootReducer = combineReducers({
  countries: countryReducer,
  cities: cityReducer,
});

const middleware = (store) => (next) => (action) => {
  if (typeof action === "function") return action(store.dispatch);
  next(action);
};

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
