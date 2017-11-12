//Sell Product JQuery Code
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
				var jsonToSend = {
									"action" : "SHOW_PRODUCTS"
								};
				$.ajax({
					url : "./data/applicationLayer.php",
					type : "POST",
					data : jsonToSend,
					ContentType : "application/json",
					dataType : "json",
					success : function(dataReceived){
						var count = dataReceived[0].counter;
						var newHtml;
						for(var i = 0; i < count; i++){
							newHtml += '<tr>';
							newHtml += '<td>' + dataReceived[i].prodName +'</td>';
							newHtml += '<td>' + "$" + dataReceived[i].prodPrice +'</td>';
							newHtml += '<td>' + dataReceived[i].prodCode +'</td>';
							newHtml += '<td><input class="sellProd" id="'+ dataReceived[i].prodCode +'" type="submit" value="Sell"/>'+'</td>';
							newHtml += '</tr>';
						}						
						$("#productsTableSell").append(newHtml);
					},
					error : function(errorMessage){
						alert(errorMessage.statusText);		//Error from PHP File
					}
				});

				$("#searchSellProductSubmit").on("click", function(){
					var searchProductName = $("#sellProductName").val();
					var productNameUpperCase;
					if(searchProductName == ""){
						$("#sellProductNameSpan").text("Please enter the name of a Product");
					}
					else{
						$("#sellProductNameSpan").text("");
						productNameUpperCase = searchProductName.toUpperCase();
					}
					
					if(searchProductName != ""){
						console.log(productNameUpperCase);
						$("#productsTableSell").remove();
						$("#noProdFoundSell").remove();
						$("#sellProductName").val("");
						var jsonToSend = {
											"productName" 	: productNameUpperCase,
											"action" 		: "SEARCH_PRODUCT"
											};
						$.ajax({
							url : "./data/applicationLayer.php",
							type : "POST",
							data : jsonToSend,
							ContentType : "application/json",
							dataType : "json",
							success : function(dataReceived){
								var count = dataReceived[0].counter;
								var newHtml = "";
								if(count > 0){
									newHtml += '<table id="productsTableSell">';
									newHtml += '<tr>';
									newHtml += '<th>Product\'s Name</th>';
									newHtml += '<th>Price</th>';
									newHtml += '<th>Product Code</th>';
									newHtml += '<th>Sell</th>';
									newHtml += '</tr>';
								
									for(var i = 0; i < count; i++){
										newHtml += '<tr>';
										newHtml += '<td>' + dataReceived[i].prodName +'</td>';
										newHtml += '<td>' + "$" + dataReceived[i].prodPrice +'</td>';
										newHtml += '<td>' + dataReceived[i].prodCode +'</td>';
										newHtml += '<td><div><input class="sellProd" id="'+ dataReceived[i].prodCode +'" type="submit" value="Sell"/>' +'</div>' +'</td>';
										newHtml += '</tr>';
									}
								
									newHtml += '</table>';
									$("#tableContainerSell").append(newHtml);
								}	
								else{
									newHtml += '<div id="noProdFoundSell" class="spanBanner"></br></br></br><center>No Products Found</center></div>';
									$("#tableContainerSell").append(newHtml);
								}					
								
							},
							error : function(errorMessage){
								alert(errorMessage.statusText);		//Error from PHP File
							}
						});
					}
					else{
						$("#productsTableSell").remove();
						$("#noProdFoundSell").remove();
						var jsonToSend = {
									"action" : "SHOW_PRODUCTS"
									};
						$.ajax({
							url : "./data/applicationLayer.php",
							type : "POST",
							data : jsonToSend,
							ContentType : "application/json",
							dataType : "json",
							success : function(dataReceived){
								var count = dataReceived[0].counter;
								var newHtml = "";
								newHtml += '<table id="productsTableSell">';
								newHtml += '<tr>';
								newHtml += '<th>Product\'s Name</th>';
								newHtml += '<th>Price</th>';
								newHtml += '<th>Product Code</th>';
								newHtml += '<th>Sell</th>';
								newHtml += '</tr>';

								for(var i = 0; i < count; i++){
									newHtml += '<tr>';
									newHtml += '<td>' + dataReceived[i].prodName +'</td>';
									newHtml += '<td>' + "$" + dataReceived[i].prodPrice +'</td>';
									newHtml += '<td>' + dataReceived[i].prodCode +'</td>';
									newHtml += '<td><input class="sellProd" id="'+ dataReceived[i].prodCode +'" type="submit" value="Sell"/>'+'</td>';
									newHtml += '</tr>';
								}						
								newHtml += '</table>';
								$("#tableContainerSell").append(newHtml);
							},
							error : function(errorMessage){
								alert(errorMessage.statusText);		//Error from PHP File
							}
						});
					}
				});	

				$("#tableContainerSell").on("click", ".sellProd", function(){			//Function to Send Friend Requests
					var productSellClick = $(this).attr("id");
					//console.log(productSellClick);			
					var jsonToSend = {
										"productCode" : productSellClick,
										"action": "SELL_PRODUCT"
									};
					$.ajax({
							url : "./data/applicationLayer.php",
							type : "POST",
							data : jsonToSend,
							ContentType : "application/json",
							dataType : "json",
							success : function(dataReceived){
								alert("Product with "+ productSellClick + " has been sold.");
								location.href = "sellProducts.html";
							},
							error : function(errorMessage){
								alert("Error with Selling Product");
							}
					});	
				});
			}
		},				
		error : function(errorMessage){
			alert("You don't have the Credentials to access this Webpage.");			
			location.href = "index.html";
		}
	});
});
