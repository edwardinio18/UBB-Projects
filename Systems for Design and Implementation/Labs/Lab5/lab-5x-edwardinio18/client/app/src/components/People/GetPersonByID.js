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
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

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
    fontSize: "1.2rem",
    padding: "12px",
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

export default function GetPersonByID() {
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPersonById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.cigs.io/get_person/${id}`
      );
      if (response.data.status === 0) {
        setError(response.data.msg);
        setPerson(null);
      } else {
        setError(null);
        setPerson(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value) {
      getPersonById(value);
    } else {
      setError(null);
      setPerson(null);
    }
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/people");
  };

  return (
    <PageWrapper>
      <Typography variant="h4" fontFamily={"monospace"} fontStyle={"italic"}>
        --- Person By ID ---
      </Typography>
      <InputField
        id="outlined-basic"
        label="Person ID"
        variant="outlined"
        onChange={handleInputChange}
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
      {person && (
        <TableContainerWrapper>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={6}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "100%",
                        whiteSpace: "nowrap",
                        borderBottom: "none",
                      }}
                    >
                      <Typography
                        variant="inherit"
                        fontWeight="bold"
                        fontStyle="italic"
                      >
                        - Person -
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{person.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Age</TableCell>
                    <TableCell>{person.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{person.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone</TableCell>
                    <TableCell>{person.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{person.address}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </TableContainerWrapper>
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
