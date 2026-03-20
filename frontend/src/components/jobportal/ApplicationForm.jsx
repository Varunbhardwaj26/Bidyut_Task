// import { useState } from "react";
// import { applyApplicant } from "../../services/jobPortalApi";

// export default function ApplicationForm({
//   verified,
//   phone,
//   verifyMeta,
//   jobId,
//   onSubmitted,
//   onBack,
// }) {
//   const [page, setPage] = useState(1);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     currentCity: "",
//     parentName: "",
//     parentOccupation: "",
//     parentPhone: "",
//     collegeName: "",
//     graduationYear: "",
//     branch: "",
//     linkedin: "",
//     github: "",
//     technicalChallenge: "",
//     missingSkills: "",
//     guidanceNeeded: "",
//     currentStand: "",
//     engagementPlan: "",
//     expectedOutcomes: "",
//   });

//   const [resumeFile, setResumeFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [err, setErr] = useState("");

//   const handleChange = (e) => {
//     setErr("");
//     setMsg("");
//     const { name, value, type, files } = e.target;

//     if (type === "file") {
//   const file = files?.[0] || null;

//   if (!file) {
//     setResumeFile(null);
//     return;
//   }

//   const maxSize = 10 * 1024 * 1024; // 10MB

//   if (file.size > maxSize) {
//     setErr("Resume size must be less than 10MB");
//     e.target.value = "";
//     setResumeFile(null);
//     return;
//   }

//   setErr("");
//   setResumeFile(file);
//   return;
// }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "14px 16px",
//     borderRadius: 12,
//     border: "1px solid #dbe3ef",
//     background: "#ffffff",
//     color: "#0f172a",
//     fontSize: 15,
//     outline: "none",
//     boxSizing: "border-box",
//     boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
//   };

//   const labelStyle = {
//     display: "block",
//     marginBottom: 8,
//     fontSize: 14,
//     fontWeight: 700,
//     color: "#0f172a",
//     lineHeight: 1.5,
//   };

//   const helperTextStyle = {
//     color: "#475569",
//     fontSize: "0.95rem",
//     lineHeight: 1.75,
//     marginBottom: 12,
//   };

//   const cardStyle = {
//     background: "#ffffff",
//     border: "1px solid #e6ecf5",
//     borderRadius: 20,
//     padding: "24px",
//     boxShadow: "0 10px 26px rgba(15, 23, 42, 0.05)",
//   };

//   const optionCardStyle = (checked) => ({
//     display: "flex",
//     gap: 12,
//     alignItems: "flex-start",
//     padding: "14px 16px",
//     borderRadius: 14,
//     border: checked ? "1px solid #7c3aed" : "1px solid #dbe3ef",
//     background: checked
//       ? "linear-gradient(180deg, #faf7ff 0%, #f4f1ff 100%)"
//       : "#ffffff",
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//     boxShadow: checked
//       ? "0 8px 20px rgba(124,58,237,0.08)"
//       : "0 2px 8px rgba(15,23,42,0.03)",
//   });

//   const optionDotOuter = (checked) => ({
//     width: 18,
//     height: 18,
//     minWidth: 18,
//     borderRadius: "999px",
//     border: checked ? "2px solid #6d5efc" : "2px solid #94a3b8",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 2,
//     background: "#ffffff",
//   });

//   const optionDotInner = (checked) => ({
//     width: 8,
//     height: 8,
//     borderRadius: "999px",
//     background: checked
//       ? "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)"
//       : "transparent",
//   });

//   const validatePage = () => {
//     if (page === 1) {
//       if (
//         !formData.name ||
//         !formData.email ||
//         !formData.currentCity ||
//         !formData.parentName ||
//         !formData.parentOccupation ||
//         !formData.parentPhone
//       ) {
//         setErr("Please fill all required fields in this section.");
//         return false;
//       }
//     }

//     if (page === 2) {
//       if (
//         !formData.collegeName ||
//         !formData.graduationYear ||
//         !formData.branch ||
//         !formData.linkedin ||
//         !formData.github
//       ) {
//         setErr("Please fill all required fields in this section.");
//         return false;
//       }
//     }

//     if (page === 3) {
//       if (
//         !formData.technicalChallenge ||
//         !formData.missingSkills ||
//         !formData.guidanceNeeded ||
//         !formData.currentStand ||
//         !formData.engagementPlan ||
//         !formData.expectedOutcomes ||
//         !resumeFile
//       ) {
//         setErr("Please fill all required fields and upload resume.");
//         return false;
//       }
//     }

//     setErr("");
//     return true;
//   };

//   const nextPage = () => {
//     if (validatePage()) setPage((prev) => prev + 1);
//   };

//   const prevPage = () => {
//     setErr("");
//     setPage((prev) => prev - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setMsg("");

//     if (!verified) {
//       setErr("Please verify OTP first.");
//       return;
//     }

//     if (!jobId) {
//       setErr("Job ID missing.");
//       return;
//     }

//     if (!validatePage()) return;

//     setLoading(true);

