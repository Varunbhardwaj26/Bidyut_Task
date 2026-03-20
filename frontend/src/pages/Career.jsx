import React from "react";
import "./Career.css";
import lightbulb from "../assets/career-image/lightbulb.png";
import mortarboard from "../assets/career-image/mortarboard.png";
import purpose from "../assets/career-image/purpose.png";
import world from "../assets/career-image/world.png";
import emailjs from "emailjs-com";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Career() {
  const [applyData, setApplyData] = useState({
    name: "",
    email: "",
    phone: "",
    employment_status: "",
    job_position: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setApplyData({
      ...applyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_APPLY_TEMPLATE_ID,
        {
          name: applyData.name,
          email: applyData.email,
          phone: applyData.phone,
          employment_status: applyData.employment_status,
          job_position: applyData.job_position,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setApplyData({
        name: "",
        email: "",
        phone: "",
        employment_status: "",
        job_position: "",
      });
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career">
      <section className="career-hero">
        <div className="container">
          <h1 className="page-title">Career</h1>
          <p className="page-subtitle">
            Comprehensive AI solutions tailored to transform your business
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="left h-100 p-4 p-md-5">
                <h2 className="h4 title mb-3">
                  Shape the Future with <br /> Company
                </h2>

                <p className="lead mb-4">
                  We’re not just building AI solutions, we’re shaping the
                  future of innovation. At Company, we create
                  technologies that empower businesses, transform industries,
                  and redefine what’s possible with intelligence.
                </p>

                <h3 className="h6 why-title mb-3">Why Us?</h3>

                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-start mb-3">
                    <img src={purpose} alt="" className="me-3 icon-img" />
                    <div>Work on cutting-edge AI products</div>
                  </li>

                  <li className="d-flex align-items-start mb-3">
                    <img src={world} alt="" className="me-3 icon-img" />
                    <div>Collaborate with innovators</div>
                  </li>

                  <li className="d-flex align-items-start mb-3">
                    <img src={mortarboard} alt="" className="me-3 icon-img" />
                    <div>Grow skills with mentorship</div>
                  </li>

                  <li className="d-flex align-items-start">
                    <img src={lightbulb} alt="" className="me-3 icon-img" />
                    <div>Creative & impact driven culture</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="right h-100 p-4 p-md-5"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    textAlign: "center",
                    margin: "0 auto",
                  }}
                >
                  <h3 className="apply-title mb-2">Join Our Team</h3>

                  <p
                    className="text-muted"
                    style={{
                      maxWidth: "360px",
                      margin: "0 auto 24px",
                    }}
                  >
                    Explore current opportunities and view open roles.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Link
                      to="/careers/jobs"
                      className="btn btn-primary"
                      style={{
                        width: "280px",
                        height: "52px",
                        borderRadius: "12px",
                        fontWeight: "700",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      View Open Roles
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}