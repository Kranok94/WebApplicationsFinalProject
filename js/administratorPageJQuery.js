//Administrator Page JQuery Code

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
			if(userType == "Administrator"){
				$("#addNewProducts").on("click", function(){
					location.href = "addNewProducts.html";
				});

				$("#sellProduct").on("click", function(){
					location.href = "sellProducts.html";
				});

				$("#ownerRevenues").on("click", function(){
					location.href = "ownersRevenue.html";
				});

				$("#eventRevenues").on("click", function(){
					location.href = "eventsRevenues.html";
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
			else if(userType == "Staff Member"){
				alert("You don't have the Credentials to access this Webpage.");
				location.href = "staff.html";
			}
		},				
		error : function(errorMessage){
			alert("You don't have the Credentials to access this Webpage.");
			location.href = "index.html";
		}
	});	
});