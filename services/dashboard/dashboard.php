<?php
	include("../includes/connection.php");
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	$timeline = $_GET['timeline'];
	$todayDate = date('Y-m-d', strtotime('1 days')) . " " . '00:00:00';
	$startDate = date('Y-m-d', strtotime('-'. $timeline.' days')) . " " . '00:00:00';

	if($timeline > 30) {		
		$newUserQuery = "SELECT DATE_FORMAT(date, '%m-%Y') as date, COUNT(*) as cnt from usertracking WHERE date between '" . $startDate . "' AND '" . $todayDate ."' GROUP BY DATE_FORMAT(date, '%m-%Y')";

		$newUserVectorQuery = "SELECT DATE_FORMAT(date, '%m-%Y') as date, COUNT(*) as cnt from aiccusertracking WHERE clientId = 'vector' AND date between '" . $startDate . "' AND '" . $todayDate ."' GROUP BY DATE_FORMAT(date, '%m-%Y')";

	}  else {
		$newUserQuery = "SELECT date(date) as date, COUNT(*) as cnt from usertracking WHERE date between '" . $startDate . "' AND '" . $todayDate ."' GROUP BY date(date)";

		$newUserVectorQuery = "SELECT date(date) as date, COUNT(*) as cnt from aiccusertracking WHERE clientId = 'vector' AND date between '" . $startDate . "' AND '" . $todayDate ."' GROUP BY date(date)";
	}
		
	
	/*$countQuery = "select count(DISTINCT U.studentId) as students, count(DISTINCT CL.clientId) as clients, count(DISTINCT C.courseId) as courses from usertracking U, clients CL, course C where C.isactive = 1";

	$countResult = $conn->query($countQuery);

	if ($countResult->num_rows > 0) {
		 while($row = $countResult->fetch_assoc()) {
			 $countsJson[] = $row;			
		}
	}else{
		$countsJson = [];
	}
	
	$counts = json_encode(array('counts' => $countsJson)); */

	/******************************/
	/* Get top 5 trending courses */
	/******************************/

	$query = "SELECT course.courseName, usertracking.courseId, COUNT(*) AS cnt FROM course, usertracking WHERE course.courseId = usertracking.courseId AND course.createdBy = " . $_GET['userId'] . " AND usertracking.date between '" . $startDate . "' AND '" . $todayDate ."' group by course.courseId ORDER BY cnt DESC LIMIT 5";
	
	$result = $conn->query($query);

	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			 $json[] = $row;			
		}
	}else{
		$json = [];
	}
	
	$courseGraph = json_encode(array('courseGraph' => $json)); 

	/******************************/
	/* Get top 10 active clients */
	/******************************/
																								
	$clientQuery = "SELECT C.clientName, COUNT(U.clientId) AS cnt FROM usertracking U LEFT JOIN clients C ON C.clientId = U.clientId WHERE U.date between '" . $startDate . "' AND '" . $todayDate ."' GROUP BY C.clientId Order BY cnt DESC LIMIT 10";
		 
	
	$clientResult = $conn->query($clientQuery);

	if ($clientResult->num_rows > 0) {
		 while($row = $clientResult->fetch_assoc()) {
			 $clientjson[] = $row;			
		}
	}else{
		$clientjson = [];
	}
	
	$clientGraph = json_encode(array('clientGraph' => $clientjson)); 
	
 	/******************************/
	/* Get New users from the timeline given */
	/******************************/

	$newUserResult = $conn->query($newUserQuery);

	if ($newUserResult->num_rows > 0) {
		 while($row = $newUserResult->fetch_assoc()) {
			 $newuserjson[] = $row;			
		}
	}else{
		$newuserjson = [];
	}
	
	$newuserGraph = json_encode(array('newuserGraph' => $newuserjson));

	/******************************/
	/* Get New users from Vector in the timeline given */
	/******************************/

	$newUserVectorResult = $conn->query($newUserVectorQuery);

	if ($newUserVectorResult->num_rows > 0) {
		 while($row = $newUserVectorResult->fetch_assoc()) {
			 $newuserVectorjson[] = $row;			
		}
	}else{
		$newuserjson = [];
	}
	
	$newuserVectorGraph = json_encode(array('newuserVectorGraph' => $newuserVectorjson));

	/******************************/
	/* Expiry Notifications  */
	/******************************/
	
	$endDate = date('Y-m-d', strtotime('+60 days'));	
	$todayDate = date('Y-m-d', strtotime('-1 days'));
	
	$query = "SELECT clientName, endDate FROM clients WHERE endDate <= '" . $todayDate . "' AND createdBy = " . $_GET['userId'];
	$result = $conn->query($query);
	
	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			$row["type"] = 1;
			 $json1[] = $row;			
		}
		//echo json_encode($json1);
	}else{
		$json1 = [];
	}
	
	$query = "SELECT clientName, endDate FROM clients WHERE endDate between '" . $todayDate . "' AND '" . $endDate . "' AND createdBy = " . $_GET['userId'];
	$result = $conn->query($query);
	
	if ($result->num_rows > 0) {
		 while($row = $result->fetch_assoc()) {
			$row["type"] = 2;
			 $json2[] = $row;			
		}
		//echo json_encode($json2);
	}else{
		$json2 = [];
	}
	$notification =array_merge($json1,$json2);
	$notification = json_encode(array('notification' => $notification)); 	
		

	$JSON =json_encode(array_merge(json_decode($courseGraph, true),json_decode($clientGraph, true),json_decode($newuserGraph, true), json_decode($newuserVectorGraph, true), json_decode($notification, true)));
	echo $JSON;
?>