import React, { useState } from "react";
import { CircularProgress, Box } from "@mui/material"; // Using Material-UI for the progress bar
import on_submit from "./api/submit"; // Ensure this path is correct

const myDict = {
  "Full Name": "John Doe",
  "Date of Birth": "1990-01-01",
  "Number of Dependents": 2,
  "Gross Annual Income": 1000000,
  "Additional Income Amount": 50000,
  "Mortgage Payer": true,
  "Mortgage": 0.45,
  "Property Taxes": 60543.76,
  "Energy Bill": true,
  "Rental": true,
  "Total Overhead": 10555.99,
  "Medical Expenses": 4000.5,
  "HSA": true,
  "HSA Amount": 5000.44,
  "Education Expenses": true,
  "Total Paid": 60000.5,
  ".529 Contribution": true,
  ".529 Contribution Amount": 15000.5,
  "Retirement Contributions": true,
  "Retirement Amount": 80000.5,
  "Charity Contriutions": 7000.0,
  "Volunteer Work": true,
  "Volunteer Expenses": 3000.0,
};

const Test = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  const [response, setResponse] = useState(null); // Store API response
  const [error, setError] = useState(null); // Store error messages

  const handleSubmit = async () => {
    setLoading(true); // Show the progress bar
    setResponse(null); // Clear previous response
    setError(null); // Clear previous errors

    try {
      const result = await on_submit(myDict); // Call the backend function
      if (result.success) {
        setResponse(result.data); // Set response data
      } else {
        setError(result.error); // Set error message
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false); // Hide the progress bar
    }
  };

  return (
    <div>
      <h1>Tax Data Processor</h1>
      <button onClick={handleSubmit} disabled={loading}>
        Submit Data
      </button>

      {/* Show progress bar if loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Show response or error */}
      {!loading && response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {!loading && error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Test;


