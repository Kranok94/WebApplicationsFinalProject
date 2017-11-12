//Event's Revenue JQuery Code
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
				var jsonToSend = {
									"action" : "CALCULATE_EVENTS_REVENUES"
								};
				$.ajax({
					url : "./data/applicationLayer.php",
					type : "POST",
					data : jsonToSend,
					ContentType : "application/json",
					dataType : "json",
					success : function(dataReceived){
						//console.log(dataReceived.MESSAGE);
						//console.log(dataReceived[0].productsSold + " " + dataReceived[0].allProducts);
						var newHtml = "";
						newHtml += '<table id="eventsRevenueTable">';
						newHtml += '<h2 id="headerERev">'+'Gadget XChange\'s Revenues' +'</h2>';
						newHtml += '<tr>';
						newHtml += '<th>'+'Concept'+'</th>';
						newHtml += '<th>Owners\'s Name</th>';
						newHtml += '<th>Rent</th>';
						newHtml += '<th>Remuneration</th>';
						newHtml += '<th>Earnings</th>';
						newHtml += '</tr>';	

						var numberOfOwners = dataReceived[0].numberOfOwners;
						var totalGainEarnings = 0;
						var gainPerOwner;
						for(var i = 0; i < numberOfOwners; i++){
							newHtml += '<tr>';
							newHtml += '<td>' + '<span class="dashes">-------------------</span>' + '-' + '<span class="dashes">-------------------</span>' +'</td>';
							newHtml += '<td>' + dataReceived[i].ownerName +'</td>';
							newHtml += '<td>' + "$" + dataReceived[i].rent +'</td>';
							newHtml += '<td>' + "$" + dataReceived[i].remuneration +'</td>';
							gainPerOwner = dataReceived[i].rent + dataReceived[i].remuneration;
							totalGainEarnings = totalGainEarnings + gainPerOwner;

							newHtml += '<td>' + "$" + gainPerOwner +'</td>';
							newHtml += '</tr>';
						}
						newHtml += '<tr>';
						newHtml += '<td>' + 'TOTAL' +'</td>';
						newHtml += '<td>' + '<span class="dashes">-------------------</span>' + '-' + '<span class="dashes">-------------------</span>'  +'</td>';
						newHtml += '<td>' + '<span class="dashes">-----------</span>' + '-' + '<span class="dashes">-----------</span>'  +'</td>';
						newHtml += '<td>' + '<span class="dashes">-----------------</span>' + '-' + '<span class="dashes">-----------------</span>'  +'</td>';
						newHtml += '<td>' + "$" + totalGainEarnings  +'</td>';
						newHtml += '</tr>';

						newHtml += '</table>';
						$("#tableContainerEventsRevenue").append(newHtml);
						
					},
					error : function(errorMessage){
						alert(errorMessage.statusText);		//Error from PHP File
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
