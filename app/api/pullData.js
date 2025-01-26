export function extractPotentialSavings(rawData) {
    // Remove the "body": part from the rawData string and parse the JSON
    const jsonString = rawData.slice(rawData.indexOf("{"), rawData.lastIndexOf("}") + 1);
    const data = JSON.parse(jsonString);

    // Check if rawData has the expected structure
    /*
    if (!rawData || typeof rawData !== "object" || !rawData.body) {
        console.error("Invalid rawData structure. Expected an object with a 'body' property.");
        throw new Error("Invalid rawData structure. Expected an object with a 'body' property.");
    }

    // Parse the 'body' property (it is likely a JSON string)
    let data;
    try {
        data = JSON.parse(rawData.body);
    } catch (error) {
        console.error("Error parsing 'body' JSON:", rawData.body);
        throw new Error("Invalid JSON format in 'body'.");
    }
    */

    console.log("Received rawData:", rawData);


    // Define the keywords and their corresponding titles
    const keywordTitleMapping = {
        "Housing deductions": "Home Ownership",
        "Retirement": "Retirement Contributions",
        "Education": "Education Expense",
        "Charitable Contributions": "Charitable Contribution",
        "Medical ExpensesA": "Health and Medical Expenses"
    };

    // Define the icon mappings for the titles
    const iconMappings = {
        "Home Ownership": "home",
        "Retirement Contributions": "piggy-bank",
        "Education Expense": "school",
        "Charitable Contribution": "hand-holding-heart",
        "Health and Medical Expenses": "notes-medical"
    };

    // Variable for the icon constant and data
    const iconConst = "fas fa-";
    let iconData = '';

    // Initialize the tempCards array
    let tempCards = [];

    // Initialize variables to track current advice and savings per title
    let currentTitle = null;
    let currentAdvice = ''; // Advice stored as a string
    let currentSavings = '';

    // Loop through the content and search for the keywords
    data.response.content.forEach(item => {
        const text = item.text;
        let inSection = false;

        // Split the text into lines and process each line
        let lines = text.split("\n");

        lines.forEach(line => {
            // Check if any keyword appears in the current line
            for (const [keyword, title] of Object.entries(keywordTitleMapping)) {
                if (line.includes(keyword)) {
                    // If we already have a currentTitle and it is not the same as the new one, 
                    // store the current advice and savings for the previous title
                    if (currentTitle && currentTitle !== title) {
                        tempCards.push({
                            title: currentTitle,
                            icon: iconConst + iconData,
                            advice: currentAdvice.trim(),
                            savings: currentSavings
                        });
                    }

                    // Now set the new title and initialize its icon and advice
                    currentTitle = title;
                    iconData = iconMappings[title];  // Set iconData based on the title

                    // Reset the advice for the new section
                    currentAdvice = '';
                    currentSavings = '';

                    inSection = true; // We are now inside a new section

                    // Exit after finding the keyword to avoid processing further keywords in this line
                    break;
                }
            }

            if (inSection) {
                // Look for "Potential Savings"
                const savingsMatch = line.match(/Potential Savings: (.*?)(?=\n|$)/);
                if (savingsMatch) {
                    currentSavings = savingsMatch[1].trim();  // Store the savings for the current title
                }

                // Look for "Advice"
                const adviceMatch = line.match(/Advice: (.*?)(?=\n|$)/);
                if (adviceMatch) {
                    currentAdvice += adviceMatch[1].replace("Advice: ", "").trim() + " ";  // Concatenate the advice
                }
            }
        });
    });

    // Ensure the last set of data gets added to the tempCards
    if (currentTitle) {
        tempCards.push({
            title: currentTitle,
            icon: iconConst + iconData,
            advice: currentAdvice.trim(),
            savings: currentSavings
        });
    }

    // Initialize const cards after tempCards has been fully populated
    const cards = tempCards;

    // Return the cards array as a constant object
    return { cards };
}

// Example usage
