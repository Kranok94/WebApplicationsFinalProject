//JQuery Code General Buttons
$(document).ready(function(){
	console.log("Good Morning, Sir");
 	
 	/*--------------Index.html----------------*/
	$("#submitProducts").on("click", function(){
		location.href = "productsList.html";
	});
	$("#submitLoginIndex").on("click", function(){
		location.href = "login.html";
	});
	$("#submitAbout").on("click", function(){
		location.href = "about.html";
	});

	/*--------------All Pages-----------------*/
	$("#backButton").on("click", function(){
		var jsonToSend = {
						"action": "CHECK_SESSION"
						};
		$.ajax({
			url : "./data/applicationLayer.php",
			type : "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success : function(dataReceived){
				if(dataReceived.userType == "Administrator"){
					location.href = "administrator.html";
				}
				else if(dataReceived.userType == "Staff Member"){
					location.href = "staff.html";
				}
				else{
					location.href = "index.html";
				}
			},
			error : function(errorMessage){
				alert(errorMessage.statusText);
			}
		});
	});

	/*--------------About Page----------------*/
	$("#homeButtonAbout").on("click", function(){
		location.href = "index.html";
	});
});