//     try {
//       // IMPORTANT FOR FUTURE BACKEND INTEGRATION - KEEP THIS COMMENT
//       console.log("Submitting application:", {
//         jobId,
//         phone,
//         verifyMeta,
//         formData,
//         resumeFileName: resumeFile?.name || "",
//       });

//       const payload = {
//         ...formData,
//          parentPhone: `+91${formData.parentPhone}`,
//         phone_no: phone,
//         resume: resumeFile,
//       };

//       const response = await applyApplicant(jobId, payload);

//       setMsg(response?.message || "Application submitted successfully.");
//       if (typeof onSubmitted === "function") {
//         onSubmitted(response);
//       }
//     } catch (error) {
//       setErr(error.message || "Failed to submit application");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
      
//       <div style={{ display: "grid", gap: 20 }}>
//         <div style={cardStyle}>
//           <h2
//             style={{
//               fontSize: "1.9rem",
//               fontWeight: 800,
//               color: "#0f172a",
//               margin: "0 0 10px",
//               lineHeight: 1.2,
//             }}
//           >
//             AI Engineering Training & Internship
//           </h2>

//           <p style={helperTextStyle}>
//             This form is a part of the selection process for Company
//             Technologies Pvt. Ltd.’s AI Engineering Training & Internship
//             Program.
//           </p>

//           <p style={helperTextStyle}>
//             Please note that not all applicants will be selected. Shortlisted
//             candidates may be invited for further evaluation or an interaction
//             round before the final selection.
//           </p>

//           <p style={helperTextStyle}>
//             We encourage you to answer honestly and thoughtfully.
//           </p>

//           <p style={{ ...helperTextStyle, marginBottom: 16 }}>
//             Clarity and self-awareness matter more than simply giving the “right”
//             answers.
//           </p>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: 14,
//               background: "#f8fbff",
//               border: "1px solid #e6eef9",
//               borderRadius: 14,
//               padding: "14px 16px",
//               color: "#475569",
//               fontSize: 14,
//               lineHeight: 1.7,
//             }}
//           >
//             <div>
//               <strong style={{ color: "#0f172a" }}>Verified Phone:</strong>{" "}
//               {phone}
//             </div>
//             <div>
//               <strong style={{ color: "#0f172a" }}>Selected Job ID:</strong>{" "}
//               {jobId}
//             </div>
//           </div>
//         </div>

//         <div style={cardStyle}>
//           <div
//             style={{
//               display: "flex",
//               gap: 12,
//               marginBottom: 24,
//               flexWrap: "wrap",
//             }}
//           >
//             {[1, 2, 3].map((stepNum) => (
//               <div
//                 key={stepNum}
//                 style={{
//                   flex: 1,
//                   minWidth: 160,
//                   padding: "12px 16px",
//                   borderRadius: 12,
//                   textAlign: "center",
//                   fontWeight: 700,
//                   fontSize: 14,
//                   background:
//                     page === stepNum
//                       ? "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)"
//                       : "#f1f5f9",
//                   color: page === stepNum ? "#ffffff" : "#475569",
//                 }}
//               >
//                 {stepNum === 1 && "Basic Details"}
//                 {stepNum === 2 && "Education"}
//                 {stepNum === 3 && "Application"}
//               </div>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
//             {page === 1 && (
//               <>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
//                     gap: 18,
//                   }}
//                 >
//                   <div>
//                     <label style={labelStyle}>Name *</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>Phone Number *</label>
//                     <input
//                       type="text"
//                       value={phone}
//                       readOnly
//                       style={{
//                         ...inputStyle,
//                         background: "#f8fafc",
//                         color: "#334155",
//                       }}
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>Email *</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Enter your email"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>Current City Of Residence *</label>
//                     <input
//                       type="text"
//                       name="currentCity"
//                       value={formData.currentCity}
//                       onChange={handleChange}
//                       placeholder="Enter your current city"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>Father/Mother Name *</label>
//                     <input
//                       type="text"
//                       name="parentName"
//                       value={formData.parentName}
//                       onChange={handleChange}
//                       placeholder="Enter parent name"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>
//                       Father's/Mother's Occupation *
//                     </label>
//                     <input
//                       type="text"
//                       name="parentOccupation"
//                       value={formData.parentOccupation}
//                       onChange={handleChange}
//                       placeholder="Enter occupation"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* <div>
//                   <label style={labelStyle}>
//                     Father's/Mother's Phone Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="parentPhone"
//                     value={formData.parentPhone}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//                 */}
//              <div>
//          <label style={labelStyle}>
//          Father's/Mother's Phone Number *
//          </label>
//           <div
//           style={{
//         display: "flex",
//       alignItems: "center",
//       border: "1px solid #dbe3f0",
//       borderRadius: "14px",
//       overflow: "hidden",
//       background: "#fff",
//     }}
//   >
//     <span
//       style={{
//         padding: "0 14px",
//         fontWeight: 600,
//         color: "#1e293b",
//         background: "#f8fafc",
//         borderRight: "1px solid #dbe3f0",
//         minHeight: "60px",
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       +91
//     </span>

