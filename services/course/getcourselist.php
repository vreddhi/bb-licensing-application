<?php
	include("../includes/connection.php");
		
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	/* grab the CLIENTS from the db */
	$query = "SELECT * FROM course, coursefamily WHERE course.isActive = 1 AND course.createdBy = " . $_GET['userId'] ." AND course.familyId = coursefamily.familyId ORDER BY course.createdOn DESC";
	$result = $conn->query($query);

	/* create one master array of the records */
	//header('Content-type: application/json');



	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			 $json[] = $row;			
			// echo "id: " . $row["courseId"]. " - Name: " . $row["courseName"]. " " . $row["coursePath"]. "<br>";
		}
		echo json_encode($json);
	}else{
		echo '[]';
	}
	
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