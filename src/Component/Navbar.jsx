import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useTheme } from "../utils/useContect";

const NavbarComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`app-container ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <Navbar bg={theme} variant={theme} expand="lg">
        <Container>
          <Navbar.Brand href="#home">Onebox</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <button
              className="btn btn-primary"
              onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
            >
              Switch to {theme === "light" ? "Dark" : "Light"} Theme
            </button>
            <Navbar.Text>
              Signed in as: <a href="#login">Nithish</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
