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

export default function AddCigarette() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [originError, setOriginError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [brandError, setBrandError] = useState("");
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
    if (!price) {
      setPriceError("Price is required");
      valid = false;
    } else if (isNaN(price)) {
      setPriceError("Price must be a number");
      valid = false;
    } else {
      setPriceError("");
    }
    if (!origin) {
      setOriginError("Origin is required");
      valid = false;
    } else {
      setOriginError("");
    }
    if (!photo) {
      setPhotoError("Photo is required");
      valid = false;
    } else {
      setPhotoError("");
    }
    if (!description) {
      setDescriptionError("Description is required");
      valid = false;
    } else {
      setDescriptionError("");
    }
    if (!brand) {
      setBrandError("Brand is required");
      valid = false;
    } else if (isNaN(brand)) {
      setBrandError("Brand must be a number");
      valid = false;
    } else {
      setBrandError("");
    }

    if (!valid) {
      return;
    }

    const newCigarette = {
      name,
      price,
      origin,
      photo,
      description,
      brand,
    };
    try {
      const res = await axios.post("https://api.cigs.io/add_cig", newCigarette);
      setMessage(res.data.msg);
    } catch (err) {
      console.log(err);
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
        --- Add a cigarette ---
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
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={Boolean(priceError)}
          helperText={priceError}
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
          label="Photo"
          variant="outlined"
          fullWidth
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          error={Boolean(photoError)}
          helperText={photoError}
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
          label="Brand"
          variant="outlined"
          fullWidth
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          error={Boolean(brandError)}
          helperText={brandError}
        />
        <StyledButtonContainer>
          <StyledButton type="submit">Add Cigarette</StyledButton>
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
