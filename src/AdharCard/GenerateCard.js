import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./GenerateCard.css";

export default function GenerateCard() {
  const [aadharNumber, setAadharNumber] = useState("");
  const [reenterAadharNumber, setReenterAadharNumber] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [aadharDetails, setAadharDetails] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleGenerateAadhar = () => {
    const errors = {};

    if (!aadharNumber.trim()) {
      errors.aadharNumber = "Aadhar Number is required.";
    } else if (!/^\d{12}$/.test(aadharNumber)) {
      errors.aadharNumber = "Please enter a valid 12-digit Aadhar Number.";
    }

    if (!reenterAadharNumber.trim()) {
      errors.reenterAadharNumber = "Reenter Aadhar Number is required.";
    } else if (reenterAadharNumber !== aadharNumber) {
      errors.reenterAadharNumber = "Reenter Aadhar Number does not match.";
    }

    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .get(`http://localhost:3001/getAadharDetails/${aadharNumber}`)
        .then((response) => {
          console.log("Aadhar details retrieved successfully", response.data);
          setAadharDetails(response.data);
          setSubmitStatus("success");
        })
        .catch((error) => {
          console.error("Error fetching Aadhar details", error);
          setSubmitStatus("error");
        });
    } else {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="GenerateAadharContainer">
      <h1 className="ContainerHeading">Generate Your Aadhar Card</h1>

      {submitStatus === "error" && (
        <Alert
          severity="error"
          style={{ marginBottom: "10px", backgroundColor: "#f7ad19" }}
        >
          Please fill out all the required fields correctly.
        </Alert>
      )}

      <label htmlFor="aadharNumberInput">Enter Aadhar Number:</label>
      <input
        className="AadharNumber"
        type="text"
        id="aadharNumberInput"
        placeholder="Enter Your 12-digit Aadhar Number"
        value={aadharNumber}
        onChange={(e) => {
          const inputAadharNumber = e.target.value;
          if (!inputAadharNumber || /^\d{0,12}$/.test(inputAadharNumber)) {
            setAadharNumber(inputAadharNumber);
          }
        }}
        style={{ borderColor: inputErrors.aadharNumber ? "#f7ad19" : "" }}
      />
      {inputErrors.aadharNumber && (
        <span className="Error" style={{ color: "#f7ad19" }}>
          {inputErrors.aadharNumber}
        </span>
      )}

      <label htmlFor="reenterAadharNumberInput">Reenter Aadhar Number:</label>
      <input
        className="ReenterAadharNumber"
        type="text"
        id="reenterAadharNumberInput"
        placeholder="Reenter Your 12-digit Aadhar Number"
        value={reenterAadharNumber}
        onChange={(e) => {
          const inputReenterAadharNumber = e.target.value;
          if (
            !inputReenterAadharNumber ||
            /^\d{0,12}$/.test(inputReenterAadharNumber)
          ) {
            setReenterAadharNumber(inputReenterAadharNumber);
          }
        }}
        style={{
          borderColor: inputErrors.reenterAadharNumber ? "#f7ad19" : "",
        }}
      />
      {inputErrors.reenterAadharNumber && (
        <span className="Error" style={{ color: "#f7ad19" }}>
          {inputErrors.reenterAadharNumber}
        </span>
      )}

      <button onClick={handleGenerateAadhar}>Generate Aadhar Card</button>

      {submitStatus === "success" && aadharDetails && (
        <div>
          <Card variant="outlined" className="frontcard">
            <img
              src={"india_emblem_1.jpg"}
              alt="Profile"
              className="ProfileImage"
            />
            <img
              src="1707230620722.png"
              alt="Second Image"
              className="CustomImage"
            />
         <CardContent>
  <div className="MidCard">
    <img
      src={`http://localhost:3001/${aadharDetails.frontDetails.image_path}`}
      alt="Aadhar Card"
      style={{ width: "80px", height: "80px", borderRadius: "5px" }}
    />
    <div className="MidSec">
      <div>
        <Typography>
          <strong >Name:</strong>{" "}
          {aadharDetails.frontDetails.name}
        </Typography>
        <Typography>
          <strong>DOB:</strong>{" "}
          {aadharDetails.frontDetails.dob}
        </Typography>
        <Typography>
          <strong >Gender:</strong>{" "}
          {aadharDetails.frontDetails.gender}
        </Typography>
      </div>
    </div>
  </div>
  <Typography>
    <img src="qr-code.jpeg" alt="Qr code" className="queqstion" />
    <strong style={{ marginLeft: "30%" }}>
      {aadharDetails.frontDetails.adhar_number}
    </strong>
  </Typography>
  <hr className="RedLine" />
</CardContent>

          </Card>
          <Card className="backcard" style={{boxShadow:"2px 3px 4px black"}} >
            <CardContent>
            <img
              src={"Aadhaar_Preview.png"}
              alt="Profile"
              className="ProfileImage"
            />
            <img
              src="1707230620722.png"
              alt="Second Image"
              className="CustomImage"
            />
              <Typography >
                <strong>Address:</strong> {aadharDetails.backDetails.address}
              </Typography>
              <Typography >
                <strong>Pincode:</strong> {aadharDetails.backDetails.pincode}
              </Typography>
              <Typography >
              <img src="qr-code.jpeg" alt="Qr code" className="qrcode" />
              <strong style={{ marginLeft: "37%" }}>
                {aadharDetails.backDetails.reenter_adhar}
                </strong>
              </Typography>
            </CardContent>
            <hr className="RedLine" />

          </Card>
        </div>
      )}

      {submitStatus === "error" && (
        <Alert
          severity="error"
          style={{ marginTop: "10px", backgroundColor: "#f7ad19" }}
        >
          Error generating Aadhar Card. Please try again later.
        </Alert>
      )}
    </div>
  );
}
