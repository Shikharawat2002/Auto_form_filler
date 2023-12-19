document.getElementById('chatgpt').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: sendMessage,
    });
  });
});


async function sendMessage() {
  //get user info
  const formElements = document.querySelectorAll('form')[0];

  const formData = Array.from(formElements).map(element => {
    return element.name;
  });
  console.log("Get formData:::", formData);

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
        { role: "user", content: `Provide dummy data for these fields ${formData}` },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    }),
  });

  const responseData = await response.json();
  // console.log('responseData',responseData)
  console.log(" responseData.choices[0].message.content:::", responseData.choices[0].message.content )
  const chatRes = JSON.parse(responseData.choices[0].message.content);
  console.log("chatRes", chatRes)
  console.log('name:::', chatRes.name)

  for (const field in chatRes)
  {
       const element = document.getElementById(field);
       if (element) {
         element.value = chatRes[field];
       }
   }
  // return responseData.choices[0].message.content;
}

// document.getElementById('getForm').addEventListener('click', function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: getFormInfo,
//     });
//   });
// });

//get form data
// async function getFormInfo()
// {
//   const formElements = document.querySelectorAll('form')[0];

//   const formData = Array.from(formElements).map(element => {
//     return {
//       id: element.name,
//       type: element.type
//     };
//   });

//   console.log(formData);
//   alert(JSON.stringify(formData, null, 2));
// }


// document.getElementById('fillForm').addEventListener('click', function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: fillForm,
//     });
//   });
// });


// fill form data
// function fillForm(formData) {
//   console.log("formData Inside fillForm", formData);
//   for (const field in formData) {
//     const element = document.getElementById(field);
//     if (element) {
//       element.value = formData[field];
//     }
//   }
// }










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



