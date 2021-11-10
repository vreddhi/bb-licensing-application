<?php

include("../includes/connection.php");
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$json_params = file_get_contents("php://input");
$decoded_params = json_decode($json_params);

$courseType = $decoded_params->{'courseType'};
$structure = $decoded_params->{'structure'};
$courseId = $decoded_params->{'courseId'};

$query1 = "SELECT * FROM coursedetails WHERE courseId = " . $courseId . " AND courseTypeId = " . $courseType;
$result1 = $conn->query($query1);

//$courseType = $decoded_params->{'selectedCourseType'};

if ($result1->num_rows == 0) {
   
    $query = "INSERT INTO coursedetails (courseId, courseTypeId, structure) VALUES (" . $courseId  .", " . $courseType .", '" .  $structure . "')" ;
    
    if ($conn->query($query) === TRUE) {
        $JSONOutput =  '{"result": {"code": "1","message": "Course structure has been added Successfully!"}}';
    }else{
        $JSONOutput =  '{"result": {"code": "0","message": "Adding new structure has been Failed!"}}';
    }
	
} else {

    $query = "Update coursedetails SET structure = '" . $structure  . "' WHERE courseId=". $courseId ." AND courseTypeId = ". $courseType;
    
    if ($conn->query($query) === TRUE) {
        $JSONOutput =  '{"result": {"code": "1","message": "Course structure has been updated Successfully!"}}';
    }else{
        $JSONOutput =  '{"result": {"code": "0","message": "Course structure update has been Failed!"}}';
    }
}
	
  
 $conn->close();
 echo $JSONOutput;
 //echo $query;

?>