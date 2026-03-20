import { Container } from "react-bootstrap";
import { Row, Col, Carousel } from "react-bootstrap";
import "./serviceslider.css";
import { homeImages  } from "../assets/home-image/home_image";

export default function ServiceSlider() {
  return (
    <div className="slider">
      <Container>
        <Row className="rows">
          <Col>
            <Carousel>
              <Carousel.Item interval={2000}>
                <img src={homeImages.aiConsulting} alt="AI Consulting & Training" />
                <Carousel.Caption>
                  <h3>AI Consulting & Training</h3>
                  <p style={{ color: "#04fcf0ff", fontSize: "20px" }}>
                    Tailored AI solutions to meet your unique business
                    challenges
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  src={homeImages.surveillance}
                  alt="CIVA: Intelligent Video Analytics"
                />
                <Carousel.Caption>
                  <h3>CIVA: Intelligent Video Analytics</h3>
                  <p style={{ color: "#04fcf0ff", fontSize: "20px" }}>
                    Cutting-edge video analytics for enhanced security and
                    insights
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img src={homeImages.software} alt="Software Development" />
                <Carousel.Caption>
                  <h3>Software Development</h3>
                  <p style={{ color: "#04fcf0ff", fontSize: "20px" }}>
                    Robust software solutions built for scalability and
                    performance
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img src={homeImages.img4} alt="Agentic AI & Voice AI" />
                <Carousel.Caption>
                  <h3>Agentic AI & Voice AI</h3>
                  <p style={{ color: "#04fcf0ff", fontSize: "20px" }}>
                    Intelligent AI agents and voice-driven systems for enhanced
                    user interaction
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img src={homeImages.finance} alt="Fintech" />
                <Carousel.Caption>
                  <h3>Fintech</h3>
                  <p style={{ color: "#04fcf0ff", fontSize: "20px" }}>
                    Innovative financial technology solutions to streamline your
                    operations
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img src={homeImages.aiProduct} alt="AI Product Development" />
                <Carousel.Caption>
                  <h3>AI Product Development</h3>
                  <p style={{ color: "#04fcf0ff", fontSize: "20px" }}>
                    Full-cycle AI product development from concept to deployment
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
