document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();  // ⛔ stop the default GET request to S3
  
    const status = document.getElementById("status");
    status.textContent = "Sending...";
  
    const formData = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value,
      message: document.querySelector("textarea[name='message']").value
    };
  
    try {
      await new Promise(resolve => setTimeout(resolve, 300));  // optional delay
  
      const response = await fetch("https://vc5en71us2.execute-api.us-east-1.amazonaws.com/dev/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      status.textContent = result.message;
    } catch (err) {
      status.textContent = "Something went wrong.";
      console.error("Form submission error:", err);
    }
  });
  