import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from "../images/logo.png";
import axios from "axios";

const BlackAppBar = styled(AppBar)(() => ({
  backgroundColor: "black",
  height: "100px",
}));

const CenteredSpan = styled("span")(() => ({
  fontFamily: "monospace",
  fontSize: "33px",
  margin: 0,
}));

const LogoWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

const LogoImg = styled("img")(() => ({
  height: "80px",
  marginRight: "20px",
  borderRadius: "50px",
}));

const RightButtonGroup = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "100%",
  paddingRight: "10px",
}));

const StyledButton = styled(Button)(({}) => ({
  fontFamily: "monospace",
  color: "white",
  backgroundColor: "transparent",
  border: "2px solid white",
  borderRadius: "10px",
  padding: "13px 50px",
  transition: "all 0.2s",
  fontSize: "17px",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
    borderRadius: "50px",
  },
}));

const CustomButtonWrapper = styled("div")(() => ({
  marginLeft: "20px",
}));

const StyledLink = styled(Link)(({}) => ({
  color: "white",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
}));

export default function Header() {
  const [msg, setMsg] = useState();

  useEffect(() => {
    axios
      .get("https://api.cigs.io/api")
      .then((res) => {
        setMsg(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BlackAppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <LogoWrapper>
          <Link to="/">
            <LogoImg src={Logo} />
          </Link>
          <CenteredSpan>{msg}</CenteredSpan>
        </LogoWrapper>
        <RightButtonGroup>
          <CustomButtonWrapper>
            <StyledLink to="/cigarettes">
              <StyledButton variant="contained">Cigarettes</StyledButton>
            </StyledLink>
          </CustomButtonWrapper>
          <CustomButtonWrapper>
            <StyledLink to="/brands">
              <StyledButton variant="contained">Brands</StyledButton>
            </StyledLink>
          </CustomButtonWrapper>
          <CustomButtonWrapper>
            <StyledLink to="/people">
              <StyledButton variant="contained">People</StyledButton>
            </StyledLink>
          </CustomButtonWrapper>
        </RightButtonGroup>
      </Toolbar>
    </BlackAppBar>
  );
}
