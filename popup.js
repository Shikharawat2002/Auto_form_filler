document.getElementById('getForm').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getFormInfo,
    });
  });
});

//get form data
async function getFormInfo()
{
  const formElements = document.querySelectorAll('form')[0];

  const formData = Array.from(formElements).map(element => {
    return {
      id: element.id,
      type: element.type
    };
  });

  console.log(formData);
  alert(JSON.stringify(formData, null, 2));
}


document.getElementById('fillForm').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: fillForm,
    });
  });
});

//fill form data
function fillForm() {
  const formData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: '1234567890',
  };

  for (const field in formData) {
    const element = document.getElementById(field);
    if (element) {
      element.value = formData[field];
    }
  }
}



document.getElementById('chatgpt').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: sendMessage,
    });
  });
});


async function sendMessage() {
  const formElements = document.querySelectorAll('form')[0];

  const formData = Array.from(formElements).map(element => {
    return {
      id: element.id,
      type: element.type
    };
  });

  // Replace 'YOUR_API_KEY' with your actual API key
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
        { role: "user", content: `Generate output ${formData}` },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    }),
  });

  const responseData = await response.json();
  // console.log('responseData',responseData)
  alert( responseData.choices[0].message.content, null);  
  // return responseData.choices[0].message.content;

}








// async function injectScript() {
// sendMessage()
//   .then(response => {
//     const res = response;
//     alert(res);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

// // Function to send a message to the ChatGPT API