//     <input
//       type="text"
//       name="parentPhone"
//       value={formData.parentPhone}
//       onChange={(e) => {
//         const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
//         setFormData((prev) => ({
//           ...prev,
//           parentPhone: onlyDigits,
//         }));
//       }}
//       placeholder="Enter 10 digit phone number"
//       style={{
//            ...inputStyle,
//            border: "none",
//            outline: "none",
//            boxShadow: "none",
//            flex: 1,
//             }}
//           maxLength={10}
//           required
//           />
//         </div>
//        </div>
//               </>
//             )}

//             {page === 2 && (
//               <>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
//                     gap: 18,
//                   }}
//                 >
//                   <div>
//                     <label style={labelStyle}>College Name *</label>
//                     <input
//                       type="text"
//                       name="collegeName"
//                       value={formData.collegeName}
//                       onChange={handleChange}
//                       placeholder="Enter your college name"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>
//                       Year of Graduation / Pass-out Year *
//                     </label>
//                     <select
//                       name="graduationYear"
//                       value={formData.graduationYear}
//                       onChange={handleChange}
//                       style={{ ...inputStyle, height: 52 }}
//                       required
//                     >
//                       <option value="">Select graduation year</option>
//                       <option value="2020">2020</option>
//                       <option value="2021">2021</option>
//                       <option value="2022">2022</option>
//                       <option value="2023">2023</option>
//                       <option value="2024">2024</option>
//                       <option value="2025">2025</option>
//                       <option value="2026">2026</option>
//                       <option value="2027">2027</option>
//                       <option value="2028">2028</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label style={labelStyle}>Branch *</label>
//                     <input
//                       type="text"
//                       name="branch"
//                       value={formData.branch}
//                       onChange={handleChange}
//                       placeholder="Enter your branch"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>LinkedIn URL *</label>
//                     <input
//                       type="url"
//                       name="linkedin"
//                       value={formData.linkedin}
//                       onChange={handleChange}
//                       placeholder="Enter your LinkedIn profile URL"
//                       style={inputStyle}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label style={labelStyle}>GitHub URL *</label>
//                   <input
//                     type="url"
//                     name="github"
//                     value={formData.github}
//                     onChange={handleChange}
//                     placeholder="Enter your GitHub profile URL"
//                     style={inputStyle}
//                     required
//                   />
//                 </div>
//               </>
//             )}

//             {page === 3 && (
//               <>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: 18,
//                   }}
//                 >
//                   <div>
//                     <label style={labelStyle}>
//                       What is the most technically difficult thing you have
//                       personally built so far? *
//                     </label>
//                     <textarea
//                       name="technicalChallenge"
//                       value={formData.technicalChallenge}
//                       onChange={handleChange}
//                       placeholder="Write your answer"
//                       style={{
//                         ...inputStyle,
//                         minHeight: 130,
//                         resize: "vertical",
//                       }}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>
//                       What do you believe you are missing despite degree/courses
//                       you've done? *
//                     </label>
//                     <textarea
//                       name="missingSkills"
//                       value={formData.missingSkills}
//                       onChange={handleChange}
//                       placeholder="Write your answer"
//                       style={{
//                         ...inputStyle,
//                         minHeight: 130,
//                         resize: "vertical",
//                       }}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>
//                       What kind of guidance do you think you need at this stage?
//                       *
//                     </label>
//                     <textarea
//                       name="guidanceNeeded"
//                       value={formData.guidanceNeeded}
//                       onChange={handleChange}
//                       placeholder="Write your answer"
//                       style={{
//                         ...inputStyle,
//                         minHeight: 130,
//                         resize: "vertical",
//                       }}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label style={labelStyle}>
//                       What outcomes are you expecting from this program? *
//                     </label>
//                     <textarea
//                       name="expectedOutcomes"
//                       value={formData.expectedOutcomes}
//                       onChange={handleChange}
//                       placeholder="Write your answer"
//                       style={{
//                         ...inputStyle,
//                         minHeight: 130,
//                         resize: "vertical",
//                       }}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label style={labelStyle}>
//                     Which statement best describes where you honestly stand right
//                     now? *
//                   </label>

//                   <div style={{ display: "grid", gap: 12 }}>
//                     <label
//                       style={optionCardStyle(
//                         formData.currentStand === "strong_ai"
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="currentStand"
//                         value="strong_ai"
//                         checked={formData.currentStand === "strong_ai"}
//                         onChange={handleChange}
//                         style={{ display: "none" }}
//                       />
//                       <span
//                         style={optionDotOuter(
//                           formData.currentStand === "strong_ai"
//                         )}
//                       >
//                         <span
//                           style={optionDotInner(
//                             formData.currentStand === "strong_ai"
//                           )}
//                         />
//                       </span>
//                       <span>
//                         I already have strong AI fundamentals and hands-on
//                         experience. I’m confident I can clear company's
//                         difficult interview for a paid internship and PPO without
//                         additional training.
//                       </span>
//                     </label>

