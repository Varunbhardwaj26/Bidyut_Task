import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer py-5 mt-2">
      <Container>

        <Row className="gy-4">
          
          <Col md={4}>
            <div className="d-flex align-items-center flex-wrap gap-1">
              <img
                src="/Codenscious_LOGO.png"
                alt="logo"
                className="footer-logo-img"
              />
              <span className="footer-logo-text ms-2">Codenscious.</span>
              <span className="footer-logo-text" style={{"color":"#648dff"}}>ai</span>
            </div>

            <p className="footer-about">
              We build intelligent and scalable backend systems, automation
              tools, and AI-driven software solutions for modern businesses.
            </p>

            <div className="footer-socials d-flex gap-2">
              <a href="#" target="_blank">
                <i className="bi bi-facebook p-2"></i>
              </a>
              <a href="https://www.instagram.com/codenscious.technology?igsh=YnBhb2RxYmp4YXl3" target="_blank">
                <i className="bi bi-instagram p-2"></i>
              </a>
              <a href="https://www.linkedin.com/company/codenscious-ai/" target="_blank">
                <i className="bi bi-linkedin p-2"></i>
              </a>
              <a href="https://maps.app.goo.gl/EzJn5NpTAi79TnWd9" target="_blank">
                <i className="bi bi-geo-alt p-2"></i>
              </a>
            </div>

          </Col>

          <Col md={2}>
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/career">Career</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </Col>

          <Col md={2}>
            <h5 className="footer-heading">Legal</h5>
            <ul className="footer-links">
              <li>
                <Link to="/PrivacyPolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/TermsConditions">Terms & Conditions</Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="footer-heading">Contact</h5>
            <ul className="footer-contact">
              <li>
                Email: <a href="mailto:info@codenscious.ai"> info@codenscious.ai</a>
              </li>
              <li>Phone: +91 8989452663</li>
              <li>Location: Plot No. 9, Sinhansa IT Park, Dhar Road, Indore (452013) MP, India</li>
            </ul>
          </Col>

        </Row>

        <hr className="footer-divider my-4" />

        <Row>
          <Col className="d-flex justify-content-center justify-content-md-between align-items-center flex-wrap gap-3">
            
            <div className="footer-copy text-center">
              © {new Date().getFullYear()} Codenscious.ai - All Rights Reserved.
            </div>

            <div className="footer-made">
              Designed & Developed by Codenscious.ai Tech Team
            </div>
          </Col>
        </Row>

      </Container>
    </footer>
  );
}
