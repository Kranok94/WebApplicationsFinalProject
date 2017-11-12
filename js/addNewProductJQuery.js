//Add New Product JQuery Code

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
			if(userType == "Administrator" || userType == "Staff Member"){
				$("#addNewProductSubmit").on("click", function(){
					var productName = $("#productName").val();
					var productNameUpperCase;
					var success = true;
					if(productName == ""){
						$("#productNameSpan").text("Please provide the Product's Name");
						success = false;
					}
					else{
						$("#productNameSpan").text("");
						//productNameUpperCase = productName.toUpperCase();
					}

					var ownerName = $("#ownerName").val();
					var ownerNameUpperCase;
					if(ownerName == ""){
						$("#ownerNameSpan").text("Please provide the Owner's Name");			
						success = false;
					}
					else{
						$("#ownerNameSpan").text("");
						//ownerNameUpperCase = ownerName.toUpperCase();
					}
					

					var ownerEmail = $("#ownerEmail").val();
					var validEM = false;
					var ownerEmailLowerCase = "";
					if(ownerEmail == ""){
						$("#ownerEmailSpan").text("Please provide the Owner's E-mail");			
						success = false;
					}
					else{
						$("#ownerEmailSpan").text("");
						ownerEmailLowerCase = ownerEmail.toLowerCase();
						success &= true;
						validEM = true;
					}
				  	
				  	var valid = false;
					for (var i = 0, len = ownerEmailLowerCase.length; i < len; i++){
				  		if(ownerEmailLowerCase[i] == '@'){
				  			valid = true;
				  		}
					}
					
					if((!valid || ownerEmailLowerCase.indexOf(".com") == -1)&& validEM){
						$("#ownerEmailSpan").text("Please provide a valid e-mail");
					}
					success &= valid;


					var ownerPhoneNumber = $("#ownerPhoneNumber").val();
					if(ownerPhoneNumber == ""){
						$("#ownerPhoneNumberSpan").text("Please provide the Owner's Phone-Number");			
						success = false;
					}
					else{
						$("#ownerPhoneNumberSpan").text("");
					}

					var productPrice = $("#productPrice").val();
					if(productPrice == ""){
						$("#productPriceSpan").text("Please provide the Product's Price");			
						success = false;
					}
					else{
						$("#productPriceSpan").text("");
					}
					
					
					if(success){
						//console.log("Correct Inputs");
						var jsonToSend = {
											"prodName" 	: productName,
											"ownName" 	: ownerName,
											"ownEmail" 	: ownerEmailLowerCase,
											"ownPhone" 	: ownerPhoneNumber,
											"prodPrice"	: productPrice,
											"action" 	: "ADD_NEWPRODUCT"
											};

						$.ajax({
							url : "./data/applicationLayer.php",
							type : "POST",
							data : jsonToSend,
							ContentType : "application/json",
							dataType : "json",
							success : function(dataReceived){
								alert("Product Added: "+ dataReceived.productCode);
								location.href = "addNewProducts.html";
							},
							error : function(errorMessage){
								alert(errorMessage.statusText);
							}
						});
					}
				});
			}
		},				
		error : function(errorMessage){
			alert("You don't have the Credentials to access this Webpage.");
			location.href = "index.html";
		}
	});	
});