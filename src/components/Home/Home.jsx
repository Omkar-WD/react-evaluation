import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesData, deleteCityData } from "../../Redux/cityRedux/action";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const reduxCities = useSelector((store) => store.cities.cities);
  const dispatch = useDispatch();
  const toast = useToast();
  const Navigate = useNavigate();

  const getCities = () => {
    dispatch(getCitiesData());
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleSort = (e) => {
    const { value } = e.target;
    if (value == "1") {
      let x = reduxCities.sort((a, b) => {
        if (a.country > b.country) return 1;
        return -1;
      });
      dispatch(getCitiesData([...x]));
    } else if (value == "2") {
      let x = reduxCities.sort((a, b) => {
        if (Number(a.population) > Number(b.population)) return 1;
        return -1;
      });
      dispatch(getCitiesData([...x]));
    } else {
      let x = reduxCities.sort((a, b) => {
        if (Number(a.population) > Number(b.population)) return -1;
        return 1;
      });
      dispatch(getCitiesData([...x]));
    }
  };
  const handleEdit = (id) => {
    Navigate(`/edit-city/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteCityData(toast, id));
  };

  return (
    <>
      <Box w="70%" m="auto">
        <Box w="30%" m="auto" align="right">
          <Select
            id="sort"
            onChange={(e) => handleSort(e)}
            placeholder="Select Sort"
          >
            <option value="1">filter by country</option>
            <option value="2">population sort by asc </option>
            <option value="3">population sort by desc </option>
          </Select>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Country</Th>
                <Th>City</Th>
                <Th>Population</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reduxCities.map((e) => (
                <Tr key={e.id}>
                  <Td>{e.id}</Td>
                  <Td>{e.country}</Td>
                  <Td>{e.city}</Td>
                  <Td>{e.population}</Td>
                  <Td>
                    <Button
                      onClick={() => handleEdit(e.id)}
                      colorScheme="teal"
                      variant="link"
                    >
                      edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => handleDelete(e.id)}
                      colorScheme="teal"
                      variant="link"
                    >
                      delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Home;
