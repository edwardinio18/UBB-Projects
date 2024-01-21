import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const PageWrapper = styled("div")(() => ({
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const TableContainerWrapper = styled(TableContainer)(({ theme }) => ({
  marginTop: "50px",
  overflow: "hidden",
  borderRadius: "10px",
  "& .MuiTableCell-root": {
    fontFamily: "monospace",
    color: theme.palette.text.primary,
    textAlign: "center",
  },
  "& .MuiTableCell-head": {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const BackButtonContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  left: "20px",
});

const BackButton = styled(Button)({
  fontFamily: "monospace",
  color: "black",
  backgroundColor: "white",
  border: "2px solid black",
  borderRadius: "10px",
  padding: "10px",
  transition: "all 0.2s",
  fontSize: "17px",
  width: "100px",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
});

export default function GetPeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.cigs.io/get_people?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        setPeople(res.data.data.people);
        setTotalPages(res.data.data.pageInfo.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/people");
  };

  return (
    <PageWrapper>
      <Typography
        variant="h4"
        fontFamily={"monospace"}
        style={{ fontStyle: "italic" }}
      >
        --- People ---
      </Typography>
      {loading ? (
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontFamily: "monospace",
          }}
        >
          Loading...
        </Typography>
      ) : (
        <>
          <TableContainerWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>No. Cigarettes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {people.map((person) => (
                  <TableRow key={person.id}>
                    <StyledTableCell>{person.id}</StyledTableCell>
                    <StyledTableCell>{person.name}</StyledTableCell>
                    <StyledTableCell>{person.age}</StyledTableCell>
                    <StyledTableCell>{person.email}</StyledTableCell>
                    <StyledTableCell>{person.phone}</StyledTableCell>
                    <StyledTableCell>{person.address}</StyledTableCell>
                    <StyledTableCell>{person.noCigs}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainerWrapper>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "20px",
              flexDirection: "row-reverse",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginRight: "10px",
                  fontFamily: "monospace",
                }}
              >
                Items per page:
              </Typography>
              <select value={pageSize} onChange={handlePageSizeChange}>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
            </div>
          </div>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            style={{ marginTop: "10px" }}
          />
        </>
      )}
      <BackButtonContainer>
        <BackButton
          onClick={handleBackButtonClick}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </BackButton>
      </BackButtonContainer>
    </PageWrapper>
  );
}
