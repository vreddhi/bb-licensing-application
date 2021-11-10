<?php

	include("../includes/connection.php");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
		
	$json_params = file_get_contents("php://input");
	$decoded_params = json_decode($json_params);
	
	$query = "SELECT * FROM login WHERE userName = '" . $decoded_params->{'userName'} . "' AND 	password = '" . $decoded_params->{'password'} ."'";
	$result = $conn->query($query);
	
	//echo $decoded_params->{'userName'} . $decoded_params->{'password'};
	if ($result) {
		if ($result->num_rows > 0) {
		
			 while($row = $result->fetch_assoc()) {
				 $userId = $row["userId"];
				//echo "id: " . $row["course.familyId"]. " - Name: " . $row["coursefamily.familyName"] . "<br>";
			}
			$JSONOutput =  '{"result": {"code": "' . $userId. '","success": "true"}}';
				
			}else{
				$JSONOutput =  '{"result": {"code": "0","success": "false"}}';
			}
	}else{
		$JSONOutput =  '{"result": {"code": "-1","success": "false"}}';
	}
	
	 $conn->close();
	 echo $JSONOutput;

?>