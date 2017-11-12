<?php
	header('Content-type: application/json');	
	header('Accept: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["action"];

	switch($action){
		case "LOGIN" 						:	loginFunction();
												break;
		case "COOKIE"						:	cookieFunction();
												break;
		case "SESSION_START"				:	sessionStartFunction();
												break;
		case "SESSION_END"					:	sessionEndFunction();
												break;
		case "CHECK_SESSION"				:	checkSessionFunction();
												break;
		case "ADD_NEWPRODUCT"				:	addNewProductFunction();
												break;
		case "SHOW_PRODUCTS"				:	showProductsFunction();
												break;
		case "SEARCH_PRODUCT"				:	searchProductFunction();
												break;
		case "SELL_PRODUCT"					:	sellProductFunction();
												break;
		case "CALCULATE_OWNERS_REVENUES"	:	calculateOwnersRevenuesFunction();
												break;
		case "CALCULATE_EVENTS_REVENUES"	:	calculateEventsRevenuesFunction();
												break;
	}

	function loginFunction(){
		$uName = $_POST["uName"];	
		$uPassword = $_POST["uPassword"];
		$rem = $_POST["remember"];

		$loginResponse = attemptLogin($uName, $uPassword, $rem);
		if($loginResponse["MESSAGE"] == "SUCCESS"){
			$response = array("userType"=>$loginResponse["userType"]);	
			echo json_encode($response);	
		}
		else{
			genericErrorFunction($loginResponse["MESSAGE"]);
		}
	}

	function genericErrorFunction($errorCode){
		switch($errorCode){
			case "500"	:	header("HTTP/1.1 500 Bad connection, portal down");		
							die("The server is down, we couldn't establish the data base.");
							break;
			case "501"	:	header("HTTP/1.1 501 Product Not Added");		
							die("Product couldn't be added.");
							break;
			case "502"	:	header("HTTP/1.1 501 No Existing Products");		
							die("Products couldn't be found.");
							break;
			case "406"	:	header("HTTP/1.1 406 User not found");
							die("Wrong credentials provided.");				//Die function gives back a JSon Response	
							break;
			case "407"	:	header("HTTP/1.1 407 Error with Selling Transaction");		
							die("Product couldn't be sold.");
							break;
			case "408"	:	header("HTTP/1.1 408 No Revenues For Owner");		
							die("$0 Revenues.");
							break;
			case "409"	:	header("HTTP/1.1 408 No Event's Revenues");		
							die("$0 Event's Revenues.");
							break;
		}
	}

	function cookieFunction(){
		$cookieResponse = attemptCookie();

		if($cookieResponse["MESSAGE"] == "SUCCESS"){
			$response = array("user"=>$cookieResponse["username"]);	
			echo json_encode($response);	
		}
		else{
			genericErrorFunction($cookieResponse["MESSAGE"]);
		}
	}

	function sessionStartFunction(){
		$sessionStartResponse = attemptSessionStart();

		if($sessionStartResponse["MESSAGE"] == "SUCCESS"){
			$response = array("userType"=>$sessionStartResponse["uType"]);	
			echo json_encode($response);	
		}
		else{
			genericErrorFunction($sessionStartResponse["MESSAGE"]);
		}
	}

	function sessionEndFunction(){
		$sessionEndResponse = attemptSessionEnd();

		if($sessionEndResponse["MESSAGE"] == "SUCCESS"){
			$response = array("message"=>"Logout Successful");	
			echo json_encode($response);	
		}
		else{
			genericErrorFunction($sessionEndResponse["MESSAGE"]);
		}
	}

	function checkSessionFunction(){
		$checkSessionResponse = attemptCheckSession();

		if($checkSessionResponse["MESSAGE"] == "SUCCESS"){
			$response = array("userType"=>$checkSessionResponse["userType"]);	
			echo json_encode($response);	
		}
		else{
			$response = array("userType"=>"thirdUser");	
			echo json_encode($response);	
		}
	}

	function addNewProductFunction(){
		$productName 	= $_POST["prodName"];	
		$ownerName 		= $_POST["ownName"];
		$ownerEmail 	= $_POST["ownEmail"];
		$ownerPhone 	= $_POST["ownPhone"];
		$productPrice 	= $_POST["prodPrice"];

		$addNewProductResponse = attemptAddNewProduct($productName, $ownerName, $ownerEmail, $ownerPhone, $productPrice);
		if($addNewProductResponse["MESSAGE"] == "SUCCESS"){
			$response = array("productCode"=>$addNewProductResponse["prodCode"]);	
			echo json_encode($response);	
		}
		else{
			genericErrorFunction($addNewProductResponse["MESSAGE"]);
		}
	}

	function showProductsFunction(){
		$retrieveProductsResponse = attemptRetrieveProducts();
		
		if($retrieveProductsResponse[0]["MESSAGE"] == "SUCCESS"){
			$c = 0;
			$count = $retrieveProductsResponse[0]["counter"];

			for($i = 0; $i < $count; $i++){
				$response[$c++] = array("prodName"=>$retrieveProductsResponse[$i]["productName"],"prodPrice"=>$retrieveProductsResponse[$i]["productPrice"],"prodCode"=>$retrieveProductsResponse[$i]["productCode"],"counter"=>$count);
			}
			echo json_encode($response);	
		}
		else{
			genericErrorFunction($retrieveProductsResponse["MESSAGE"]);
		}
	}

	function searchProductFunction(){
		$productName = $_POST["productName"];	
		
		$searchProductResponse = attemptSearchProduct($productName);
		if($searchProductResponse[0]["MESSAGE"] == "SUCCESS"){
			$c = 0;
			$count = $searchProductResponse[0]["counter"];

			for($i = 0; $i < $count; $i++){
				$response[$c++] = array("prodName"=>$searchProductResponse[$i]["productName"],"prodPrice"=>$searchProductResponse[$i]["productPrice"],"prodCode"=>$searchProductResponse[$i]["productCode"],"counter"=>$count);
			}	
		}
		else{
			$response[0] = array("counter"=> 0);
		}
		echo json_encode($response);
	}

	function sellProductFunction(){
		$prodCode = $_POST["productCode"];

		$sellProductResponse = attemptSellProduct($prodCode);
		if($sellProductResponse["MESSAGE"] == "SUCCESS"){
			$response = array("SOLD"=> "SUCCESS");
			echo json_encode($response);
		}
		else{
			genericErrorFunction($sellProductResponse["MESSAGE"]);
		}
	}

	function calculateOwnersRevenuesFunction(){
		$ownerData = $_POST["ownerName"];
		
		$calculateOwnersRevenuesResponse = attemptCalculateOwnersRevenues($ownerData);
		if($calculateOwnersRevenuesResponse[0]["MESSAGE"] == "SUCCESS"){
			$c = 0;
			$count = $calculateOwnersRevenuesResponse[0]["productsSold"];
			for($i = 0; $i < $count; $i++){
				$response[$c++] = array("owner"=>$calculateOwnersRevenuesResponse[$i]["owner"],"productName"=>$calculateOwnersRevenuesResponse[$i]["productName"],"productPrice"=>$calculateOwnersRevenuesResponse[$i]["productPrice"],"productsSold"=>0,"allProducts"=>0);
			}
			if($count > 0){
				$response[0]["productsSold"] = $calculateOwnersRevenuesResponse[0]["productsSold"];
				$response[0]["allProducts"]  = $calculateOwnersRevenuesResponse[0]["allProducts"];
				echo json_encode($response);
			}
			else{
				$response[0] = array("productsSold"=>$calculateOwnersRevenuesResponse[0]["productsSold"], "allProducts"=>$calculateOwnersRevenuesResponse[0]["allProducts"]);
				echo json_encode($response);
			}
		}
		else{
			$response[0] = array("productsSold"=>$calculateOwnersRevenuesResponse[0]["productsSold"], "allProducts"=>$calculateOwnersRevenuesResponse[0]["allProducts"]);
			echo json_encode($response);
		}
	}
	
	function calculateEventsRevenuesFunction(){
		$calculateEventsRevenuesResponse = attemptCalculateEventsRevenues();
		if($calculateEventsRevenuesResponse[0]["MESSAGE"] == "SUCCESS"){
			$c = 0;
			$count = $calculateEventsRevenuesResponse[0]["owners"];
			for($i = 0; $i < $count; $i++){
				$response[$c++] = array("ownerName"=>$calculateEventsRevenuesResponse[$i]["ownerName"],"rent"=>$calculateEventsRevenuesResponse[$i]["rent"],"remuneration"=>$calculateEventsRevenuesResponse[$i]["remuneration"],"numberOfOwners"=>$count);
			}
			echo json_encode($response);
		}
		else{
			genericErrorFunction($calculateEventsRevenuesResponse["MESSAGE"]);
		}
	}
?>