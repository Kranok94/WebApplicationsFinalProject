//Login JQuery Code
$(document).ready(function(){
	console.log("Good Morning, Sir");

	$("#homeButtonLogin").on("click", function(){
		location.href = "index.html";
	});


	$("#submitLogin").on("click", function(){
		var user = $("#username").val();
		if(user == ""){
			$("#userSpan").text("Please provide Username");
		}
		else{
			$("#userSpan").text("");
		}

		var password = $("#passw").val();
		if(password == ""){
			$("#passwSpan").text("Please provide Password");			
		}
		else{
			$("#passwSpan").text("");
		}

		var remember = 0;
		if($("#rememberMe").is(':checked')){
			remember = 1;
		}
		
		if(user != "" && password != ""){
			var jsonToSend = {
								"uName" : user,
								"uPassword" : password,
								"remember" : remember,
								"action" : "LOGIN"
								};
			$.ajax({
				url : "./data/applicationLayer.php",
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){
					alert("Welcome Back " + dataReceived.userType);
					if(dataReceived.userType == "Administrator"){
						location.href = "administrator.html";
					}
					else if(dataReceived.userType == "Staff Member"){
						location.href = "staff.html";
					}
				},
				error : function(errorMessage){
					alert(errorMessage.statusText);		//Error from PHP File
				}
			});
		}
	});


	var jsonCookie = {
						"action": "COOKIE"
						};
	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		data : jsonCookie,
		ContentType : "application/json",
		dataType : "json",
		success : function(cookieJson){
			$("#username").val(cookieJson.user);
		},
		error : function(errorMessage){
			console.log("No cookies detected");
		}
	});
});