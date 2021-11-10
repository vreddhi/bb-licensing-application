<?php
	include("includes/connection.php");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	/* grab the CLIENTS from the db */
	
	$reseller = $_GET['clientId'];
	$today = date('Y-m-d');
	
	$sql = "SELECT clientId FROM clients where licenseName = '$reseller' and endDate >= '$today'";
	$result = $conn->query($sql);

	//echo $result->num_rows;

	if ($result->num_rows > 0) {
		
		if ( $row = $result->fetch_assoc()){
			$clientId = $row["clientId"];
		}
		$JSONOutput =  '{"result": {"code": "1","clientId":"' . $clientId . '","message": "Valid user"}}';
		
		
	} else{
		$JSONOutput =  '{"result": {"code": "-1","message": "License expired"}}';
	}

	echo $JSONOutput;
?>