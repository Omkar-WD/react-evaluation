import { GET_CITIES } from "./action";

const initialState = { cities: [] };

export const cityReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case GET_CITIES:
      return { ...store, cities: payload };
    default:
      return store;
  }
};
