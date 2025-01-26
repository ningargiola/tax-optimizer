export const on_submit = async (inputData) => {
    const API_GATEWAY_URL = "https://lfnq1m3beh.execute-api.us-west-2.amazonaws.com/Test/testLambda"; // Replace with your actual API Gateway URL
  
    try {
      // Sending a POST request to the API Gateway
      const result = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: JSON.stringify({
            input_data: inputData,
          }),
        }),
      });
  
      if (result.ok) {
        const data = await result.json();
        console.log("Success:", data); // Replace with appropriate response handling in your project
        return { success: true, data };
      } else {
        console.error(`Error: ${result.status} ${result.statusText}`);
        return { success: false, error: `Error: ${result.status} ${result.statusText}` };
      }
    } catch (error) {
      console.error("Error Details:", error);
      return { success: false, error: error.message };
    }
  };  
export default on_submit;