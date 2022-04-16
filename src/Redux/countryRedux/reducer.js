import { GET_COUNTRIES } from "./action";

const initialState = { countries: [] };

export const countryReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return { ...store, countries: payload };
    default:
      return store;
  }
};
