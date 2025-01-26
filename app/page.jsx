"use client";  // Ensure this component is client-side

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Form from "@/components/Form";
import Title from "@/components/ui/title";
import on_submit from "./api/submit";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { extractBody, extractPotentialSavings } from "./api/pullData";

/**
 * Given an object of form values (like from FormData),
 * return the my_dict structure you specified.
 */
function buildMyDictFromData(data) {
  // Safely parse numbers
  const parseNum = (val) => (val ? parseFloat(val) || 0 : 0);
  const parseIntOrZero = (val) => (val ? parseInt(val, 10) || 0 : 0);

  return {
    // -------------------------
    // personal info
    // -------------------------
    "Full Name": `${data.firstName || ""} ${data.lastName || ""}`.trim(),
    "Date of Birth": data.dob || "",
    "Number of Dependents": parseIntOrZero(data.numdependents),

    // -------------------------
    // employment and income
    // -------------------------
    "Type of Income": data.filingStatus || "", // This could be enhanced to combine all selected incomes if needed
    "Gross Annual Income": data.annualIncome || "",
    "Additional Income": data.sideIncomeDescription ? "Yes" : "No",
    "Additional Income Amount": data.sideIncomeDescription || "",
    "Mortgage Payer": "", // Example: placeholder if you need it

    // -------------------------
    // home details
    // -------------------------
    "Home Type": data.ownHome === "on" ? "Owned" : "Not Owned",
    "Home Value": "", // Not asked, placeholder
    "Mortgage": data.mortgageInterest || "",
    "Property Taxes": data.propertyTaxes || "",
    "Energy Bill": data.homeImprovements || "",
    "Rental": data.ownRental === "on" ? "Yes" : "No",
    "Total Overhead": data.rentalExpenses || "",

    // -------------------------
    // medical
    // -------------------------
    "Medical Expenses": data.medicalExpenses || "",
    "HSA": data.hsaYes === "on" ? "Yes" : "No",
    "HSA Amount": data.hsaContribution || "",

    // -------------------------
    // education
    // -------------------------
    "Education Expenses": data.eduYes === "on" ? "Yes" : "No",
    "Total Paid": data.tuitionPaid || "",
    ".529 Contribution": data.plan529Yes === "on" ? "Yes" : "No",
    ".529 Contribution Amount": data.amountContributed || "",

    // -------------------------
    // retirement
    // -------------------------
    "Retirement Contributions": data.retirementYes === "on" ? "Yes" : "No",
    "Retirement Amount": data.retirementContributionDetails || "",

    // -------------------------
    // charity & volunteer
    // -------------------------
    "Charity Contriutions": data.charitableDonations || "",
    "Volunteer Work": data.volunteerYes === "on" ? "Yes" : "No",
    "Volunteer Expenses": data.volunteerExpenses || "",
  };
}

