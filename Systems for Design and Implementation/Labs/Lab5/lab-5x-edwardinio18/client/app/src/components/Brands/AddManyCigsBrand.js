import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

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

export default function AddManyCigsBrand() {
  const [cigs, setCigs] = useState([
    { name: "", price: "", origin: "", photo: "", description: "" },
  ]);
  const [brandId, setBrandId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://api.cigs.io/add_many/${brandId}/cigs`,
        { cigs: cigs }
      );
      setMessage(res.data.msg);
      setBrandId("");
      setCigs([
        { name: "", price: "", origin: "", photo: "", description: "" },
      ]);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleAddCig = () => {
    setCigs([
      ...cigs,
      {
        name: "",
        price: "",
        origin: "",
        photo: "",
        description: "",
      },
    ]);
  };

  const handleRemoveCig = (index) => {
    const newCigs = [...cigs];
    newCigs.splice(index, 1);
    setCigs(newCigs);
  };

  const handleCigChange = (e, index) => {
    const { name, value } = e.target;
    const newCigs = [...cigs];
    newCigs[index][name] = value;
    setCigs(newCigs);
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
        --- Add cigarettes to a certain brand ---
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
      <form
        onSubmit={handleSubmit}
        style={{ width: "min-content", textAlign: "center" }}
      >
        <InputField
          label="Brand ID"
          variant="outlined"
          name="brandId"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          required
        />
        <Typography
          variant="h5"
          fontFamily={"monospace"}
          fontStyle={"italic"}
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          --- Cigarettes ---
        </Typography>
        {cigs &&
          cigs.map((cig, index) => (
            <div key={index} style={{ marginTop: "20px", textAlign: "center" }}>
              <Typography
                variant="h6"
                fontFamily={"monospace"}
                fontStyle={"italic"}
                style={{
                  marginLeft: "160px",
                  marginBottom: "-5px",
                  textAlign: "left",
                }}
              >
                Cigarette {index + 1}
              </Typography>
              <InputField
                label="Name"
                variant="outlined"
                name="name"
                value={cig.name}
                onChange={(e) => handleCigChange(e, index)}
                required
              />
              <InputField
                label="Price"
                variant="outlined"
                name="price"
                value={cig.price}
                onChange={(e) => handleCigChange(e, index)}
                required
              />
              <InputField
                label="Origin"
                variant="outlined"
                name="origin"
                value={cig.origin}
                onChange={(e) => handleCigChange(e, index)}
                required
              />
              <InputField
                label="Photo"
                variant="outlined"
                name="photo"
                value={cig.photo}
                onChange={(e) => handleCigChange(e, index)}
                required
              />
              <InputField
                label="Description"
                variant="outlined"
                name="description"
                value={cig.description}
                onChange={(e) => handleCigChange(e, index)}
                required
              />
              {index >= 0 && (
                <StyledButton
                  type="button"
                  onClick={() => handleRemoveCig(index)}
                >
                  Remove
                </StyledButton>
              )}
            </div>
          ))}
        <StyledButtonContainer>
          <StyledButton type="button" onClick={handleAddCig}>
            + Cigarette
          </StyledButton>
          <StyledButton type="submit">Add cigarettes to brand</StyledButton>
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
