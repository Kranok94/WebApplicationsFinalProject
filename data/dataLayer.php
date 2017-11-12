<?php
	function databaseConnection(){
		$servername = "localhost";		
		$username = "root";
		$password = "root";						
		$dbname = "gadgetxchangedatabase";		

		$conn = new mysqli($servername, $username, $password, $dbname); 
		
		if($conn->connect_error){		
			return null;
		}
		else{
			return $conn;
		}
	}

	function attemptLogin($userName, $userPassword, $remember){
		$connection = databaseConnection();

		if($connection != null){
			$key = pack('H*', "bab04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
			$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
			$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

			$sql = "SELECT * FROM Users WHERE username = '$userName'";
			$result = $connection->query($sql);

			if($result->num_rows > 0){
				while($row = $result->fetch_assoc()){
					$pass = $row["password"];
					$length = $row["passwordLength"];
					$pass_dec = base64_decode($pass);
					$iv_dec = substr($pass_dec, 0, $iv_size);
					$pass_dec = substr($pass_dec, $iv_size);
					$pass_decripted = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $pass_dec, MCRYPT_MODE_CBC, $iv_dec);
					
					$pass_decripted = substr($pass_decripted, 0, $length);

					if($pass_decripted == $userPassword){
						if($remember == "1"){
							setcookie("username", $userName, time()+(60*60*24*30), "/"); 
						}
						session_start();
						if(!isset($_SESSION["username"])){
							$_SESSION["username"] = $row["username"];
						}
						if(!isset($_SESSION["password"])){
							$_SESSION["password"] = $row["password"];
						}
						if(!isset($_SESSION["userType"])){
							$_SESSION["userType"] = $row["userType"];
						}
						$response = array("userType"=>$row["userType"], "MESSAGE"=>"SUCCESS");		
						$connection->close();	
						return $response;	
					}
					else{
						$connection->close();
						return array("MESSAGE"=>"406");
					}
				}
			}
			else{
				$connection->close();
				return array("MESSAGE"=>"406");
			}
		}
		else{
			return array("MESSAGE" => "500");
		}
	}

	function attemptCookie(){
		if(isset($_COOKIE['username'])){
			$response = array('username'=>$_COOKIE['username'],'MESSAGE'=>'SUCCESS');
			return $response;
		}
		else{
			return array("MESSAGE" => "404");
		}
	}

	function attemptSessionStart(){
		session_start();
		if(isset($_SESSION['username']) && isset($_SESSION['password']) && isset($_SESSION['userType'])){
			$response = array('uType'=>$_SESSION['userType'],'MESSAGE'=>'SUCCESS');
			return $response;
		}
		else{
			return array("MESSAGE" => "406");
		}
	}

	function attemptSessionEnd(){
		session_start();
		if(isset($_SESSION['username']) && isset($_SESSION['password']) && isset($_SESSION['userType'])){
			unset($_SESSION['username']);
			unset($_SESSION['password']);
			unset($_SESSION['userType']);
			session_destroy();
			$response = array('MESSAGE'=>'SUCCESS');
			return $response;
		}
		else{
			return array("MESSAGE" => "406");
		}
	}

	function attemptCheckSession(){
		session_start();
		if(isset($_SESSION['userType'])){
			$response = array('userType'=>$_SESSION['userType'],'MESSAGE'=>'SUCCESS');
			return $response;
		}
		else{
			return array("MESSAGE" => "406");
		}
	}

	function attemptAddNewProduct($productName, $ownerName, $ownerEmail, $ownerPhone, $productPrice){
		$connection = databaseConnection();

		if($connection != null){
			$sql = "SELECT * FROM Products";
			$result = $connection->query($sql);
			$num_rows = $result->num_rows + 1;

			$newCode = "CODE" . $num_rows;
			$sql = "INSERT INTO Products(productName, ownerName, ownerEmail, ownerPhoneNumber, productPrice, sold, codes)
								VALUES('$productName','$ownerName','$ownerEmail', '$ownerPhone', '$productPrice', '0', '$newCode')";

			if($connection->query($sql) === TRUE){
				$response = array("prodCode"=>$newCode, "MESSAGE"=>"SUCCESS");
				$connection->close();
				return $response;
			}
			else{
				$connection->close();	
				return array("MESSAGE"=>"501");
			}
		}
		else{
			return array("MESSAGE" => "500");
		}
	}

	function attemptRetrieveProducts(){
		$connection = databaseConnection();

		if($connection != null){
			$sql = "SELECT * FROM Products WHERE sold = '0'";
			$result = $connection->query($sql);

			if($result->num_rows > 0){
				$c = 0;
				while($row = $result->fetch_assoc()){
					$response[$c++] = array("productName"=>$row["productName"], "productPrice"=>$row["productPrice"], "productCode"=>$row["codes"], "counter"=>$result->num_rows, "MESSAGE"=>"SUCCESS");			
				}				
				$connection->close();
				return $response;	
			}
			else{
				$connection->close();	
				return array("MESSAGE"=>"502");
			}
		}
		else{
			return array("MESSAGE" => "500");
		}
	}

	function attemptSearchProduct($productName){
		$connection = databaseConnection();

		if($connection != null){
			$sql = "SELECT * FROM Products WHERE sold = '0'";
			$result = $connection->query($sql);

			$parseInputProduct = explode(" ", $productName);
			$matchedProducts = 0;
			if($result->num_rows > 0){
				$c = 0;
				while($row = $result->fetch_assoc()){
					$str = "";
					$parseDatabaseProduct = "";
					$str = strtoupper($row["productName"]);
					$parseDatabaseProduct = explode(" ", $str);
					$matchValue = 0;
					$m = 0;
					for($i = 0; $i < count($parseInputProduct); $i++){
						for($j = 0; $j < count($parseDatabaseProduct); $j++){
							if($parseInputProduct[$i] === $parseDatabaseProduct[$j]){
								$matchValue++;
								if($m == 0){
									$matchedProducts++;
									$m = 1;
								}
							}
						}
					}
					if($matchValue > 0){
						$temp[$c++] = array("productName"=>$row["productName"], "productPrice"=>$row["productPrice"], "productCode"=>$row["codes"], "match"=>$matchValue);			
					}
				}
				$highestMatch = 0;
				for($i = 0; $i < $matchedProducts; $i++){
					if($temp[$i]["match"] > $highestMatch){
						$highestMatch = $temp[$i]["match"];
					}
				}

				$c = 0;
				while($highestMatch > 0){
					$cont = 0;
					for($i = 0; $i < $matchedProducts; $i++){
						if($temp[$i]["match"] == $highestMatch){
							$response[$c++] = array("productName"=>$temp[$i]["productName"], "productPrice"=>$temp[$i]["productPrice"], "productCode"=>$temp[$i]["productCode"], "counter"=>$temp[$i]["match"], "MESSAGE"=>"SUCCESS");			
							$cont = 1;
							$temp[$i]["match"] = 0;
						}
					}
					if($cont == 0){
						$highestMatch = $highestMatch - 1;
					}
				}			
			}
			else{
				$connection->close();	
				return array("MESSAGE"=>"502");
			}

			$upperCaseProductName = strtoupper($productName);
			$sql = "SELECT * FROM Products WHERE sold = '0' AND codes = '$upperCaseProductName'";
			$result = $connection->query($sql);
			if($result->num_rows > 0){
				while($row = $result->fetch_assoc()){
					$response[$matchedProducts++] = array("productName"=>$row["productName"], "productPrice"=>$row["productPrice"], "productCode"=>$row["codes"], "counter"=>$matchedProducts, "MESSAGE"=>"SUCCESS");			
				}
			}
			$response[0]["counter"] = $matchedProducts;	
			$connection->close();
			return $response;	
		}
		else{
			return array("MESSAGE" => "500");
		}
	}

	function attemptSellProduct($prodCode){
		$connection = databaseConnection();
		
		if($connection != null){
			$sql = "UPDATE Products SET sold='1' WHERE codes='$prodCode'";

			if($connection->query($sql) === TRUE){
				$response = array("MESSAGE"=>"SUCCESS");
				$connection->close();
				return $response;
			}
			else{
				$connection->close();	
				return array("MESSAGE"=>"407");
			}
		}
		else{
			return array("MESSAGE" => "500");
		}
	}

	function attemptCalculateOwnersRevenues($ownerData){
		$connection = databaseConnection();
		
		if($connection != null){
			$dataUpperCase = strtoupper($ownerData);
			$dataLowerCase = strtolower($ownerData);

			$sql = "SELECT * FROM Products";
			$result = $connection->query($sql);

			$found = 0;
			if($result->num_rows > 0){
				$c = 0;
				$all = 0;
				while($row = $result->fetch_assoc()){
					$ownerN = strtoupper($row["ownerName"]);
					$ownerE = $row["ownerEmail"];
					$sold 	= $row["sold"];

					if($ownerN == $dataUpperCase || $ownerE == $dataLowerCase){
						$found = 1;
						$all++;
						if($sold == 1){
							$response[$c++] = array("owner"=>$row["ownerName"],"productName"=>$row["productName"], "productPrice"=>$row["productPrice"], "allProducts"=> 0, "productsSold"=>$c+1, "MESSAGE"=>"SUCCESS");			
						}
					}
				}	
				$response[0]["productsSold"] = $c;				//If 0, no revenues are obtained from that User
				$response[0]["allProducts"] = $all;
			}
			else{	
				$connection->close();
				return array("MESSAGE" => "408");
			}
			if($found == 0){
				$response[0]["productsSold"] = -1;				//Means that the User doesn't Exist
				$response[0]["allProducts"] = -1;	
			}
			$connection->close();
			return $response;	
		}
		else{
			return array("MESSAGE" => "500");
		}
	}

	function attemptCalculateEventsRevenues(){
		$connection = databaseConnection();
		
		if($connection != null){
			$sql = "SELECT * FROM Products";
			$result = $connection->query($sql);

			if($result->num_rows > 0){
				$c = 0;
				while($row = $result->fetch_assoc()){
					$found = 0;
					for($i = 0; $i < $c; $i++){
						if($response[$i]["ownerName"] == $row["ownerName"]){
							$found = 1;
							$response[$i]["rent"] = $response[$i]["rent"] + 20;
							if($row["sold"] == 1){
								$response[$i]["remuneration"] = $response[$i]["remuneration"] + $row["productPrice"]*0.1;
							}
						}
					}
					if($found == 0){
						if($row["sold"] == 1){
							$response[$c++] = array("ownerName"=>$row["ownerName"],"rent"=>20, "remuneration"=>$row["productPrice"]*0.1, "owners"=>$c+1, "MESSAGE"=>"SUCCESS");			
						}
						else{
							$response[$c++] = array("ownerName"=>$row["ownerName"],"rent"=>20, "remuneration"=>0, "owners"=>$c+1, "MESSAGE"=>"SUCCESS");			
						}
					}
				}	
				$response[0]["owners"] = $c;
				$connection->close();
				return $response;	
			}
			else{	
				$connection->close();
				return array("MESSAGE" => "409");
			}
		}
		else{
			return array("MESSAGE" => "500");
		}
	}
?>