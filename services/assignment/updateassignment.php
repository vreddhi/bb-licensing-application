<?php
	include("../includes/connection.php");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	$json_params = file_get_contents("php://input");
	$decoded_params = json_decode($json_params);
	
	$query = "Update assignment SET licenseCount = " . $decoded_params->{'count'}  . ", courseTypeId = " . $decoded_params->{'courseTypeId'} . " WHERE assignId = " . $decoded_params->{'id'};
	
	$resultSet = $conn->query($query);
	if ($resultSet) {
		echo '{"result": {"code": "1","message": "Course has been updated successfully!"}}'; 
	}else{
		echo '{"result": {"code": "0","message": "Course updation failed!"}}'; 
	}

?>