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
const Products = () => {
  const [products, setProducts] = useState([]);

  const dummyData = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
    },
  ];

  const tableColumns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Product Image",
      accessor: "image",
      Cell: ({ row }) => <Image src={row.values.image} h={100} />,
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: ({ row }) => `$${row.values.price}`,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <Button size="sm" onClick={() => alert(`$${row.values.price}`)}>
          Show Price
        </Button>
      ),
    },
  ];
  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => products, [products]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        setProducts(data);
      } catch (error) {
        console.log("error:::::", error);
      }
    };
    fetchProducts();
  }, []);

  console.log("products::", products);
  if (products.length === 0) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Heading>Product Detail: {products.length}</Heading>
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

export default Products;
