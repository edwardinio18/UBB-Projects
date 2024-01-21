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

export default function People() {
  return (
    <div>
      <PageWrapper>
        <ColumnWrapper>
          <ColumnTitle>Get</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/get-people">
              <StyledButton variant="contained">Get people</StyledButton>
            </StyledLink>
            <StyledLink to="/get-person-by-id">
              <StyledButton variant="contained">
                Get person by ID
              </StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <ColumnTitle>Add</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/add-person">
              <StyledButton variant="contained">Add a person</StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <ColumnTitle>Update</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/update-person">
              <StyledButton variant="contained">
                Update a person
              </StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
        <ColumnWrapper>
          <ColumnTitle>Delete</ColumnTitle>
          <ButtonWrapper>
            <StyledLink to="/delete-person">
              <StyledButton variant="contained">
                Delete a person
              </StyledButton>
            </StyledLink>
          </ButtonWrapper>
        </ColumnWrapper>
      </PageWrapper>
    </div>
  );
}
