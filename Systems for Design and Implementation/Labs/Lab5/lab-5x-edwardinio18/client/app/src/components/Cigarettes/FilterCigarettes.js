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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
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

const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    borderRadius: "10px",
    fontFamily: "monospace",
    borderColor: "black",
    color: theme.palette.text.primary,
  },
  "& .MuiInputLabel-root": {
    color: "black",
    fontFamily: "monospace",
  },
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

export default function FilterCigarettes() {
  const [cigarettes, setCigarettes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = async (event) => {
    const { value } = event.target;
    setFilterValue(value);
  };

  useEffect(() => {
    if (filterValue === "") {
      setCigarettes([]);
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://api.cigs.io/filter/${filterValue}?page=${page}&pageSize=${pageSize}`
      )
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.msg);
        } else {
          setError(null);
          setCigarettes(res.data.data.cigarettes);
          setTotalPages(res.data.data.pageInfo.totalPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filterValue, page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/cigarettes");
  };

  return (
    <PageWrapper>
      <Typography variant="h4" fontFamily={"monospace"} fontStyle={"italic"}>
        --- Filter Cigarettes ---
      </Typography>
      <InputField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        onChange={handleFilterChange}
        style={{ marginTop: "45px" }}
      />
      {loading && (
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontFamily: "monospace",
          }}
        >
          Loading...
        </Typography>
      )}
      {error && (
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontFamily: "monospace",
          }}
        >
          {error}
        </Typography>
      )}
      {!error && cigarettes.length > 0 && (
        <>
          <TableContainerWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Brand</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cigarettes.map((cigarette) => (
                  <TableRow key={cigarette.id}>
                    <TableCell>{cigarette.name}</TableCell>
                    <TableCell>{cigarette.price}</TableCell>
                    <TableCell>{cigarette.origin}</TableCell>
                    <TableCell>{cigarette.photo}</TableCell>
                    <TableCell>{cigarette.description}</TableCell>
                    <TableCell>{cigarette.brand}</TableCell>
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
