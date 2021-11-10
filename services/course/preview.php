<?php

include("../includes/connection.php");
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

 $courseId = $_GET['courseId'];
 $courseTypeId = $_GET['courseTypeId'];

	$sql = "SELECT structure FROM coursedetails where courseId = '$courseId' and courseTypeId = $courseTypeId";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
		   $structure = $row["structure"];
		}
	   
	} else {
		$sql = "SELECT structure FROM coursedetails where courseId = '$courseId' and courseTypeId = 1";
		$result1 = $conn->query($sql);
		if ($result1->num_rows > 0) {
			while($row = $result1->fetch_assoc()) {
			   $structure = $row["structure"];
			}
		   
		}
	}
	header('Content-type: application/json');
	//echo $courseId . ' :::: ' . $courseTypeId;
    echo '{"result": {"code": "1","message": "Valid user", "structure" : ' . $structure . ' }}';

?>