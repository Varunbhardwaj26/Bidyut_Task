import { useState } from "react";
import { verifyOtp } from "../../services/jobPortalApi";

export default function OtpStep({ phone, onVerified, onBack }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.trim().length < 4) {
      setError("Enter valid OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOtp(phone, otp.trim());
      if (typeof onVerified === "function") {
        onVerified(res || { verified: true });
      }
    } catch (err) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== OLD OTP STEP VERSION COMMENTED - DO NOT DELETE =====
      old otp layout preserved for history
      ===== END OLD OTP STEP VERSION ===== */}

      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={submit}
          style={{
            background: "#ffffff",
            border: "1px solid #e6ecf5",
            borderRadius: "18px",
            padding: "22px",
            boxShadow: "0 10px 26px rgba(15,23,42,0.05)",
          }}
        >
          <div
            style={{
              marginBottom: "18px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: "#f8fbff",
              border: "1px solid #e6eef9",
              color: "#475569",
              fontSize: "15px",
            }}
          >
            OTP sent to: <strong style={{ color: "#0f172a" }}>{phone}</strong>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              Verify OTP
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter OTP"
              maxLength={6}
              style={{
                width: "100%",
                height: "52px",
                padding: "0 16px",
                borderRadius: "12px",
                border: "1px solid #d7deea",
                background: "#ffffff",
                fontSize: "16px",
                color: "#0f172a",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "13px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                padding: "10px 12px",
                borderRadius: "10px",
                marginBottom: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={onBack}
              style={{
                height: "52px",
                borderRadius: "12px",
                border: "1px solid #dbe3ef",
                background: "#ffffff",
                color: "#0f172a",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                height: "52px",
                borderRadius: "12px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "700",
                fontSize: "16px",
                color: "#ffffff",
                background: "linear-gradient(90deg, #5b74f7 0%, #7c3aed 100%)",
                boxShadow: "0 10px 22px rgba(91,116,247,0.24)",
                opacity: loading ? 0.85 : 1,
              }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}