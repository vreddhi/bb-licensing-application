<?php

include("../includes/config.php");

$location = $masterCourse;

// Count total files
$countfiles = count($_FILES['file']['name']);

$filename_arr = array(); 
// Looping all files
for ( $i = 0;$i < $countfiles;$i++ ){
    $filename = $_FILES['file']['name'][$i];  
     
    // Upload file    
    move_uploaded_file($_FILES['file']['tmp_name'][$i],$location.$filename);      
    $filename_arr[] = $filename;
}

$arr = array('name' => $filename_arr);
echo json_encode($arr);

?>