form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Form submitted");
  
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
  
    status.textContent = "Sending...";
  
    try {
      const response = await fetch("https://vc5en71us2.execute-api.us-east-1.amazonaws.com/dev/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("API response:", result);
      status.textContent = result.message || "Message sent!";
  
      // ✅ Clear the form fields
      form.reset();
  
    } catch (error) {
      console.error("Error submitting form:", error);
      status.textContent = "Something went wrong.";
    }
  });