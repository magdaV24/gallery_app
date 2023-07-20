import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/AuthContextProvider";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useNavigate } from "react-router-dom";
import EntryForm from "../forms/EntryForm";
import { useState } from "react";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";
import Login from "../forms/Login";
import Register from "../forms/Register";

function Navbar() {
  const [showForm, setShowForm] = useState(false);
  function closeForm() {
    setShowForm(false);
  }

  const [showLogin, setShowLogin] = useState(false);
  function closeLogin() {
    setShowLogin(false);
  }


  const [showRegister, setShowRegister] = useState(false);
  function closeRegister() {
    setShowRegister(false);
  }

  const cld  = cloudinaryFnc();

  const { currentUser } = React.useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  console.log(currentUser.token)

  return (
    <>
      <AppBar position="fixed" >
        <Container>
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex" }}>
              <DrawOutlinedIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ART GALLERY
              </Typography>
            </Box>
            {currentUser && (
              <Box>
                <Button
                  variant="outlined"
                  sx={{ color: "white", border: "1px solid white" }}
                  onClick={() => setShowForm((prev: any) => !prev)}
                >
                  <AddBoxOutlinedIcon sx={{ mr: 1 }} /> ADD AN ENTRY
                </Button>
              </Box>
            )}

            {currentUser && (
              <Box
                sx={{
                  width: "15vw",
                  display: "flex",
                  justifyContent: "center",
                  gap: "1vw",
                }}
              >
                <Box>
                  <IconButton sx={{ p: 0 }} href='/dashboard'>
                    {currentUser && (
                      <AdvancedImage
                        cldImg={cld
                          .image(currentUser.avatar)
                          .resize(fill().width(50).height(50))}
                      />
                    )}
                  </IconButton>
                </Box>
                <Button
                  variant="outlined"
                  sx={{ color: "white", border: "1px solid white" }}
                  onClick={handleLogout}
                >
                  LOGOUT
                </Button>
              </Box>
            )}
            {!currentUser && (
              <Box>
                <Button
                  variant="outlined"
                  sx={{ color: "white", border: "1px solid white", mr: "1vh" }}
                  onClick={() => setShowLogin((prev: any) => !prev)}
                >
                  LOGIN
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "white", border: "1px solid white", mr: "1vh" }}
                  onClick={() => setShowRegister((prev: any) => !prev)}
                >
                  REGISTER
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {currentUser && <EntryForm open={showForm} handleClose={closeForm} />}
      <Login open={showLogin} handleClose={closeLogin } />
      <Register open={showRegister} handleClose={closeRegister} />
    </>
  );
}
export default Navbar;
