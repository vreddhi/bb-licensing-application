<?php
	include("../includes/connection.php");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	$familyQuery = "SELECT * FROM coursefamily";
	$familyResult = $conn->query($familyQuery);
	
	$query = "SELECT * FROM course WHERE courseId = " . $_GET['courseId'];
	$result = $conn->query($query);

	/* create one master array of the records */
	$clients = array();
	
	if ($familyResult->num_rows > 0) {
		 while($row = $familyResult->fetch_assoc()) {
			 $family[] = $row;
			//echo "id: " . $row["clientId"]. " - Name: " . $row["clientName"]. " " . $row["licenseName"]. "<br>";
		}	
		
	}else{
		$family[] = [];
	}
	
	//echo 'family:'. json_encode( $family)
	
	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			 $course[] = $row;
			//echo "id: " . $row["clientId"]. " - Name: " . $row["clientName"]. " " . $row["licenseName"]. "<br>";
		}		
		//echo json_encode($json);
	}else{
		$course[] = [];
	}
	//$JSON = json_encode( $family) .  json_encode( $course);
	$familyJSON = json_encode(array('family' => $family)); 
	$courseJSON = json_encode(array('course' => $course));	
	
	$JSON =json_encode(array_merge(json_decode($familyJSON, true),json_decode($courseJSON, true)));
	header('Content-type: application/json');
	echo $JSON;
	
?>