export default function Home() {
  const [mounted, setMounted] = useState(false); // Ensure client-side rendering
  const [submitStatus, setSubmitStatus] = useState(""); // Submission status
  const [loading, setLoading] = useState(false); // Loading spinner state
  const [responseData, setResponseData] = useState(null); // API response data
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true); // Ensure client-side rendering
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true); // Show spinner
    setSubmitStatus(""); // Clear previous messages

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries()); // Convert form data to an object
      console.log("Captured Form Data:", data);

      const my_dict = buildMyDictFromData(data); // Build the structured dictionary
      console.log("Final my_dict:", my_dict);

      const result = await on_submit(my_dict); // Send the data to the backend
      setResponseData(result); // Store the backend response
      const new_result = result.data.body;
      console.log(new_result);
      const card_result = extractPotentialSavings(new_result);
      console.log(card_result);
      setSubmitStatus("Form submitted successfully!"); // Success message
      navigate("/results", { state: { card_result } });
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("An error occurred while submitting the form."); // Error message
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  if (!mounted) return null; // Render nothing on SSR

  return (
    <div className="text-primary-foreground max-w-2xl mx-auto p-5">
      {/* Your Header */}
      <Title />

      {/* Form Section */}
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        {/* -------------------------------------- */}
        {/* Section 1: Personal Information */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">Section 1: Personal Information</h2>

          <label className="block mb-4">
            <h2 className="text-l text-accent">First Name:</h2>
            <input type="text" name="firstName" required className="w-full p-3 mt-2 border rounded-md" />
          </label>

          <label className="block mb-4">
            <h2 className="text-l text-accent">Last Name:</h2>
            <input type="text" name="lastName" required className="w-full p-3 mt-2 border rounded-md" />
          </label>

          <label className="block mb-4">
            <h2 className="text-l text-accent">Date of Birth:</h2>
            <input type="date" name="dob" required className="w-full p-3 mt-2 border rounded-md" />
          </label>

          <div className="space-y-4 mt-4">
  <h2 className="text-lg font-semibold text-[#022c5e] mb-2">Filing Status:</h2>
  <div className="grid grid-cols-2 gap-2">
    <label className="flex items-center">
      <input
        type="radio"
        name="filingStatus"
        value="Single"
        className="mr-2 accent-[#022c5e]"
      />
      Single
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="filingStatus"
        value="MarriedFilingJointly"
        className="mr-2 accent-[#022c5e]"
      />
      Married Filing Jointly
      </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="filingStatus"
        value="MarriedFilingSeparately"
        className="mr-2 accent-[#022c5e]"
      />
      Married Filing Separately
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="filingStatus"
        value="MarriedFilingSeparately"
        className="mr-2 accent-[#022c5e]"
      />
      Married Filing Separately
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="filingStatus"
        value="HeadOfHousehold"
        className="mr-2 accent-[#022c5e]"
      />
      Head of Household
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="filingStatus"
        value="QualifyingWidower"
        className="mr-2 accent-[#022c5e]"
      />
      Qualifying Widow(er)
    </label>
  </div>
</div>

          <label className="block mb-4">
            <h2 className="text-l text-accent">Number of Dependents:</h2>
            <input
        type="text"
        name="dependantsAmount"
        className="w-full p-3 mt-2 border rounded-md"
        placeholder="Enter amount"
      />
          </label>
        </div>

        {/* -------------------------------------- */}
        {/* Section 2: Employment and Income */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 2: Employment and Income
          </h2>
          <h3 className="text-l text-accent">Primary Source of Income</h3>

          <label className="flex items-center space-x-2">
            <Checkbox />
            <span>W-2 Employee</span>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox />
            <span>Self-Employed</span>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox />
            <span>Freelance/Contractor (1099 Income)</span>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox />
            <span>Rental Property Income</span>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox />
            <span>Investment/Capital Gains</span>
          </label>

          <label className="flex items-center space-x-2 mb-4">
            <Checkbox />
            <input
              type="text"
              name="other"
              className="w-full p-3 mt-2 border rounded-md"
              placeholder="Other income source"
            />
          </label>

          <h3 className="text-l text-accent">Annual Income (approximate): </h3>
          <input
            type="text"
            name="annualIncome"
            className="w-full p-3 mt-2 border rounded-md"
          />

          <h3 className="text-l text-accent">Side Income or Gig Work?</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="sideIncomeYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="sideIncomeNo" />
              <span>No</span>
            </label>
          </div>

          <label className="flex flex-col space-y-2 ml-6 mt-4">
            <h3 className="text-l text-accent">If yes, describe:</h3>
            <input
              type="text"
              name="sideIncomeDescription"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>
        </div>

        {/* -------------------------------------- */}
        {/* Section 3: Homeownership and Real Estate */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 3: Homeownership and Real Estate
          </h2>

          <h3 className="text-l text-accent">Do you own a home?</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="ownHome" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="dontOwnHome" />
              <span>No</span>
            </label>
          </div>

          <div className="ml-6 mt-4">
            <label className="block">
              <span className="text-l text-accent">
                If yes, what was your mortgage interest paid last year? $
              </span>
              <input
                type="text"
                name="mortgageInterest"
                className="w-full p-3 mt-2 border rounded-md"
              />
            </label>
          </div>

          <div className="ml-6 mt-4">
            <label className="block">
              <span className="text-l text-accent">Property taxes paid: $</span>
              <input
                type="text"
                name="propertyTaxes"
                className="w-full p-3 mt-2 border rounded-md"
              />
            </label>
          </div>

          <div className="ml-6 mt-4">
            <label className="block">
              <span className="text-l text-accent">
                Energy-efficient home improvements made:
              </span>
              <input
                type="text"
                name="homeImprovements"
                className="w-full p-3 mt-2 border rounded-md"
              />
            </label>
          </div>

          <h3 className="text-l text-accent mt-6">Do you own rental properties?</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="ownRental" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="noRental" />
              <span>No</span>
            </label>
          </div>

          <div className="ml-6 mt-4">
            <label className="block">
              <span className="text-l text-accent">
                If yes, provide total expenses (repairs, maintenance, etc.): $
              </span>
              <input
                type="text"
                name="rentalExpenses"
                className="w-full p-3 mt-2 border rounded-md"
              />
            </label>
          </div>
        </div>

        {/* -------------------------------------- */}
        {/* Section 4: Medical and Health Expenses */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 4: Medical and Health Expenses
          </h2>

          <label className="block">
            <span className="text-l text-accent">
              Total out-of-pocket medical expenses (including premiums):
            </span>
            <input
              type="text"
              name="medicalExpenses"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <h3 className="text-l text-accent">
            Did you contribute to an HSA (Health Savings Account)?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="hsaYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="hsaNo" />
              <span>No</span>
            </label>
          </div>

          <div className="ml-6 mt-4">
            <label className="block">
              <span className="text-l text-accent">If yes, how much? $</span>
              <input
                type="text"
                name="hsaContribution"
                className="w-full p-3 mt-2 border rounded-md"
              />
            </label>
          </div>
        </div>

        {/* -------------------------------------- */}
        {/* Section 5: Education */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 5: Education
          </h2>

          <h3 className="text-l text-accent">
            Did you or a dependent pay for tuition or education expenses?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="eduYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="eduNo" />
              <span>No</span>
            </label>
          </div>

          <div className="ml-6 mt-4 space-y-4">
            <label className="block">
              <span className="text-l text-accent">If yes, provide total paid:</span>
              <input
                type="text"
                name="tuitionPaid"
                className="w-full p-3 mt-2 border rounded-md"
              />
            </label>

            <label className="block">
              <span className="text-l text-accent">
                Were 529 plan contributions made?
              </span>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2">
                  <Checkbox name="plan529Yes" />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Checkbox name="plan529No" />
                  <span>No</span>
                </label>
              </div>
            </label>

            <label className="block">
              <span className="text-l text-accent">Amount contributed:</span>
              <input
                type="text"
                name="amountContributed"
                className="w-full p-3 mt-2 border rounded-md"
              />
            </label>
          </div>
        </div>

        {/* -------------------------------------- */}
        {/* Section 6: Retirement Contributions */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 6: Retirement Contributions
          </h2>

          <h3 className="text-l text-accent">
            Did you contribute to a retirement account (401(k), IRA, Roth IRA)?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="retirementYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="retirementNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">
              If yes, provide contribution details:
            </span>
            <input
              type="text"
              name="retirementContributionDetails"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <h3 className="text-l text-accent">Did your employer offer a match?</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="matchYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="matchNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">
              If yes, did you contribute enough to receive the full match?
            </span>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2">
                <Checkbox name="fullMatchYes" />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox name="fullMatchNo" />
                <span>No</span>
              </label>
            </div>
          </label>
        </div>

        {/* -------------------------------------- */}
        {/* Section 7: Charitable Contributions */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 7: Charitable Contributions
          </h2>

          <label className="block">
            <span className="text-l text-accent">
              Total charitable donations made (cash, goods, or services):
            </span>
            <input
              type="text"
              name="charitableDonations"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-l text-accent">Non-cash donations?</span>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2">
                <Checkbox name="nonCashYes" />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox name="nonCashNo" />
                <span>No</span>
              </label>
            </div>
          </label>

          <label className="block">
            <span className="text-l text-accent">Estimated value:</span>
            <input
              type="text"
              name="nonCashValue"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-l text-accent">Did you volunteer?</span>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2">
                <Checkbox name="volunteerYes" />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <Checkbox name="volunteerNo" />
                <span>No</span>
              </label>
            </div>
          </label>

          <label className="block">
            <span className="text-l text-accent">
              If yes, provide mileage or related expenses:
            </span>
            <input
              type="text"
              name="volunteerExpenses"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>
        </div>

        {/* -------------------------------------- */}
        {/* Section 8: Work-Related Expenses */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 8: Work-Related Expenses
          </h2>

          <h3 className="text-l text-accent">
            Did you have unreimbursed work expenses?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="workExpYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="workExpNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">
              If yes, describe (e.g., travel, supplies, etc.):
            </span>
            <input
              type="text"
              name="workExpensesDescription"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-l text-accent">
              Total work-related expenses:
            </span>
            <input
              type="text"
              name="workExpensesTotal"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <h3 className="text-l text-accent">
            Did you use a portion of your home for work?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="homeOfficeYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="homeOfficeNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">Square footage of home:</span>
            <input
              type="text"
              name="homeSquareFootage"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-l text-accent">
              Square footage of home office:
            </span>
            <input
              type="text"
              name="homeOfficeSquareFootage"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>
        </div>

        {/* -------------------------------------- */}
        {/* Section 9: Childcare and Dependent Care */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">
            Section 9: Childcare and Dependent Care
          </h2>

          <h3 className="text-l text-accent">
            Did you pay for childcare or dependent care?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="childcareYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="childcareNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">Total paid:</span>
            <input
              type="text"
              name="childcareTotalPaid"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-l text-accent">Name of care provider:</span>
            <input
              type="text"
              name="careProviderName"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <label className="block">
            <span className="text-l text-accent">
              Provider's EIN or SSN (if available):
            </span>
            <input
              type="text"
              name="careProviderEIN"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>
        </div>

        {/* -------------------------------------- */}
        {/* Section 10: Miscellaneous */}
        {/* -------------------------------------- */}
        <div className="space-y-6">
          <h2 className="text-xl text-accent font-semibold">Section 10: Miscellaneous</h2>

          <h3 className="text-l text-accent">Did you make student loan payments?</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="loanYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="loanNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">Total interest paid:</span>
            <input
              type="text"
              name="studentLoanInterestPaid"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <h3 className="text-l text-accent">
            Did you experience a loss due to theft, disaster, or other casualty?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="lossYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="lossNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">If yes, describe:</span>
            <input
              type="text"
              name="lossDescription"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <h3 className="text-l text-accent">
            Did you contribute to any tax-advantaged accounts (FSA, etc.)?
          </h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="taxAdvantagedYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="taxAdvantagedNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">If yes, provide details:</span>
            <input
              type="text"
              name="taxAdvantagedDetails"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>

          <h3 className="text-l text-accent">Were there any major life changes this year?</h3>
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <Checkbox name="lifeChangesYes" />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox name="lifeChangesNo" />
              <span>No</span>
            </label>
          </div>

          <label className="block">
            <span className="text-l text-accent">If yes, describe:</span>
            <input
              type="text"
              name="lifeChangesDescription"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </label>
        </div>

        {/* -------------------------------------- */}
        {/* Submit Button & Status Message */}
        {/* -------------------------------------- */}
        {/* Submit Button and Loading Spinner */}
        <div className="mt-6">
          <button
            type="submit"
            className="submit-btn bg-accent text-white font-bold px-6 py-3 rounded-md hover:bg-gray-800"
            disabled={loading} // Disable button while loading
          >
            Submit
          </button>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center mt-4">
              <CircularProgress />
            </div>
          )}

          {/* Success/Error Message */}
          {submitStatus && (
            <p
              className={`mt-4 text-sm ${
                submitStatus.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
              role="alert"
            >
              {submitStatus}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

