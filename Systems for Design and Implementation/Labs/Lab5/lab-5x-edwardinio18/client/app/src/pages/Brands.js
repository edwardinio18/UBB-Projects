import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const PageWrapper = styled("div")(() => ({
  paddingTop: "50px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
}));

const ColumnWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "50px",
}));

const ColumnTitle = styled("div")(() => ({
  fontFamily: "monospace",
  fontSize: "25px",
  fontWeight: "bold",
  color: "white",
  backgroundColor: "black",
  borderRadius: "10px",
  padding: "15px 30px",
  marginBottom: "20px",
  boxShadow: "0px 7px 10px black",
  textTransform: "uppercase",
}));

const ButtonWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
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

const StyledLink = styled(Link)(({}) => ({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
}));

export default function Brands() {
  return (
    <div>
      <PageWrapper>
        <ColumnWrapper>
          <ColumnTitle>Get</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/get-brands">
              <StyledButton variant="contained">Get brands</StyledButton>
            </StyledLink>
            <StyledLink to="/get-brand-by-id">
              <StyledButton variant="contained">
                Get brand by ID
              </StyledButton>
            </StyledLink>
            <StyledLink to="/get-stats-brand-1">
              <StyledButton variant="contained">Statistics Report 1</StyledButton>
            </StyledLink>
            <StyledLink to="/get-stats-brand-2">
              <StyledButton variant="contained">Statistics Report 2</StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <ColumnTitle>Add</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/add-brand">
              <StyledButton variant="contained">Add a brand</StyledButton>
            </StyledLink>
            <StyledLink to="/add-many-cigarettes-to-brand">
              <StyledButton variant="contained">Add cigarettes to brand</StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <ColumnTitle>Update</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/update-brand">
              <StyledButton variant="contained">
                Update a brand
              </StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <ColumnTitle>Delete</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/delete-brand">
              <StyledButton variant="contained">
                Delete a brand
              </StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
      </PageWrapper>
    </div>
  );
}
