import { useState } from "react";
import { useParams } from "react-router-dom";
import PhoneStep from "../../components/jobportal/PhoneStep";
import OtpStep from "../../components/jobportal/OtpStep";
import ApplicationForm from "../../components/jobportal/ApplicationForm";

function ApplyPage() {
  const { jobId } = useParams();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifyMeta, setVerifyMeta] = useState(null);

  const onPhoneSubmitted = (p) => {
    setPhone(p);
    setOtpVerified(false);
    setVerifyMeta(null);
    setStep("otp");
  };

  const onOtpVerified = (meta) => {
    setOtpVerified(true);
    setVerifyMeta(meta || null);
    setStep("form");
  };

  const onFormSubmitted = () => {
    setStep("done");
  };

  const stepLabel =
    step === "phone"
      ? "Step 1 of 3 · Phone Verification"
      : step === "otp"
      ? "Step 2 of 3 · OTP Verification"
      : step === "form"
      ? "Step 3 of 3 · Application Form"
      : "Completed";

  return (
    <>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f7faff 0%, #eef3fb 100%)",
          padding: "28px 20px 80px",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#e9efff",
                color: "#4f46e5",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              {stepLabel}
            </div>

            <h1
              style={{
                marginTop: "2.5rem",

                fontSize: "2.6rem",
                lineHeight: 1.15,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Apply for Position
            </h1>

            <p
              style={{
                margin: "12px auto 0",
                maxWidth: "760px",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "#64748b",
              }}
            >
              Complete your phone verification and submit your application for
              this role at Company.
            </p>
          </div>

          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            {step === "phone" && (
              <PhoneStep onNext={onPhoneSubmitted} defaultPhone={phone} />
            )}

            {step === "otp" && (
              <OtpStep
                phone={phone}
                onVerified={onOtpVerified}
                onBack={() => setStep("phone")}
              />
            )}

            {step === "form" && (
              <ApplicationForm
                phone={phone}
                verified={otpVerified}
                verifyMeta={verifyMeta}
                jobId={jobId}
                onSubmitted={onFormSubmitted}
                onBack={() => setStep("otp")}
              />
            )}

            {step === "done" && (
              <div
                style={{
                  maxWidth: "720px",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "28px 12px",
                  background: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #e6ecf5",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    margin: "0 auto 16px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "32px",
                    fontWeight: 800,
                    boxShadow: "0 10px 22px rgba(34,197,94,0.20)",
                  }}
                >
                  ✓
                </div>

                <h2
                  style={{
                    margin: "0 0 10px",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#0f172a",
                  }}
                >
                  Application Submitted
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                  }}
                >
                  Thank you for applying. Our team will review your submission
                  and contact you if shortlisted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyPage;