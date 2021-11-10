<?php
include("../includes/crypto.php");
include("../includes/connection.php");
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
	
$json_params = file_get_contents("php://input");
$decoded_params = json_decode($json_params);

 // echo $decoded_params->{'clientName'};
	//echo isset($decoded_params->clientId);
	 if(!isset($decoded_params->clientId)){

		$decrypt =  Encryption::encode($decoded_params->{'licenseName'});

		$query = "INSERT INTO clients (clientName, licenseName,	emailId, startDate, endDate, isactive, createdBy, decryptName) VALUES ('" .  $decoded_params->{'clientName'} ."', '" . $decoded_params->{'licenseName'} ."', '" .  $decoded_params->{'emailId'} ."', '" .  $decoded_params->{'startDate'} ."', '" .  $decoded_params->{'endDate'} ."', 1, '" .  $decoded_params->{'userId'} . "', '" . $decrypt . "')" ;
		
		if ($conn->query($query) === TRUE) {
			$JSONOutput =  '{"result": {"code": "1","message": "Client has been added Successfully!"}}';
		}else{
			//die('failed!' . mysql_error());
			$JSONOutput = $conn->error;
			//$JSONOutput =  '{"result": {"code": "0","message": "Adding new client has been Failed!"}}';
		}
	
	}else{
		$query = "UPDATE clients SET clientName = '" . $decoded_params->{'clientName'} ."', licenseName = '" . $decoded_params->{'licenseName'} ."', emailId = '" . $decoded_params->{'emailId'} . "',startDate='" . $decoded_params->{'startDate'} . "', endDate = '" . $decoded_params->{'endDate'} . "' WHERE clientId = " . $decoded_params->{'clientId'} ;
		
		if ($conn->query($query) === TRUE) {
			$JSONOutput =  '{"result": {"code": "1","message": "Client has been updated Successfully!"}}';
		}else{
			$JSONOutput =  '{"result": {"code": "0","message": "Client updation has been Failed!"}}';
		}
		
	}	
	
  
 $conn->close();
 echo $JSONOutput;

?>