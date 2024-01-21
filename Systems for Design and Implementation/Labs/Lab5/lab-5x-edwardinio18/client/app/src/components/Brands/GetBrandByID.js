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

export default function GetBrandByID() {
  const [brand, setBrand] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBrandById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.cigs.io/get_brand/${id}`);
      if (response.data.status === 0) {
        setError(response.data.msg);
        setBrand(null);
      } else {
        setError(null);
        setBrand(response.data.data);
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
      getBrandById(value);
    } else {
      setError(null);
      setBrand(null);
    }
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/brands");
  };

  return (
    <PageWrapper>
      <Typography variant="h4" fontFamily={"monospace"} fontStyle={"italic"}>
        --- Brand By ID ---
      </Typography>
      <InputField
        id="outlined-basic"
        label="Brand ID"
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
      {brand && (
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
                        - Brand -
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{brand.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Origin</TableCell>
                    <TableCell>{brand.origin}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{brand.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NoCountries</TableCell>
                    <TableCell>{brand.noCountries}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Photo</TableCell>
                    <TableCell>{brand.photo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NoCigarettes</TableCell>
                    <TableCell>{brand.cigarettesData.noCigs}</TableCell>
                  </TableRow>
                  {brand.cigarettesData.noCigs > 0 && (
                    <>
                      {brand.cigarettesData.cigs.map((cig, i) => (
                        <>
                          <TableRow>
                            <TableCell sx={{ borderBottom: "none" }}>
                              <Typography
                                variant="inherit"
                                fontWeight="bold"
                                fontStyle="italic"
                                width={"200%"}
                                marginTop={"15px"}
                              >
                                - Cigarette {i + 1} -
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{cig.name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>{cig.price}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Origin</TableCell>
                            <TableCell>{cig.origin}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Photo</TableCell>
                            <TableCell>{cig.photo}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{cig.description}</TableCell>
                          </TableRow>
                        </>
                      ))}
                    </>
                  )}
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
