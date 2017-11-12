//Owner's Revenue JQuery Code
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
				$("#ownersNameSubmit").on("click", function(){
					var oName = $("#ownersName").val();
					if(oName == ""){
						$("#ownersNameSpan").text("Please enter Information");
					}
					else{
						$("#ownersNameSpan").text("");
					}
					
					if(oName != ""){
						//console.log(oName);
						var jsonToSend = {
											"ownerName" : oName,
											"action" : "CALCULATE_OWNERS_REVENUES"
										};
						$.ajax({
							url : "./data/applicationLayer.php",
							type : "POST",
							data : jsonToSend,
							ContentType : "application/json",
							dataType : "json",
							success : function(dataReceived){
								//console.log("Revenues Updated");
								//console.log(dataReceived[0].productsSold + " " + dataReceived[0].allProducts);
								$("#headerRev").remove();
								$("#ownersRevenueTable").remove();
								$("#errorM").remove();
								$("#extraSpan").remove();
								$("#ownersName").val("");

								var productsSold = dataReceived[0].productsSold;
								var allProducts  = dataReceived[0].allProducts;
								var newHtml = "";
								
								if(productsSold > 0){
									newHtml += '<table id="ownersRevenueTable">';
									newHtml += '<h2 id="headerRev">'+dataReceived[0].owner+'</h2>';
									newHtml += '<tr>';
									newHtml += '<th>'+'Concept'+'</th>';
									newHtml += '<th>Product\'s Name</th>';
									newHtml += '<th>Price</th>';
									newHtml += '<th>Remuneration for SAISD (10%)</th>';
									newHtml += '<th>Earnings</th>';
									newHtml += '</tr>';
									
									var gainLoss = 0;
									var totalGainLoss = 0;
									for(var i = 0; i < productsSold; i++){
										newHtml += '<tr>';
										newHtml += '<td>' + '<span class="dashes">-------------------</span>' + '-' + '<span class="dashes">-------------------</span>' +'</td>';
										newHtml += '<td>' + dataReceived[i].productName +'</td>';
										newHtml += '<td>' + "$" + dataReceived[i].productPrice +'</td>';
										newHtml += '<td>' + "-$" + dataReceived[i].productPrice*0.10 +'</td>';
										gainLoss = (dataReceived[i].productPrice*.9);
										totalGainLoss = totalGainLoss + gainLoss;

										newHtml += '<td>' + "$" + gainLoss +'</td>';
										newHtml += '</tr>';
									}
									var totalRent = allProducts*20;
									newHtml += '<tr>';
									newHtml += '<td>' + 'Rent ($20 per Product)' +'</td>';
									newHtml += '<td>' + '<span class="dashes">-------------------</span>' + '-' + '<span class="dashes">-------------------</span>'  +'</td>';
									newHtml += '<td>' + '<span class="dashes">-----------</span>' + '-' + '<span class="dashes">-----------</span>'  +'</td>';
									newHtml += '<td>' + '<span class="dashes">-----------------------------------</span>' + '-' + '<span class="dashes">-----------------------------------</span>'  +'</td>';
									newHtml += '<td>' + "-$" + totalRent +'</td>';
									newHtml += '</tr>';

									totalGainLoss = totalGainLoss - totalRent;

									newHtml += '<tr>';
									newHtml += '<td>' + 'TOTAL' +'</td>';
									newHtml += '<td>' + '<span class="dashes">-------------------</span>' + '-' + '<span class="dashes">-------------------</span>'  +'</td>';
									newHtml += '<td>' + '<span class="dashes">-----------</span>' + '-' + '<span class="dashes">-----------</span>'  +'</td>';
									newHtml += '<td>' + '<span class="dashes">-----------------------------------</span>' + '-' + '<span class="dashes">-----------------------------------</span>'  +'</td>';
									if(totalGainLoss < 0){
											newHtml += '<td>' + "-$" + totalGainLoss  +'</td>';
									}
									else{
										newHtml += '<td>' + "$" + totalGainLoss  +'</td>';
									}
									newHtml += '</tr>';

									newHtml += '</table>';
									$("#tableContainerRevenue").append(newHtml);
								}	
								else if(productsSold == 0) {
									newHtml += '<div id="errorM" class="spanBanner"><center>No Earnings for Owner</center></div>';
									$("#tableContainerRevenue").append(newHtml);
								}
								else if(productsSold == -1) {
									newHtml += '<div id="errorM" class="spanBanner"><center>Owner not Found</center></div>';
									$("#tableContainerRevenue").append(newHtml);
								}

							},
							error : function(errorMessage){
								alert(errorMessage.statusText);		//Error from PHP File
							}
						});
					}
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
