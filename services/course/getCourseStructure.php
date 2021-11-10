<?php

include("../includes/connection.php");
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$json_params = file_get_contents("php://input");
$decoded_params = json_decode($json_params);

$courseType = $decoded_params->{'courseType'};
$courseId = $decoded_params->{'courseId'};

$query = "SELECT * FROM coursedetails WHERE courseId = " . $courseId . " AND courseTypeId = " . $courseType;
$resultSet = $conn->query($query);

//$courseType = $decoded_params->{'selectedCourseType'};

if ($resultSet->num_rows > 0) {
    while($row = $resultSet->fetch_assoc()) {
        $json[] = $row;
       //echo "id: " . $row["course.familyId"]. " - Name: " . $row["coursefamily.familyName"] . "<br>";
   }
   $JSONOutput = json_encode($json);
   
	
} else {

    $JSONOutput = '[]';
}
	
  
 $conn->close();
 echo $JSONOutput;
 //echo $query;

?>