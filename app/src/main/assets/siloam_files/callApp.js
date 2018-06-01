$("#enroll").click(function(){
  //alert("will call app");
  window.location.href = "demo://enroll?firstName=" + $("#firstname").val() + "&lastName=" + $("#lastname").val();
});

$("#auth").click(function(){
  //alert("will call app");
  var idSplitted = $("#userid").val().split("-");
  window.location.href = "demo://auth?userId=" + idSplitted[1];
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(document).ready(function() {
	ws = new WebSocket("ws://localhost:8025/ws/chat");

	ws.onmessage = function(event) {
	    //alert("get message " + event.data);
        $("#messages").empty();
	    var message = JSON.parse(event.data);

	    if(message.type === "enroll") {
	        if(message.result === 1) {
	            //alert("success with userid " + message.userid);
	            $("#messages").append("<p>" + message.firstname + " "  + message.lastname + " has been enrolled!</p>");
	            $("#messages").append("<p>Element ID is " + message.userid + "</p>");
	            var user = {"firstname":message.firstname, "lastname":message.lastname, "userid":message.userid};
	            //alert("getting userid array cookie..");
	            var userArray = [];
	            //alert("userArray: " + userArray);
	            var userArrayCookie = getCookie('userArray');

	            if(userArrayCookie != "") {
	                userArray = JSON.parse(userArrayCookie);
	                userArray.push(user);
	            }
	            else {
	                //alert("user Array Cookie is null");
	                userArray = [user];
	            }

	            //alert("user array: " + JSON.stringify(userArray));
	            setCookie('userArray', JSON.stringify(userArray), 30);
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

    //alert("user id array: " + getCookie('userIdArray'));
	var userArray = JSON.parse(getCookie('userArray'));
	for(user of userArray)
	    $("#userid").append("<option>" + user.firstname + " " + user.lastname + "-" + user.userid + "</option>");

	$("#userid").change(function() {
	   //alert(this.value);
       var idSplitted = this.value.split("-");
       var name = idSplitted[0];
       //alert(name);
       var nameSplitted = name.split(" ");
       var firstName = nameSplitted[0];
       var lastName = nameSplitted[1];
       $("#firstname_appoint").val(firstName);
       $("#lastname_appoint").val(lastName);
    })
});