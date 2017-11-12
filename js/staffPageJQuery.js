//Staff Page JQuery Code

$(document).ready(function(){
	//console.log("Good Morning, Sir");
 	var jsonToSend = {
						"action": "SESSION_START"
					};
	$.ajax({
		url : "./data/applicationLayer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
			userType = dataReceived.userType;
			if(userType == "Staff Member"){
				$("#addNewProducts").on("click", function(){
					location.href = "addNewProducts.html";
				});

				$("#sellProduct").on("click", function(){
					location.href = "sellProducts.html";
				});

				$("#productsList").on("click", function(){
					location.href = "productsList.html";
				});
				
				$("#signOutButton").on("click", function(){
					//console.log("Logout Clicked");
					var jsonToSend = {
									"action": "SESSION_END"
									};
					$.ajax({
						url : "./data/applicationLayer.php",
						type : "POST",
						data : jsonToSend,
						ContentType : "application/json",
						dataType : "json",
						success : function(dataReceived){
							alert(dataReceived.message);
							location.href = "index.html";
						},
						error : function(errorMessage){
							alert(errorMessage.statusText);
						}
					});
				});
			}
			else if(userType == "Administrator"){
				alert("You don't have the Credentials to access this Webpage.");
				location.href = "administrator.html";
			}
		},				
		error : function(errorMessage){
			alert("You don't have the Credentials to access this Webpage.");
			location.href = "index.html";
		}
	});	
});