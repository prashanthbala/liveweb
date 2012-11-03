// chrome.extension.onMessage.addListener(
//   	function(request, sender, sendResponse) {
// 	    console.log(sender.tab ?
// 	                "from a content script:" + sender.tab.url :
// 	                "from the extension");
// 	    if (request.greeting == "hello")
// 	      sendResponse({farewell: "goodbye"});

	  	chrome.extension.onConnect.addListener(function(port) {
			  console.assert(port.name == "knockknock");
			  port.onMessage.addListener(function(msg) {
				    if (msg.joke == "Knock knock")
				      port.postMessage({question: "Who's there?"});
				    else if (msg.answer == "Madame")
				      port.postMessage({question: "Madame who?"});
				    else if (msg.answer == "Madame... Bovary")
				      port.postMessage({question: "I don't get it."});
			  });
		});
// 	}
// );


function onFacebookLogin() {
                if (!localStorage.accessToken) {
                    chrome.tabs.getAllInWindow(null, function(tabs) {
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.indexOf(successURL) == 0) {
                                var params = tabs[i].url.split('#')[1];
                                console.log(params);
                                localStorage.accessToken = params;
                                chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                                return;
                            }
                        }
                    });
                }
            }
chrome.tabs.onUpdated.addListener(onFacebookLogin);