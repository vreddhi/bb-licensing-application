<?php

include("../includes/connection.php");
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
	

$json_params = file_get_contents("php://input");
$decoded_params = json_decode($json_params);
  //echo $decoded_params->{'clientId'};
 
	$query = "UPDATE clients SET isActive = 0, deActivatedDate = now() WHERE clientId = " . $decoded_params->{'clientId'};
	
	if ($conn->query($query) === TRUE) {
		$JSONOutput =  '{"result": {"code": "1","message": "Client has been de-activated Successfully!"}}';
	}else{
		$JSONOutput =  '{"result": {"code": "0","message": "Client de-activated has been Failed!"}}';
	}
  
 $conn->close();
 echo $JSONOutput;

?>