//                     <label
//                       style={optionCardStyle(
//                         formData.currentStand === "gaps_need_training"
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="currentStand"
//                         value="gaps_need_training"
//                         checked={
//                           formData.currentStand === "gaps_need_training"
//                         }
//                         onChange={handleChange}
//                         style={{ display: "none" }}
//                       />
//                       <span
//                         style={optionDotOuter(
//                           formData.currentStand === "gaps_need_training"
//                         )}
//                       >
//                         <span
//                           style={optionDotInner(
//                             formData.currentStand === "gaps_need_training"
//                           )}
//                         />
//                       </span>
//                       <span>
//                         I have worked with AI/ML, but I know there are gaps. I am
//                         willing to undergo serious training if it meaningfully
//                         improves my chances of earning a strong internship + PPO
//                         opportunity.
//                       </span>
//                     </label>

//                     <label
//                       style={optionCardStyle(
//                         formData.currentStand === "limited_knowledge"
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="currentStand"
//                         value="limited_knowledge"
//                         checked={formData.currentStand === "limited_knowledge"}
//                         onChange={handleChange}
//                         style={{ display: "none" }}
//                       />
//                       <span
//                         style={optionDotOuter(
//                           formData.currentStand === "limited_knowledge"
//                         )}
//                       >
//                         <span
//                           style={optionDotInner(
//                             formData.currentStand === "limited_knowledge"
//                           )}
//                         />
//                       </span>
//                       <span>
//                         I am mainly looking for a stipend, internship, or PPO,
//                         even though my current AI knowledge is limited.
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label style={labelStyle}>
//                     Given your current level and goals, how do you expect to
//                     engage with this program if selected? *
//                   </label>

//                   <div style={{ display: "grid", gap: 12 }}>
//                     <label
//                       style={optionCardStyle(
//                         formData.engagementPlan === "pay_personally"
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="engagementPlan"
//                         value="pay_personally"
//                         checked={
//                           formData.engagementPlan === "pay_personally"
//                         }
//                         onChange={handleChange}
//                         style={{ display: "none" }}
//                       />
//                       <span
//                         style={optionDotOuter(
//                           formData.engagementPlan === "pay_personally"
//                         )}
//                       >
//                         <span
//                           style={optionDotInner(
//                             formData.engagementPlan === "pay_personally"
//                           )}
//                         />
//                       </span>
//                       <span>
//                         I am willing to pay the training fee personally if the
//                         program is valuable and I am selected.
//                       </span>
//                     </label>

//                     <label
//                       style={optionCardStyle(
//                         formData.engagementPlan === "partial_scholarship"
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="engagementPlan"
//                         value="partial_scholarship"
//                         checked={
//                           formData.engagementPlan === "partial_scholarship"
//                         }
//                         onChange={handleChange}
//                         style={{ display: "none" }}
//                       />
//                       <span
//                         style={optionDotOuter(
//                           formData.engagementPlan === "partial_scholarship"
//                         )}
//                       >
//                         <span
//                           style={optionDotInner(
//                             formData.engagementPlan === "partial_scholarship"
//                           )}
//                         />
//                       </span>
//                       <span>
//                         I would require partial scholarship or merit-based
//                         support, depending on my performance and selection.
//                       </span>
//                     </label>

//                     <label
//                       style={optionCardStyle(
//                         formData.engagementPlan === "fully_sponsored"
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="engagementPlan"
//                         value="fully_sponsored"
//                         checked={
//                           formData.engagementPlan === "fully_sponsored"
//                         }
//                         onChange={handleChange}
//                         style={{ display: "none" }}
//                       />
//                       <span
//                         style={optionDotOuter(
//                           formData.engagementPlan === "fully_sponsored"
//                         )}
//                       >
//                         <span
//                           style={optionDotInner(
//                             formData.engagementPlan === "fully_sponsored"
//                           )}
//                         />
//                       </span>
//                       <span>
//                         I can participate only if the program is fully sponsored
//                         and guaranteed stipend/PPO.
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label style={labelStyle}>Resume *</label>
//                   <input
//                     type="file"
//                     name="resume"
//                     accept=".pdf,application/pdf"
//                     onChange={handleChange}
//                     style={inputStyle}
//                     required
//                   />
//                   <p
//                     style={{
//                       marginTop: 8,
//                       marginBottom: 0,
//                       color: "#64748b",
//                       fontSize: 13,
//                     }}
//                   >
//                     Upload 1 supported file: PDF. Max 10 MB.
//                   </p>
//                 </div>
//               </>
//             )}

//             {err && (
//               <div
//                 style={{
//                   color: "#dc2626",
//                   fontSize: 14,
//                   background: "#fef2f2",
//                   border: "1px solid #fecaca",
//                   padding: "12px 14px",
//                   borderRadius: 12,
//                 }}
//               >
//                 {err}
//               </div>
//             )}

