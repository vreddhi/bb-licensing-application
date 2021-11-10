<?php
	//include("../includes/connection.php");

	$servername = "localhost";
    $username = "root";
    $password = "";
	$dbname = "license1";
	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	/* grab the CLIENTS from the db */
	$query = "SELECT * FROM clients WHERE isActive = 1 AND createdBy = " . $_GET['userId'];
	$result = $conn->query($query);

	/* create one master array of the records */
	$clients = array();
	
	
	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			 $json[] = $row;
			//echo "id: " . $row["clientId"]. " - Name: " . $row["clientName"]. " " . $row["licenseName"]. "<br>";
		}
		//header('Content-type: application/json');
		//echo json_encode($json);
		echo json_encode(utf8ize($json));
	}else{
		echo '[]';
	}
	
	/* output in necessary format */
	//echo $clients;
	//header('Content-type: application/json');
	//echo json_encode(array('posts'=>$posts));
	
	function utf8ize($d) {
		if (is_array($d)) {
			foreach ($d as $k => $v) {
				$d[$k] = utf8ize($v);
			}
		} else if (is_string ($d)) {
			return utf8_encode($d);
		}
		return $d;
	}

?>