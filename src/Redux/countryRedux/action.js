import axios from "axios";
import { API } from "../../components/Variables";

// action type
export const GET_COUNTRIES = "GET_COUNTRIES";

// action creator
export const getCountries = (payload) => ({ type: GET_COUNTRIES, payload });

// action as a function
export const getCountriesData = () => async (dispatch) => {
  const { data } = await axios.get(`${API}/countries`);
  dispatch(getCountries(data));
};

export const addCountryData = (toast, payload, fn) => () => {
  axios
    .post(`${API}/countries`, payload)
    .then((res) => {
      toast({
        title: "Country Added!!!",
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      fn({
        country: "",
      });
    })
    .catch((e) => {
      toast({
        title: e.message,
        position: "top",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    });
};