//             {msg && (
//               <div
//                 style={{
//                   color: "#166534",
//                   fontSize: 14,
//                   background: "#f0fdf4",
//                   border: "1px solid #bbf7d0",
//                   padding: "12px 14px",
//                   borderRadius: 12,
//                 }}
//               >
//                 {msg}
//               </div>
//             )}

//             <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
//               {page === 1 ? (
//                 <button
//                   type="button"
//                   onClick={onBack}
//                   style={{
//                     flex: 1,
//                     padding: "13px 16px",
//                     borderRadius: 12,
//                     border: "1px solid #dbe3ef",
//                     background: "#ffffff",
//                     color: "#0f172a",
//                     cursor: "pointer",
//                     fontWeight: 700,
//                   }}
//                 >
//                   Back
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={prevPage}
//                   style={{
//                     flex: 1,
//                     padding: "13px 16px",
//                     borderRadius: 12,
//                     border: "1px solid #dbe3ef",
//                     background: "#ffffff",
//                     color: "#0f172a",
//                     cursor: "pointer",
//                     fontWeight: 700,
//                   }}
//                 >
//                   Previous
//                 </button>
//               )}

//               {page < 3 ? (
//                 <button
//                   type="button"
//                   onClick={nextPage}
//                   style={{
//                     flex: 1,
//                     padding: "13px 16px",
//                     borderRadius: 12,
//                     border: "none",
//                     cursor: "pointer",
//                     fontWeight: 700,
//                     fontSize: 15,
//                     color: "#ffffff",
//                     background:
//                       "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)",
//                     boxShadow: "0 10px 22px rgba(89,118,248,0.24)",
//                   }}
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     flex: 1,
//                     padding: "13px 16px",
//                     borderRadius: 12,
//                     border: "none",
//                     cursor: "pointer",
//                     fontWeight: 700,
//                     fontSize: 15,
//                     color: "#ffffff",
//                     background:
//                       "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)",
//                     boxShadow: "0 10px 22px rgba(89,118,248,0.24)",
//                     opacity: loading ? 0.85 : 1,
//                   }}
//                 >
//                   {loading ? "Submitting..." : "Submit Application"}
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// } 




import { useState } from "react";
import { applyApplicant } from "../../services/jobPortalApi";

