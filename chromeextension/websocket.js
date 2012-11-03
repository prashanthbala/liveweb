if ("WebSocket" in window)
{
	var channel = 1
	var socket = new WebSocket("ws://ec2-50-112-8-217.us-west-2.compute.amazonaws.com/channel/" + channel); 

	socket.onopen = function(){  
		alert("Socket has been opened!");  
	} 

	socket.onmessage = function(htmlfile){  
		//change current page to it 
		$('body').append(htmlfile.data);
	}

	socket.onclose = function(){  
		alert("connection closed");
	}
}
else {
	alert("WebSocket NOT supported by your Browser!");
}
