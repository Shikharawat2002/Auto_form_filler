document.getElementById('fillForm').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: injectScript,
    });
  });
});

function injectScript() {
  // Your custom script to be injected into the webpage
  alert('Script injected!');
}

// document.getElementById('fillForm').addEventListener('click', function(){
//     chrome.tabs.executeScript({
//       code: "alert(document.title)"
//     });
//   });

  // document.getElementById('fillForm').addEventListener("click",fillForm);

  // function fillForm()
  // {
  //   document.getElementById("result").innerHTML = "welcome to my extension"
  // }

  // popup.js

// document.getElementById("fillForm").addEventListener("click", getButton);

// function getButton()
// {
//   chrome.tabs.query({active:true, currentWindow:true},function(tabs) {
//         const activeTabId = tabs[0].id;
//         chrome.tabs.sendMessage(activeTabId, { message: "get_h1" }, function(response) {
//           alert(activeTabId);
//         });
//       })
// }

// function() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     const activeTabId = tabs[0].id;
//     chrome.tabs.sendMessage(activeTabId, { message: "get_h1" }, function(response) {
//       alert(response.h1Text);
//     });
//   });
// }
