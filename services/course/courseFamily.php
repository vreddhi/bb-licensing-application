<?php
	include("../includes/connection.php");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	/* grab the CLIENTS from the db */
	$query = "SELECT * FROM coursefamily";
	$result = $conn->query($query);

	$query1 = "SELECT typeId, typeName FROM coursetype";
	$result1 = $conn->query($query1);
	/* create one master array of the records */
	
	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			 $family[] = $row;	
		}
	}else{
		echo '[]';
	}
	$json_coursefamily = '"courseFamily":' . json_encode($family);
	//echo $json_coursefamily;
	//echo gettype($json_coursefamily); 
	//$json_coursefamily = '"{courseFamily":' . json_encode($family) . '}';
	
	if ($result1->num_rows > 0) {
		while($row = $result1->fetch_assoc()) {
			$courseType[] = $row;	
		}
	}else{
		echo '[]';
	}
	$json_courseType = '"courseType":' . json_encode($courseType);
	
	echo '{' . $json_coursefamily . ',' . $json_courseType . '}';

?>