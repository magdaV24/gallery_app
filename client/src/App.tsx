import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Gallery from "./pages/gallery/Gallery";
import Welcome from "./pages/welcome/Welcome";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./styles/Themes";
import ThemeButton from "./components/ThemeButton";
import Dashboard from "./pages/user/private/Dashboard";
import UserPage from "./pages/user/public/UserPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const light = createTheme(lightTheme);
  const dark = createTheme(darkTheme);

  function handleToggleTheme() {
    setDarkMode((prev) => !prev);
  }

  const theme = darkMode ? dark : light;

  const src_one = "/pexels-photo-3724836.jpeg";
  const src_two = "/pexels-photo-2559741.jpeg";

  const qt_one = "Art is not what you see, but what you make other see.";
  const qt_two = "If I could say it in words then would be no reason to paint.";

  const credit_one = "Edgar Degas";
  const credit_two = "Edward Hopper";

  const quote = darkMode ? qt_one : qt_two;
  const credit = darkMode ? credit_one : credit_two;

  const source = darkMode ? src_one : src_two;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Welcome source={source} quote={quote} credit={credit} />
                }
              />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/:user" element={<UserPage />} />
            </Routes>
          </BrowserRouter>
          <ThemeButton handleToggleTheme={handleToggleTheme} />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
