import React, { useState, useEffect } from "react";
import "./AdharBack.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

export default function AdharBack({ onBackDetailsSubmit }) {
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [reenterAdhar, setReenterAdhar] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (submitStatus === "success" || submitStatus === "error") {
      const timeoutId = setTimeout(() => {
        setSubmitStatus(null); // Clear the submit status after 5 seconds
      }, 5000);

      return () => clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts
    }
  }, [submitStatus]);

  const handleBackDetailsSubmit = () => {
    const errors = {};

    if (!address.trim()) {
      errors.address = "Address is required.";
    }

    if (!pincode.trim()) {
      errors.pincode = "Pincode is required.";
    } else if (!pincode.match(/^\d{6}$/)) {
      errors.pincode = "Please enter a valid 6-digit pincode.";
    }

    if (!reenterAdhar.trim()) {
      errors.reenterAdhar = "Reenter Adhar Number is required.";
    } else if (!reenterAdhar.match(/^\d{12}$/)) {
      // Updated regex pattern to accept 12 digits
      errors.reenterAdhar = "Please enter a valid 12-digit Adhar Number."; // Updated error message
    }

    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:3001/saveBackDetails", {
          address,
          pincode,
          reenterAdhar,
        })
        .then((response) => {
          console.log("Back details submitted successfully", response.data);
          // Handle success, e.g., navigate to the next page
          if (typeof onBackDetailsSubmit === "function") {
            onBackDetailsSubmit(response.data);
          }
          setSubmitStatus("success");
        })
        .catch((error) => {
          console.error("Error submitting back details", error);
          setSubmitStatus("error");
        });
    } else {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="AdharBackContainer">
      <h1 className="ContainerHeading">Aadhar Card Back Side</h1>

      {submitStatus === "error" && (
        <Alert
          severity="error"
          style={{ marginBottom: "10px", backgroundColor: "#f7ad19" }}
        >
          Please fill out all the required fields correctly.
        </Alert>
      )}

      <label htmlFor="addressInput">Address:</label>
      <input
        className="Address"
        type="text"
        id="addressInput"
        placeholder="Enter Valid Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ borderColor: inputErrors.address ? "#f7ad19" : "" }}
      />
      {inputErrors.address && (
        <span className="Error" style={{ color: "#f7ad19" }}>
          {inputErrors.address}
        </span>
      )}

      <label htmlFor="pincodeInput">Pincode:</label>
      <input
        className="Pincode"
        type="text"
        id="pincodeInput"
        placeholder="Enter Valid Pincode"
        value={pincode}
        onChange={(e) => {
          const inputPincode = e.target.value;
          if (!inputPincode || inputPincode.match(/^\d{0,6}$/)) {
            setPincode(inputPincode);
          }
        }}
        style={{ borderColor: inputErrors.pincode ? "#f7ad19" : "" }}
      />
      {inputErrors.pincode && (
        <span className="Error" style={{ color: "#f7ad19" }}>
          {inputErrors.pincode}
        </span>
      )}

      <label htmlFor="reenterAdharInput">Reenter Adhar Number:</label>
      <input
        className="ReenterAdhar"
        type="text"
        id="reenterAdharInput"
        placeholder="Reenter Your 12-digit Adhar Number" // Updated placeholder
        value={reenterAdhar}
        onChange={(e) => {
          const inputReenterAdhar = e.target.value;
          if (!inputReenterAdhar || inputReenterAdhar.match(/^\d{0,12}$/)) {
            // Updated regex pattern
            setReenterAdhar(inputReenterAdhar);
          }
        }}
        style={{ borderColor: inputErrors.reenterAdhar ? "#f7ad19" : "" }}
      />
      {inputErrors.reenterAdhar && (
        <span className="Error" style={{ color: "#f7ad19" }}>
          {inputErrors.reenterAdhar}
        </span>
      )}

      <button className="margin" onClick={handleBackDetailsSubmit}>Submit Back Details</button>

      {submitStatus === "success" && (
        <Alert
          severity="success"
          style={{ marginTop: "10px", backgroundColor: "#f7ad19" }}
        >
          Back details submitted successfully.
        </Alert>
      )}
      <Link className="Generate" to="/GenerateCard" >
      Go Generate Card
      </Link>
    </div>
  );
}
