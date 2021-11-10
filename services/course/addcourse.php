<?php

include("../includes/connection.php");
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$json_params = file_get_contents("php://input");
$decoded_params = json_decode($json_params);

$familyId = $decoded_params->{'familyId'};
$courseName = $decoded_params->{'courseName'};
$userId = $decoded_params->{'userId'};
$description = $decoded_params->{'description'};
$youtube = $decoded_params->{'youtube'};
$artwork = $decoded_params->{'artwork'};
$bundle = $decoded_params->{'bundle'};
//$courseType = $decoded_params->{'selectedCourseType'};

	 if(!isset($decoded_params->courseId)){
		$query = "INSERT INTO course (familyId, courseName,	isactive, createdBy, description, artwork, youtube, bundle) VALUES ('" . $familyId  ."', '" . $courseName ."', 1 , '" .  $userId . "', '" .  $description . "', '" .  $artwork . "', '" .  $youtube . "', '" .  $bundle . "')" ;
		
		if ($conn->query($query) === TRUE) {
			$last_id = $conn->insert_id;
			$JSONOutput =  '{"result": {"code": "1","message": "Course has been added Successfully!", "courseId" : '. $last_id .'}}';
		}else{
			$JSONOutput =  '{"result": {"code": "0","message": "Adding new Course has been Failed!"}}';
		}
	
	}else{
		$query = "UPDATE course SET familyId = '" . $familyId ."', courseName = '" . $courseName ."', description = '" . $description . "' , description = '" . $description . "' , description = '" . $description . "' , description = '" . $description . "' , description = '" . $description . "' WHERE courseId = " . $decoded_params->{'courseId'} ;
		
		if ($conn->query($query) === TRUE) {
			$JSONOutput =  '{"result": {"code": "1","message": "Course has been updated Successfully!"}}';
		}else{
			$JSONOutput =  '{"result": {"code": "0","message": "Course updation has been Failed!"}}';
		}
		
	}	
	
  
 $conn->close();
 echo $JSONOutput;

?>