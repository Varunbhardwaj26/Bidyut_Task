import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => setExpanded(false);

  return (
    <Navbar expand="lg" className="navigation" fixed="top" expanded={expanded}>
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="logo d-flex align-items-center"
          onClick={handleClose}
        >
          <img className="logo-image" src="/logo3-rbg.png" alt="logo" />
          <span className="logo-text ms-2">Codenscious.</span>
          <span className="logo-text ai">ai</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={handleClose}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
              onClick={handleClose}
            >
              About
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/services"
              className={location.pathname === "/services" ? "active" : ""}
              onClick={handleClose}
            >
              Services
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/career"
              className={location.pathname === "/career" ? "active" : ""}
              onClick={handleClose}
            >
              Career
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
              onClick={handleClose}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
