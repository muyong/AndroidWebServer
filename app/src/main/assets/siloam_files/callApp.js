$("#callApp").click(function(){
  //alert("will call app");
  window.location.href = "callapp://startapp";
});

$(document).ready(function() {
	ws = new WebSocket("ws://localhost:8025/ws/chat");

	ws.onmessage = function(event) {
	    var message = JSON.parse(event.data);
		$("#messages").append("<p>" + message.content + "</p>");
	};

	ws.onclose = function() {
		console.log("Socket closed");
	};

	ws.onopen = function() {
		console.log("Connected");
		var message = {
		    "content": "Hello",
		    "sender": navigator.userAgent,
		    "received": ""
		}
		ws.send(JSON.stringify(message));
	};

	$("#new-message").bind("submit", function(event) {
		event.preventDefault();
        var message = {
            "content": $("#message-text").val(),
            "sender": navigator.userAgent,
            "received": ""
        }
		ws.send(JSON.stringify(message));
		$("#message-text").val("");
	});
});