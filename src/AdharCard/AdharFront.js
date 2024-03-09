import React, { useState } from "react";
import axios from "axios";
import "./AdharFront.css";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function AdharFront({ onUserDetailsSubmit }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [adharNumber, setAdharNumber] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadDetails = () => {
    const errors = {};

    if (!selectedImage) {
      errors.image = "Please upload your profile picture.";
    }

    if (!name.match(/^[A-Za-z\s]+$/)) {
      errors.name = "Please enter a valid name (only alphabets and spaces are allowed).";
    }

    if (!dob) {
      errors.dob = "Please select your Date of Birth.";
    }

    if (!gender) {
      errors.gender = "Please select your Gender.";
    }

    if (!adharNumber.trim()) {
      errors.adharNumber = "Adhar Number is required.";
    } else if (!/^\d{12}$/.test(adharNumber)) {
      errors.adharNumber = "Please enter a valid 12-digit Aadhar Number.";
    }

    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("adharNumber", adharNumber);
      formData.append("name", name);
      formData.append("dob", dob);
      formData.append("gender", gender);

      axios.post("http://localhost:3001/saveUserDetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log("User details uploaded successfully", response.data);
          if (typeof onUserDetailsSubmit === "function") {
            onUserDetailsSubmit(response.data);
          }
          setSubmitStatus("success");
        })
        .catch((error) => {
          console.error("Error uploading user details", error);
          setSubmitStatus("error");
        });
    }
  };

  return (
    <div className="AdharContainer">
      <h1 className="ContainerHeading">Aadhar Card Generation Portal</h1>
      {submitStatus === "success" && (
        <Alert severity="success" style={{ backgroundColor: "#f7ad19" }}>
          User details added successfully. Click on Next Page.
        </Alert>
      )}
      {submitStatus === "error" && (
        <Alert severity="error" style={{ backgroundColor: "#f7ad19" }}>
          Error uploading user details. Please try again later.
        </Alert>
      )}
      <div className="UserDetails">
        <label htmlFor="imageInput">Upload Profile Picture</label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ borderColor: inputErrors.image ? "#f7ad19" : "" }}
        />
        {inputErrors.image && (
          <span style={{ color: "#f7ad19" }}>{inputErrors.image}</span>
        )}

        {selectedImage && (
          <div>
            <h2>Selected Image Preview:</h2>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Preview"
              style={{ maxWidth: "50px", maxHeight: "50px" }} // Adjusted size
            />
          </div>
        )}

        <div className="InputRow">
          <div className="InputHalf">
            <label htmlFor="nameInput">Name:</label>
            <input
              className="Name"
              type="text"
              id="nameInput"
              placeholder="Enter Valid Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderColor: inputErrors.name ? "#f7ad19" : "" }}
            />
            {inputErrors.name && (
              <span style={{ color: "#f7ad19" }}>{inputErrors.name}</span>
            )}
          </div>

          <div className="InputHalf">
            <label htmlFor="dobInput">Date of Birth:</label>
            <input
              className="Dob"
              type="date"
              id="dobInput"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{ borderColor: inputErrors.dob ? "#f7ad19" : "" }}
            />
            {inputErrors.dob && (
              <span style={{ color: "#f7ad19" }}>{inputErrors.dob}</span>
            )}
          </div>
        </div>

        <div className="InputRow">
          <div className="InputHalf">
            <label htmlFor="genderSelect">Gender:</label>
            <select
              className="Gender"
              id="genderSelect"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ borderColor: inputErrors.gender ? "#f7ad19" : "" }}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {inputErrors.gender && (
              <span style={{ color: "#f7ad19" }}>{inputErrors.gender}</span>
            )}
          </div>

          <div className="InputHalf">
            <label htmlFor="adharInput">Adhar Number:</label>
            <input
              className="AdharNumber"
              type="text"
              id="adharInput"
              placeholder="Enter Your 12-digit Adhar Number"
              value={adharNumber}
              onChange={(e) => {
                const inputAdharNumber = e.target.value;
                if (!inputAdharNumber || /^\d+$/.test(inputAdharNumber)) {
                  setAdharNumber(inputAdharNumber);
                }
              }}
              style={{ borderColor: inputErrors.adharNumber ? "#f7ad19" : "" }}
            />
            {inputErrors.adharNumber && (
              <span style={{ color: "#f7ad19" }}>{inputErrors.adharNumber}</span>
            )}
          </div>
        </div>

        <button onClick={handleUploadDetails}>Upload Your Details</button>
        <Link className="Link" to="/DashBoard">
          Go to Next Page
        </Link>
      </div>
    </div>
  );
}
