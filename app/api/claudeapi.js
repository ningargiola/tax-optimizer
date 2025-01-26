'use client';
import React, { useState } from "react";

function ClaudeAPI() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // API Gateway URL
  const API_GATEWAY_URL = "https://lfnq1m3beh.execute-api.us-west-2.amazonaws.com/Test/testLambda"; // Replace with your actual API Gateway URL

  // Function to call the API Gateway and Lambda
  const makeRequest = async () => {
    setLoading(true);
    setResponse(null);

    try {
      // Sending a POST request to the API Gateway
      const result = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: JSON.stringify({
            input_data: {
              "Full Name": "John Doe",
              "Date of Birth": "08-19-1992",
              "Number of Dependents": 2,
              "Type of Income": true,
              "Gross Annual Income": 1000000,
              "Additional Income": true,
              "Additional Income Amount": 50000,
              "Mortgage Payer": true,
              "Home Type": "Family Home",
              "Home Value": 5500000,
              "Mortgage": 0.45,
              "Property Taxes": 60543.76,
              "Energy Bill": true,
              "Rental": true,
              "Total Overhead": 10555.99,
              "Medical Expenses": 4000.50,
              "HSA": true,
              "HSA Amount": 5000.44,
              "Education Expenses": true,
              "Total Paid": 60000.50,
              ".529 Contribution": true,
              ".529 Contribution Amount": 15000.50,
              "Retirement Contributions": true,
              "Retirement Amount": 80000.50,
              "Charity Contriutions": 7000.00,
              "Volunteer Work": true,
              "Volunteer Expenses": 3000.00,
            },
          }),
        }),
      });

      if (result.ok) {
        const data = await result.json();
        setResponse({ success: true, data });
      } else {
        setResponse({ success: false, error: `Error: ${result.status} ${result.statusText}` });
      }
    } catch (error) {
      console.error("Error Details:", error);
      setResponse({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <h1>Generate Smart Tax Form</h1>
      <button
        onClick={makeRequest}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Processing..." : "Generate Tax Form"}
      </button>
      <pre style={{ marginTop: "20px", textAlign: "left", background: "#f4f4f4", padding: "10px" }}>
        {response && JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}

export default ClaudeAPI;

