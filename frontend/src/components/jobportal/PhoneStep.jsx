import { useState } from "react";
import { startOtp } from "../../services/jobPortalApi";

export default function PhoneStep({ onNext, defaultPhone = "" }) {
  const normalizeToIN = (value) => {
    const raw = String(value || "").trim();
    let digits = raw.replace(/\D/g, "");

    if (digits.startsWith("91")) digits = digits.slice(2);

    digits = digits.slice(0, 10);

    if (digits.length === 0) return "+91 ";

    return `+91 ${digits}`;
  };

  const toApiPhone = (value) => {
    const raw = String(value || "").trim();
    const digits = raw.replace(/\D/g, "").slice(-10);
    return `+91${digits}`;
  };

  const [phone, setPhone] = useState(
    defaultPhone ? normalizeToIN(defaultPhone) : "+91 "
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const p = toApiPhone(phone);
    if (!/^\+91[6-9]\d{9}$/.test(p)) {
      return setError("Enter valid 10-digit Indian mobile number");
    }

    setError("");
    setLoading(true);

    try {
      await startOtp(p);
      onNext(p);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* OLD CODE COMMENTED FOR HISTORY
      ...old code...
      */}

      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={submit}
          style={{
            background: "#ffffff",
            border: "1px solid rgba(99,102,241,0.12)",
            borderRadius: "16px",
            padding: "18px",
            boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #4f6df5 0%, #7c3aed 100%)",
            }}
          />

          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(normalizeToIN(e.target.value))}
              onFocus={() => {
                if (!phone.startsWith("+91 ")) setPhone("+91 ");
              }}
              placeholder="+91 9876543210"
              maxLength={14}
              style={{
                width: "100%",
                height: "48px",
                padding: "0 14px",
                borderRadius: "10px",
                border: "1px solid #d7deea",
                background: "#f8fafc",
                fontSize: "15px",
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
                padding: "9px 10px",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "10px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "15px",
              color: "#ffffff",
              background: "linear-gradient(90deg, #5b74f7 0%, #7c3aed 100%)",
              boxShadow: "0 8px 18px rgba(91,116,247,0.20)",
              opacity: loading ? 0.85 : 1,
            }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </>
  );
}