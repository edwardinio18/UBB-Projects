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

export default function DeletePerson() {
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!id) {
      setIdError("ID is required");
      valid = false;
    } else if (isNaN(id)) {
      setIdError("ID must be a number");
      valid = false;
    } else {
      setIdError("");
    }

    if (!valid) {
      return;
    }

    try {
      const res = await axios.delete(
        `https://api.cigs.io/delete_person/${id}`
      );
      setMessage(res.data.msg);
    } catch (err) {
      console.log(err);
    }
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
        fontStyle={"italic"}
        style={{ marginBottom: "20px" }}
      >
        --- Delete a person ---
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
          label="ID"
          variant="outlined"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
          error={Boolean(idError)}
          helperText={idError}
        />
        <StyledButtonContainer>
          <StyledButton type="submit">Delete Person</StyledButton>
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
