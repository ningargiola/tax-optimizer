"use client";

export default function Form({ handleSubmit }) {
  return (
    <div>
      <button
        type="submit"
        className="submit-btn" // Add this class
      >
        Submit
      </button>
    </div>
  );
}