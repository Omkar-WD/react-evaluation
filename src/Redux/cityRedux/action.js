import axios from "axios";
import { API } from "../../components/Variables";
// action type
export const GET_CITIES = "GET_CITIES";

// action creator
export const getCities = (payload) => ({ type: GET_CITIES, payload });

// action as a function
export const getCitiesData =
  (payload = []) =>
  async (dispatch) => {
    if (payload.length > 0) {
      dispatch(getCities(payload));
    } else {
      const { data } = await axios.get(`${API}/cities`);
      dispatch(getCities(data));
    }
  };

export const getCityData = (id, fn) => () => {
  axios
    .get(`${API}/cities/${id}`)
    .then((res) => {
      fn(res.data);
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export const addCityData = (toast, payload, fn) => () => {
  axios
    .post(`${API}/cities`, payload)
    .then((res) => {
      toast({
        title: "City Added!!!",
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      fn({
        country: "",
        city: "",
        population: "",
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

export const editCityData = (toast, payload, id) => () => {
  axios
    .patch(`${API}/cities/${id}`, payload)
    .then((res) => {
      toast({
        title: "City Updated!!!",
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
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

export const deleteCityData = (toast, id) => (dispatch) => {
  axios
    .delete(`${API}/cities/${id}`)
    .then((res) => {
      toast({
        title: "County Deleted!!!",
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      dispatch(getCitiesData());
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
