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

export default function AddBrand() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [origin, setOrigin] = useState("");
  const [originError, setOriginError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [noCountries, setNoCountries] = useState("");
  const [noCountriesError, setNoCountriesError] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }
    if (!origin) {
      setOriginError("Origin is required");
      valid = false;
    } else {
      setOriginError("");
    }
    if (!description) {
      setDescriptionError("Description is required");
      valid = false;
    } else {
      setDescriptionError("");
    }
    if (!noCountries) {
      setNoCountriesError("No. Countries is required");
      valid = false;
    } else if (isNaN(noCountries)) {
      setNoCountriesError("No. Countries must be a number");
      valid = false;
    } else {
      setNoCountriesError("");
    }
    if (!photo) {
      setPhotoError("Photo is required");
      valid = false;
    } else {
      setPhotoError("");
    }

    if (!valid) {
      return;
    }

    const newBrand = {
      name,
      origin,
      description,
      noCountries,
      photo,
    };
    try {
      const res = await axios.post("https://api.cigs.io/add_brand", newBrand);
      setMessage(res.data.msg);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/brands");
  };

  return (
    <PageWrapper>
      <Typography
        variant="h4"
        fontFamily={"monospace"}
        fontStyle={"italic"}
        style={{ marginBottom: "20px" }}
      >
        --- Add a brand ---
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
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(nameError)}
          helperText={nameError}
        />
        <InputField
          label="Origin"
          variant="outlined"
          fullWidth
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          error={Boolean(originError)}
          helperText={originError}
        />
        <InputField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={Boolean(descriptionError)}
          helperText={descriptionError}
        />
        <InputField
          label="No. Countries"
          variant="outlined"
          fullWidth
          value={noCountries}
          onChange={(e) => setNoCountries(e.target.value)}
          error={Boolean(noCountriesError)}
          helperText={noCountriesError}
        />
        <InputField
          label="Photo"
          variant="outlined"
          fullWidth
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          error={Boolean(photoError)}
          helperText={photoError}
        />
        <StyledButtonContainer>
          <StyledButton type="submit">Add Brand</StyledButton>
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