export default function ApplicationForm({
  verified,
  phone,
  verifyMeta,
  jobId,
  onSubmitted,
  onBack,
}) {
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentCity: "",
    parentName: "",
    parentOccupation: "",
    parentPhone: "",
    collegeName: "",
    graduationYear: "",
    branch: "",
    linkedin: "",
    github: "",
    technicalChallenge: "",
    missingSkills: "",
    guidanceNeeded: "",
    currentStand: "",
    engagementPlan: "",
    expectedOutcomes: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const isValidIndianPhone = (value) => /^[6-9]\d{9}$/.test(value.trim());

  const isValidLinkedinUrl = (value) => {
    const trimmed = value.trim();
    try {
      const url = new URL(trimmed);
      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        (url.hostname === "linkedin.com" ||
          url.hostname === "www.linkedin.com" ||
          url.hostname.endsWith(".linkedin.com"))
      );
    } catch {
      return false;
    }
  };

  const isValidGithubUrl = (value) => {
    const trimmed = value.trim();
    try {
      const url = new URL(trimmed);
      return (
        (url.protocol === "http:" || url.protocol === "https:") &&
        (url.hostname === "github.com" ||
          url.hostname === "www.github.com" ||
          url.hostname.endsWith(".github.com"))
      );
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    setErr("");
    setMsg("");
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files?.[0] || null;

      if (!file) {
        setResumeFile(null);
        return;
      }

      const maxSize = 10 * 1024 * 1024;

      if (file.type !== "application/pdf") {
        setErr("Only PDF resume is allowed.");
        e.target.value = "";
        setResumeFile(null);
        return;
      }

      if (file.size > maxSize) {
        setErr("Resume size must be less than 10MB");
        e.target.value = "";
        setResumeFile(null);
        return;
      }

      setErr("");
      setResumeFile(file);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #dbe3ef",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.5,
  };

  const helperTextStyle = {
    color: "#475569",
    fontSize: "0.95rem",
    lineHeight: 1.75,
    marginBottom: 12,
  };

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #e6ecf5",
    borderRadius: 20,
    padding: "24px",
    boxShadow: "0 10px 26px rgba(15, 23, 42, 0.05)",
  };

  const optionCardStyle = (checked) => ({
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    padding: "14px 16px",
    borderRadius: 14,
    border: checked ? "1px solid #7c3aed" : "1px solid #dbe3ef",
    background: checked
      ? "linear-gradient(180deg, #faf7ff 0%, #f4f1ff 100%)"
      : "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: checked
      ? "0 8px 20px rgba(124,58,237,0.08)"
      : "0 2px 8px rgba(15,23,42,0.03)",
  });

  const optionDotOuter = (checked) => ({
    width: 18,
    height: 18,
    minWidth: 18,
    borderRadius: "999px",
    border: checked ? "2px solid #6d5efc" : "2px solid #94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    background: "#ffffff",
  });

  const optionDotInner = (checked) => ({
    width: 8,
    height: 8,
    borderRadius: "999px",
    background: checked
      ? "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)"
      : "transparent",
  });

  const validatePage = () => {
    if (page === 1) {
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.currentCity.trim() ||
        !formData.parentName.trim() ||
        !formData.parentOccupation.trim() ||
        !formData.parentPhone.trim()
      ) {
        setErr("Please fill all required fields in this section.");
        return false;
      }

      if (!isValidIndianPhone(formData.parentPhone)) {
        setErr(
          "Parent phone number must be a valid 10-digit Indian mobile number."
        );
        return false;
      }
    }

    if (page === 2) {
      if (
        !formData.collegeName.trim() ||
        !formData.graduationYear.trim() ||
        !formData.branch.trim() ||
        !formData.linkedin.trim() ||
        !formData.github.trim()
      ) {
        setErr("Please fill all required fields in this section.");
        return false;
      }

      if (!isValidLinkedinUrl(formData.linkedin)) {
        setErr("Please enter a valid LinkedIn URL.");
        return false;
      }

      if (!isValidGithubUrl(formData.github)) {
        setErr("Please enter a valid GitHub URL.");
        return false;
      }
    }

    if (page === 3) {
      if (
        !formData.technicalChallenge.trim() ||
        !formData.missingSkills.trim() ||
        !formData.guidanceNeeded.trim() ||
        !formData.currentStand.trim() ||
        !formData.engagementPlan.trim() ||
        !formData.expectedOutcomes.trim() ||
        !resumeFile
      ) {
        setErr("Please fill all required fields and upload resume.");
        return false;
      }

      if (resumeFile && resumeFile.type !== "application/pdf") {
        setErr("Only PDF resume is allowed.");
        return false;
      }

      if (resumeFile && resumeFile.size > 10 * 1024 * 1024) {
        setErr("Resume size must be less than 10MB.");
        return false;
      }
    }

    setErr("");
    return true;
  };

  const nextPage = () => {
    if (validatePage()) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setErr("");
    setPage((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!verified) {
      setErr("Please verify OTP first.");
      return;
    }

    if (!jobId) {
      setErr("Job ID missing.");
      return;
    }

    if (!validatePage()) return;

    setLoading(true);

    try {
      console.log("Submitting application:", {
        jobId,
        phone,
        verifyMeta,
        formData,
        resumeFileName: resumeFile?.name || "",
      });

      const payload = {
        ...formData,
        parentPhone: `+91${formData.parentPhone}`,
        phone_no: phone,
        resume: resumeFile,
      };

      const response = await applyApplicant(jobId, payload);

      setMsg(response?.message || "Application submitted successfully.");
      if (typeof onSubmitted === "function") {
        onSubmitted(response);
      }
    } catch (error) {
      setErr(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: "grid", gap: 20 }}>
        <div style={cardStyle}>
          <h2
            style={{
              fontSize: "1.9rem",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 10px",
              lineHeight: 1.2,
            }}
          >
            AI Engineering Training & Internship
          </h2>

          <p style={helperTextStyle}>
            This form is a part of the selection process for Company
            Technologies Pvt. Ltd.’s AI Engineering Training & Internship
            Program.
          </p>

          <p style={helperTextStyle}>
            Please note that not all applicants will be selected. Shortlisted
            candidates may be invited for further evaluation or an interaction
            round before the final selection.
          </p>

          <p style={helperTextStyle}>
            We encourage you to answer honestly and thoughtfully.
          </p>

          <p style={{ ...helperTextStyle, marginBottom: 16 }}>
            Clarity and self-awareness matter more than simply giving the “right”
            answers.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              background: "#f8fbff",
              border: "1px solid #e6eef9",
              borderRadius: 14,
              padding: "14px 16px",
              color: "#475569",
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            <div>
              <strong style={{ color: "#0f172a" }}>Verified Phone:</strong>{" "}
              {phone}
            </div>
            <div>
              <strong style={{ color: "#0f172a" }}>Selected Job ID:</strong>{" "}
              {jobId}
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                style={{
                  flex: 1,
                  minWidth: 160,
                  padding: "12px 16px",
                  borderRadius: 12,
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  background:
                    page === stepNum
                      ? "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)"
                      : "#f1f5f9",
                  color: page === stepNum ? "#ffffff" : "#475569",
                }}
              >
                {stepNum === 1 && "Basic Details"}
                {stepNum === 2 && "Education"}
                {stepNum === 3 && "Application"}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
            {page === 1 && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 18,
                  }}
                >
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="text"
                      value={phone}
                      readOnly
                      style={{
                        ...inputStyle,
                        background: "#f8fafc",
                        color: "#334155",
                      }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Current City Of Residence *</label>
                    <input
                      type="text"
                      name="currentCity"
                      value={formData.currentCity}
                      onChange={handleChange}
                      placeholder="Enter your current city"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Father/Mother Name *</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Enter parent name"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Father's/Mother's Occupation *
                    </label>
                    <input
                      type="text"
                      name="parentOccupation"
                      value={formData.parentOccupation}
                      onChange={handleChange}
                      placeholder="Enter occupation"
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    Father's/Mother's Phone Number *
                  </label>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #dbe3f0",
                      borderRadius: "14px",
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    <span
                      style={{
                        padding: "0 14px",
                        fontWeight: 600,
                        color: "#1e293b",
                        background: "#f8fafc",
                        borderRight: "1px solid #dbe3f0",
                        minHeight: "60px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      +91
                    </span>

                    <input
                      type="text"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) => {
                        setErr("");
                        setMsg("");
                        const onlyDigits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setFormData((prev) => ({
                          ...prev,
                          parentPhone: onlyDigits,
                        }));
                      }}
                      placeholder="Enter 10 digit phone number"
                      style={{
                        ...inputStyle,
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        flex: 1,
                      }}
                      maxLength={10}
                      required
                    />
                  </div>

                  {formData.parentPhone &&
                    !isValidIndianPhone(formData.parentPhone) && (
                      <p
                        style={{
                          marginTop: 8,
                          marginBottom: 0,
                          color: "#dc2626",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        Enter a valid 10-digit Indian mobile number starting
                        with 6, 7, 8, or 9.
                      </p>
                    )}
                </div>
              </>
            )}

            {page === 2 && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 18,
                  }}
                >
                  <div>
                    <label style={labelStyle}>College Name *</label>
                    <input
                      type="text"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      placeholder="Enter your college name"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Year of Graduation / Pass-out Year *
                    </label>
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      style={{ ...inputStyle, height: 52 }}
                      required
                    >
                      <option value="">Select graduation year</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Branch *</label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      placeholder="Enter your branch"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>LinkedIn URL *</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://www.linkedin.com/in/your-profile"
                      style={inputStyle}
                      required
                    />
                    {formData.linkedin &&
                      !isValidLinkedinUrl(formData.linkedin) && (
                        <p
                          style={{
                            marginTop: 8,
                            marginBottom: 0,
                            color: "#dc2626",
                            fontSize: 13,
                            fontWeight: 500,
                          }}
                        >
                          Enter a valid LinkedIn profile URL.
                        </p>
                      )}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>GitHub URL *</label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/your-username"
                    style={inputStyle}
                    required
                  />
                  {formData.github && !isValidGithubUrl(formData.github) && (
                    <p
                      style={{
                        marginTop: 8,
                        marginBottom: 0,
                        color: "#dc2626",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      Enter a valid GitHub profile URL.
                    </p>
                  )}
                </div>
              </>
            )}

            {page === 3 && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 18,
                  }}
                >
                  <div>
                    <label style={labelStyle}>
                      What is the most technically difficult thing you have
                      personally built so far? *
                    </label>
                    <textarea
                      name="technicalChallenge"
                      value={formData.technicalChallenge}
                      onChange={handleChange}
                      placeholder="Write your answer"
                      style={{
                        ...inputStyle,
                        minHeight: 130,
                        resize: "vertical",
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      What do you believe you are missing despite degree/courses
                      you've done? *
                    </label>
                    <textarea
                      name="missingSkills"
                      value={formData.missingSkills}
                      onChange={handleChange}
                      placeholder="Write your answer"
                      style={{
                        ...inputStyle,
                        minHeight: 130,
                        resize: "vertical",
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      What kind of guidance do you think you need at this stage?
                      *
                    </label>
                    <textarea
                      name="guidanceNeeded"
                      value={formData.guidanceNeeded}
                      onChange={handleChange}
                      placeholder="Write your answer"
                      style={{
                        ...inputStyle,
                        minHeight: 130,
                        resize: "vertical",
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      What outcomes are you expecting from this program? *
                    </label>
                    <textarea
                      name="expectedOutcomes"
                      value={formData.expectedOutcomes}
                      onChange={handleChange}
                      placeholder="Write your answer"
                      style={{
                        ...inputStyle,
                        minHeight: 130,
                        resize: "vertical",
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    Which statement best describes where you honestly stand right
                    now? *
                  </label>

                  <div style={{ display: "grid", gap: 12 }}>
                    <label
                      style={optionCardStyle(
                        formData.currentStand === "strong_ai"
                      )}
                    >
                      <input
                        type="radio"
                        name="currentStand"
                        value="strong_ai"
                        checked={formData.currentStand === "strong_ai"}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <span
                        style={optionDotOuter(
                          formData.currentStand === "strong_ai"
                        )}
                      >
                        <span
                          style={optionDotInner(
                            formData.currentStand === "strong_ai"
                          )}
                        />
                      </span>
                      <span>
                        I already have strong AI fundamentals and hands-on
                        experience. I’m confident I can clear company's
                        difficult interview for a paid internship and PPO
                        without additional training.
                      </span>
                    </label>

                    <label
                      style={optionCardStyle(
                        formData.currentStand === "gaps_need_training"
                      )}
                    >
                      <input
                        type="radio"
                        name="currentStand"
                        value="gaps_need_training"
                        checked={
                          formData.currentStand === "gaps_need_training"
                        }
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <span
                        style={optionDotOuter(
                          formData.currentStand === "gaps_need_training"
                        )}
                      >
                        <span
                          style={optionDotInner(
                            formData.currentStand === "gaps_need_training"
                          )}
                        />
                      </span>
                      <span>
                        I have worked with AI/ML, but I know there are gaps. I
                        am willing to undergo serious training if it meaningfully
                        improves my chances of earning a strong internship + PPO
                        opportunity.
                      </span>
                    </label>

                    <label
                      style={optionCardStyle(
                        formData.currentStand === "limited_knowledge"
                      )}
                    >
                      <input
                        type="radio"
                        name="currentStand"
                        value="limited_knowledge"
                        checked={formData.currentStand === "limited_knowledge"}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <span
                        style={optionDotOuter(
                          formData.currentStand === "limited_knowledge"
                        )}
                      >
                        <span
                          style={optionDotInner(
                            formData.currentStand === "limited_knowledge"
                          )}
                        />
                      </span>
                      <span>
                        I am mainly looking for a stipend, internship, or PPO,
                        even though my current AI knowledge is limited.
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>
                    Given your current level and goals, how do you expect to
                    engage with this program if selected? *
                  </label>

                  <div style={{ display: "grid", gap: 12 }}>
                    <label
                      style={optionCardStyle(
                        formData.engagementPlan === "pay_personally"
                      )}
                    >
                      <input
                        type="radio"
                        name="engagementPlan"
                        value="pay_personally"
                        checked={formData.engagementPlan === "pay_personally"}
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <span
                        style={optionDotOuter(
                          formData.engagementPlan === "pay_personally"
                        )}
                      >
                        <span
                          style={optionDotInner(
                            formData.engagementPlan === "pay_personally"
                          )}
                        />
                      </span>
                      <span>
                        I am willing to pay the training fee personally if the
                        program is valuable and I am selected.
                      </span>
                    </label>

                    <label
                      style={optionCardStyle(
                        formData.engagementPlan === "partial_scholarship"
                      )}
                    >
                      <input
                        type="radio"
                        name="engagementPlan"
                        value="partial_scholarship"
                        checked={
                          formData.engagementPlan === "partial_scholarship"
                        }
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <span
                        style={optionDotOuter(
                          formData.engagementPlan === "partial_scholarship"
                        )}
                      >
                        <span
                          style={optionDotInner(
                            formData.engagementPlan === "partial_scholarship"
                          )}
                        />
                      </span>
                      <span>
                        I would require partial scholarship or merit-based
                        support, depending on my performance and selection.
                      </span>
                    </label>

                    <label
                      style={optionCardStyle(
                        formData.engagementPlan === "fully_sponsored"
                      )}
                    >
                      <input
                        type="radio"
                        name="engagementPlan"
                        value="fully_sponsored"
                        checked={
                          formData.engagementPlan === "fully_sponsored"
                        }
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <span
                        style={optionDotOuter(
                          formData.engagementPlan === "fully_sponsored"
                        )}
                      >
                        <span
                          style={optionDotInner(
                            formData.engagementPlan === "fully_sponsored"
                          )}
                        />
                      </span>
                      <span>
                        I can participate only if the program is fully sponsored
                        and guaranteed stipend/PPO.
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Resume *</label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,application/pdf"
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                  <p
                    style={{
                      marginTop: 8,
                      marginBottom: 0,
                      color: "#64748b",
                      fontSize: 13,
                    }}
                  >
                    Upload 1 supported file: PDF. Max 10 MB.
                  </p>
                </div>
              </>
            )}

            {err && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: 14,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  padding: "12px 14px",
                  borderRadius: 12,
                }}
              >
                {err}
              </div>
            )}

            {msg && (
              <div
                style={{
                  color: "#166534",
                  fontSize: 14,
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  padding: "12px 14px",
                  borderRadius: 12,
                }}
              >
                {msg}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              {page === 1 ? (
                <button
                  type="button"
                  onClick={onBack}
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    borderRadius: 12,
                    border: "1px solid #dbe3ef",
                    background: "#ffffff",
                    color: "#0f172a",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={prevPage}
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    borderRadius: 12,
                    border: "1px solid #dbe3ef",
                    background: "#ffffff",
                    color: "#0f172a",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Previous
                </button>
              )}

              {page < 3 ? (
                <button
                  type="button"
                  onClick={nextPage}
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#ffffff",
                    background:
                      "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)",
                    boxShadow: "0 10px 22px rgba(89,118,248,0.24)",
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "13px 16px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#ffffff",
                    background:
                      "linear-gradient(135deg, #5976f8 0%, #7a44af 100%)",
                    boxShadow: "0 10px 22px rgba(89,118,248,0.24)",
                    opacity: loading ? 0.85 : 1,
                  }}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}