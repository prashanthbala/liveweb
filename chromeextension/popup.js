if (localStorage.accessToken) {
            var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=displayUser";
            alert(graphUrl);
            var script = document.createElement("script");
            script.src = graphUrl;
            document.body.appendChild(script);
 
            function displayUser(user) {
                alert(user);
            }
}
else {
  chrome.tabs.getAllInWindow(null, function(tabs) {
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.indexOf(successURL) == 0) {
                                chrome.extension.getBackgroundPage().console.log('foobarla : ' + tabs[i].url);
                                var params = tabs[i].url.split('#')[1];
                                console.log(params);
                                localStorage.accessToken = params;
                                chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                                return;
                            }
                        }
                    });
}