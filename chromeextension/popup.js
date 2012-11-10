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

<script id="sid0010000012958362696">(function() {function async_load(){s.id="cid0010000012958362696";s.src='http://st.chatango.com/js/gz/emb.js';s.style.cssText="width:250px;height:360px;";s.async=true;s.text='{"handle":"livewebchatongo","styles":{"b":60,"f":50,"l":"999999","q":"999999","r":100,"s":1}}';var ss = document.getElementsByTagName('script');for (var i=0, l=ss.length; i < l; i++){if (ss[i].id=='sid0010000012958362696'){ss[i].id +='_';ss[i].parentNode.insertBefore(s, ss[i]);break;}}}var s=document.createElement('script');if (s.async==undefined){if (window.addEventListener) {addEventListener('load',async_load,false);}else if (window.attachEvent) {attachEvent('onload',async_load);}}else {async_load();}})();</script>