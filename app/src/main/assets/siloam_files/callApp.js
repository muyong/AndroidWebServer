$("#enroll").click(function(){
  //alert("will call app");
  window.location.href = "demo://enroll?firstName=" + $("#firstname").val() + "&lastName=" + $("#lastname").val();
});

$("#auth").click(function(){
  //alert("will call app");
  window.location.href = "demo://auth?userId=" + $("#userid").val();
});


$(document).ready(function() {
	ws = new WebSocket("ws://localhost:8025/ws/chat");

	ws.onmessage = function(event) {
	    //alert("get message " + event.data);
        $("#messages").empty();
	    var message = JSON.parse(event.data);

	    if(message.type === "enroll") {
	        if(message.result === 1) {
	            //alert("success with userid " + message.userid);
	            $("#messages").append("<p>User enroll success!</p>");
	            $("#messages").append("<p>User id: " + message.userid + "</p>");
	        } else
	            $("#messages").append("<p>User enroll not success.</p>");
	    } else if(message.type === "auth") {
	        if(message.result === 1)
                $("#messages").append("<p>User verified!</p>");
            else {
                $("#messages").append("<p>User verification fails.</p>");
                $("#messages").append("<p>Detailed message: " + message.message + "</p>");
            }
	    }
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