const cards = [
    {
      title: "Home Ownership",
      icon: "fas fa-home",
      advice: [
        "1. Refinance Mortgage: If interest rates are low, refinancing their mortgage can lower monthly payments and increase deductible interest.",
        "2. Energy-Efficient Upgrades: Recommend installing solar panels, upgrading insulation, or using energy-efficient appliances. These may qualify for tax credits like the Residential Clean Energy Credit.",
        "3. Prepay Property Taxes: If possible, prepay property taxes before year-end to maximize deductions.",
      ],
      savings: "$6,000/Year", // Adjusted for realistic savings based on property taxes and energy upgrades
    },
    {
      title: "Retirement Contributions",
      icon: "fas fa-piggy-bank",
      advice: [
        "1. Max Out Contributions: Suggest contributing the maximum allowable amount to tax-deferred accounts (e.g., 401(k), Traditional IRA).",
        "2. 2024 contribution limits: $22,500 for 401(k) and $6,500 for IRAs.",
        "3. Open a SEP IRA or Solo 401(k): If self-employed, recommend these accounts for higher contribution limits.",
      ],
      savings: "$22,500/Year", // Matches the user's max 401(k) contribution
    },
    {
      title: "Education Expenses",
      icon: "fas fa-school",
      advice: [
        "1. 529 Plan Contributions: Encourage investing in a 529 plan for their children’s future education. Many states offer tax deductions or credits for contributions.",
        "2. Lifetime Learning Credit: If the client is taking classes, they may qualify for up to $2,000 in credits for education expenses.",
        "3. Employer Tuition Reimbursement: Check if their employer offers reimbursement programs, which can be tax-free up to $5,250 annually.",
      ],
      savings: "$15,000/Year", // Matches the 529 contribution amount
    },
    {
      title: "Charitable Contributions",
      icon: "fas fa-hand-holding-heart",
      advice: [
        "1. Donate Appreciated Assets: Instead of cash, recommend donating stocks or mutual funds that have appreciated in value. They can avoid capital gains tax and deduct the full fair market value.",
        "2. Track Volunteer Expenses: Advise tracking mileage and out-of-pocket costs related to volunteer work, as these can be deductible.",
        "3. Bunch Donations: If their deductions are close to the standard deduction limit, suggest “bunching” donations in one year to exceed the threshold.",
      ],
      savings: "$7,000/Year", // Matches charitable contribution amount
    },
    {
      title: "Health and Medical Expenses",
      icon: "fas fa-notes-medical",
      advice: [
        "1. Max Out HSA Contributions: If they have a high-deductible health plan, suggest contributing to an HSA. Contributions are tax-deductible, and withdrawals for medical expenses are tax-free.",
        "   - 2024 limits: $4,150 (individual), $8,300 (family).",
        "2. Schedule Medical Procedures: If they have significant medical expenses nearing the 7.5% AGI threshold, consider scheduling additional procedures or treatments within the same year.",
      ],
      savings: "$5,000/Year", // Matches HSA contribution
    },
    {
      title: "Work-Related Expenses",
      icon: "fas fa-briefcase",
      advice: [
        "1. Home Office Deduction: If they’re self-employed or a freelancer, ensure they’re deducting home office expenses based on the square footage used for work. Suggest using the simplified deduction method if appropriate.",
        "2. Deduct Business Expenses: Encourage tracking expenses like equipment, software, and professional memberships if they are self-employed.",
        "3. Upgrade Office Equipment: Recommend purchasing new work equipment before year-end for additional deductions.",
      ],
      savings: "$7,000/Year", // Left unchanged as it's not explicitly represented in the dictionary
    },
    {
      title: "Dependent and Childcare Credits",
      icon: "fas fa-child",
      advice: [
        "1. Child and Dependent Care Credit: Suggest taking advantage of this credit if they paid for childcare or dependent care while working. This credit can be up to $1,200 per child.",
        "2. Dependent Care FSA: If available through their employer, recommend contributing to a dependent care FSA, which allows them to save up to $5,000 pre-tax.",
      ],
      savings: "$5,000/Year", // Matches potential childcare FSA
    },
    {
      title: "Self-Employment",
      icon: "fas fa-user-pen",
      advice: [
        "1. Deduct Mileage: If they use their personal vehicle for business purposes, recommend tracking mileage to deduct at the IRS mileage rate.",
        "2. Section 179 Deduction: Suggest buying business equipment before year-end to deduct the full purchase price under Section 179.",
        "3. Set Aside Estimated Taxes: Advise paying quarterly estimated taxes to avoid penalties and interest.",
      ],
      savings: "$7,000/Year", // Left unchanged as it's not explicitly represented in the dictionary
    },
    {
      title: "Miscellaneous",
      icon: "fas fa-hands",
      advice: [
        "1. Student Loan Interest Deduction: If applicable, remind them they can deduct up to $2,500 in student loan interest, even if they don’t itemize.",
        "2. Casualty Loss Deduction: For losses due to theft or natural disasters, they may qualify for deductions if the event was federally declared.",
      ],
      savings: "$2,500/Year", // Matches the student loan interest deduction
    },
  ];
  
  export default cards;
  
  