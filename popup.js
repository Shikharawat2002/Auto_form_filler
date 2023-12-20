document.getElementById('chatgpt').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: sendMessage,
    });
  });
});


async function sendMessage() {
  // Get all forms on the page
  const formElements = document.querySelectorAll('form');

  
  formElements.forEach(async (form, formIndex) => {
  
    const formData = Array.from(form).map(element => {
      return element.name;
    });
    console.log(`Form ${formIndex + 1} Data:`, formData);

    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          { role: "user", content: `Provide dummy data for these fields ${formData}` },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      }),
    });

    const responseData = await response.json();
    console.log(`Form ${formIndex + 1} Response:`, responseData);

    const chatRes = JSON.parse(responseData.choices[0].message.content);

    // Update form fields with the response data
    for (const field in chatRes) {
      const element = form.querySelector(`[name="${field}"]`);
      if (element) {
        element.value = chatRes[field];
      }
    }
  });
}

