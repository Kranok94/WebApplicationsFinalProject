//Products' List JQuery Code
$(document).ready(function(){
	//console.log("Good Morning, Sir");
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
				newHtml += '</tr>';
			}						
			$("#productsTable").append(newHtml);
		},
		error : function(errorMessage){
			alert(errorMessage.statusText);		//Error from PHP File
		}
	});

	$("#searchProductSubmit").on("click", function(){
		console.log("Product List Click");
		var searchProductName = $("#searchProductName").val();
		var productNameUpperCase;
		$("#searchProductName").val("");
		
		if(searchProductName == ""){
			$("#searchProductNameSpan").text("Please enter the name of a Product");
		}
		else{
			$("#searchProductNameSpan").text("");
			productNameUpperCase = searchProductName.toUpperCase();
		}
		
		if(searchProductName != ""){
			console.log(productNameUpperCase);
			$("#productsTable").remove();
			$("#noProdFound").remove();
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
						newHtml += '<table id="productsTable">';
						newHtml += '<tr>';
						newHtml += '<th>Product\'s Name</th>';
						newHtml += '<th>Price</th>';
						newHtml += '<th>Product Code</th>';
						newHtml += '</tr>';
					
						for(var i = 0; i < count; i++){
							newHtml += '<tr>';
							newHtml += '<td>' + dataReceived[i].prodName +'</td>';
							newHtml += '<td>' + "$" + dataReceived[i].prodPrice +'</td>';
							newHtml += '<td>' + dataReceived[i].prodCode +'</td>';
							newHtml += '</tr>';
						}
					
						newHtml += '</table>';
						$("#tableContainer").append(newHtml);
					}	
					else{
						newHtml += '<div id="noProdFound" class="spanBanner"></br></br></br><center>No Products Found</center></div>';
						$("#tableContainer").append(newHtml);

					}					
					
				},
				error : function(errorMessage){
					alert(errorMessage.statusText);		//Error from PHP File
				}
			});
		}
		else{
			$("#productsTable").remove();
			$("#noProdFound").remove();
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
					newHtml += '<table id="productsTable">';
					newHtml += '<tr>';
					newHtml += '<th>Product\'s Name</th>';
					newHtml += '<th>Price</th>';
					newHtml += '<th>Product Code</th>';
					newHtml += '</tr>';

					for(var i = 0; i < count; i++){
						newHtml += '<tr>';
						newHtml += '<td>' + dataReceived[i].prodName +'</td>';
						newHtml += '<td>' + "$" + dataReceived[i].prodPrice +'</td>';
						newHtml += '<td>' + dataReceived[i].prodCode +'</td>';
						newHtml += '</tr>';
					}						
					newHtml += '</table>';
					$("#tableContainer").append(newHtml);
				},
				error : function(errorMessage){
					alert(errorMessage.statusText);		//Error from PHP File
				}
			});
		}
	});	
});
