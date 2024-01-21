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

export default function AddPerson() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
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
    if (!age) {
      setAgeError("Age is required");
      valid = false;
    } else if (isNaN(age)) {
      setAgeError("Age must be a number");
      valid = false;
    } else {
      setAgeError("");
    }
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError("Email is invalid");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!phone) {
      setPhoneError("Phone is required");
      valid = false;
    } else {
      setPhoneError("");
    }
    if (!address) {
      setAddressError("Address is required");
      valid = false;
    } else {
      setAddressError("");
    }

    if (!valid) {
      return;
    }

    const newPerson = {
      name,
      age,
      email,
      phone,
      address,
    };
    try {
      const res = await axios.post(
        "https://api.cigs.io/add_person",
        newPerson
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
        --- Add a person ---
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(nameError)}
          helperText={nameError}
        />
        <InputField
          label="Age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          error={Boolean(ageError)}
          helperText={ageError}
        />
        <InputField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <InputField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={Boolean(phoneError)}
          helperText={phoneError}
        />
        <InputField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={Boolean(addressError)}
          helperText={addressError}
        />
        <StyledButtonContainer>
          <StyledButton type="submit">Add Person</StyledButton>
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
