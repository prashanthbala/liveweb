var port = chrome.extension.connect({name: "knockknock"});

port.postMessage({joke: "Knock knock"});

port.onMessage.addListener(function(msg) {
  if (msg.question == "Who's there?")
    port.postMessage({answer: "Madame"});
  else if (msg.question == "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
  else if (msg.question == "I don't get it.")
    port.postMessage({answer: "YOURMOTHER"});
});



