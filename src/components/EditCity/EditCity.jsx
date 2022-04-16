import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesData } from "../../Redux/countryRedux/action";
import { getCityData, editCityData } from "../../Redux/cityRedux/action";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function EditCity() {
  const reduxCountries = useSelector((store) => store.countries.countries);
  const dispatch = useDispatch();
  const toast = useToast();
  const { id } = useParams();
  const [data, setData] = useState({
    country: "",
    city: "",
    population: "",
  });

  useEffect(() => {
    dispatch(getCountriesData());
    dispatch(getCityData(id, setData));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleClick = () => {
    dispatch(editCityData(toast, data, id));
  };
  return (
    <>
      <Heading as="h3" size="lg" mb="5">
        Edit City
      </Heading>
      <Box w="40%" m="auto">
        <FormControl>
          <FormLabel htmlFor="country">Select Country</FormLabel>
          <Select
            id="country"
            onChange={(e) => handleChange(e)}
            placeholder="Select country"
            value={data.country}
          >
            {reduxCountries.map((e) => (
              <option key={e.id} value={e.country}>
                {e.country}
              </option>
            ))}
          </Select>
          <FormLabel htmlFor="city">City Name</FormLabel>
          <Input
            value={data.city}
            id="city"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="enter city name"
          />
          <FormLabel htmlFor="population">Population</FormLabel>
          <Input
            value={data.population}
            onChange={(e) => handleChange(e)}
            id="population"
            type="number"
            placeholder="enter population"
          />
          <Box display="flex" alignItems="right">
            <Button onClick={handleClick} colorScheme="teal" mt="5" size="md">
              Submit
            </Button>
          </Box>
        </FormControl>
      </Box>
    </>
  );
}

export default EditCity;
