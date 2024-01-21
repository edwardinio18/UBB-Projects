import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled("div")(() => ({
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
  width: "500px",
  margin: "10px",
}));

const StyledButton = styled(Button)(({}) => ({
  fontFamily: "monospace",
  color: "white",
  backgroundColor: "black",
  border: "2px solid black",
  borderRadius: "10px",
  padding: "13px 50px",
  transition: "all 0.2s",
  fontSize: "17px",
  margin: "10px",
  width: "385px",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
    borderRadius: "50px",
  },
}));

const StyledButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
});

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

export default function UpdateManyCigs() {
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [cigs, setCigs] = useState([]);
  const [cigsError, setCigsError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!id) {
      setIdError("Please enter brand ID");
      valid = false;
    } else if (isNaN(id)) {
      setIdError("Please enter a number");
      valid = false;
    } else {
      setIdError("");
    }

    let ids;
    if (cigs.length === 0) {
      setCigsError("Please enter cigarette IDs");
      valid = false;
    } else {
      ids = cigs.split(",").map((id) => parseInt(id.trim()));
      if (ids.some((id) => id <= 0 || !Number.isInteger(id))) {
        setCigsError("Please enter natural numbers separated by comma");
        valid = false;
      } else {
        setCigsError("");
      }
    }

    if (!valid) {
      return;
    }

    try {
      const res = await axios.put(`https://api.cigs.io/brands/${id}/cigs`, {
        cigs: ids,
      });
      setMessage(res.data.msg);
      setId("");
      setCigs("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/cigarettes");
  };

  return (
    <PageWrapper>
      <Typography
        variant="h4"
        fontFamily={"monospace"}
        fontStyle={"italic"}
        style={{ marginBottom: "20px" }}
      >
        --- Update many cigarettes' brand's ---
      </Typography>
      {message && (
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "20px",
            fontFamily: "monospace",
          }}
        >
          {message}
        </Typography>
      )}
      <form onSubmit={handleSubmit} style={{ width: "500px" }}>
        <InputField
          label="Brand ID"
          variant="outlined"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
          error={Boolean(idError)}
          helperText={idError}
        />
        <InputField
          label="Cigarette IDs"
          variant="outlined"
          fullWidth
          value={cigs}
          onChange={(e) => setCigs(e.target.value)}
          error={Boolean(cigsError)}
          helperText={cigsError}
        />
        <StyledButtonContainer>
          <StyledButton type="submit">Update cigarettes' brand's</StyledButton>
        </StyledButtonContainer>
      </form>
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
