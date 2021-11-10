<?php
	include("../includes/connection.php");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	$query = "SELECT * FROM clients WHERE clientId = " . $_GET['clientId'];
	$result = $conn->query($query);

	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			 $json[] = $row;
			//echo "id: " . $row["clientId"]. " - Name: " . $row["clientName"]. " " . $row["licenseName"]. "<br>";
		}
		header('Content-type: application/json');
		echo json_encode($json);
	}else{
		echo '[]';
	}
	
	
?>