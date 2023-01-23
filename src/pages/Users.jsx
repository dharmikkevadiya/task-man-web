import {
  Button,
  Center,
  Heading,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
const Users = () => {
  const [users, setUsers] = useState([]);

  const tableColumns = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Full Name",
      accessor: "firstName",
      Cell: ({ row }) => {
        let fullName = "";
        if (row.values.firstName) fullName = row.values.firstName + " ";
        if (row.values.lastName) fullName += row.values.lastName;
        return fullName;
      },
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
    },
  ];
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => users, [users]);

  const initialState = { hiddenColumns: ["lastName", "_id"] };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState }, useSortBy);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get("/users", config);
        setUsers(data.data);
      } catch (error) {
        console.log("error:::::", error);
      }
    };
    fetchProducts();
  }, []);

  console.log("users::", users);
  if (users.length === 0) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Heading>Users: {users.length}</Heading>
      <Table {...getTableProps()} variant="striped" colorScheme="blue">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? "🔼" : "🔽") : ""}
                </Th>
              ))}
              <Th></Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);

            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default Users;
