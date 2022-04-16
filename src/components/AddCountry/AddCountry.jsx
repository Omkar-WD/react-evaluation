import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCountryData } from "../../Redux/countryRedux/action";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";

function AddCountry() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [data, setData] = useState({
    country: "",
  });
  const handleChange = (e) => {
    const { value } = e.target;
    setData({ country: value });
  };

  const handleClick = () => {
    dispatch(addCountryData(toast, data, setData));
  };
  return (
    <>
      <Heading as="h3" size="lg" mb="5">
        Add Country
      </Heading>
      <Box w="40%" m="auto">
        <FormControl>
          <FormLabel htmlFor="country">Country Name</FormLabel>
          <Input
            value={data.country}
            onChange={(e) => handleChange(e)}
            id="country"
            type="text"
            placeholder="enter country name"
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

export default AddCountry;
