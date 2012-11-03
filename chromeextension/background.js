        chrome.tabs.onUpdated.addListener(function( tabId , info ) {
            if ( info.status == "complete" ) {
              chrome.tabs.insertCSS(null, {file: "annotations.css", runAt: "document_start"}); 
              chrome.tabs.insertCSS(null, {file: "jquery-annotate/jquery.annotate.css", runAt: "document_start"});
              chrome.tabs.executeScript(null,{file: "jquery-1.8.2.min.js", runAt: "document_start"});
              chrome.tabs.executeScript(null,{file: "getpath.js", runAt: "document_start"});
              chrome.tabs.executeScript(null,{file: "jquery-annotate/jquery-annotate.min.js", runAt: "document_start"});
              chrome.tabs.executeScript(null,{file: "annotate.js", runAt: "document_start"});
              //chrome.tabs.executeScript(null,{file: "websocket.js", runAt: "document_start"});
            }
        }); 

        // chrome.extension.onRequest.addListener(
        //   function(request, sender, sendResponse) {
        //       if (request.type == "redirect")

        //         sendResponse({farewell: "goodbye"});
        // });

        //                  chrome.tabs.getCurrent(function (currentTab) {
        //           chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        //               if(tabId == currentTab.id) {
        //                 socket.send(JSON.stringify({tag: changeInfo.url, type: "redirect"}));
        //               }
        //           });
        //         });
//  }
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
