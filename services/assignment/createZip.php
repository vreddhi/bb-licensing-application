<?php

include("../includes/config.php");
$json_params = file_get_contents("php://input");
$decoded_params = json_decode($json_params);

$resellerName = $decoded_params->{'resellerName'};
$coursePath = $decoded_params->{'courseName'};
$clientName = $decoded_params->{'clientName'};
$courseId = $decoded_params->{'courseId'};
$coursePath = $decoded_params->{'coursePath'};
$description = $decoded_params->{'description'};
$scormVersion = $decoded_params->{'scormVersion'};

/*$resellerName = "client1";
$coursePath = "Mastering Excel 2013 - Intermediate";
$clientName = "client1";
$courseId = "123";*/

if (!is_dir($clientDefaultPath . $clientName)) {
		mkdir($clientDefaultPath . $clientName, 0777, true);
		chmod($clientDefaultPath . $clientName, 0777);
		$clientPath = $clientDefaultPath . $clientName . "/" . date("Ymd");
		mkdir($clientPath, 0777, true);
		chmod($clientPath, 0777);
}else{
		$clientPath = $clientDefaultPath . $clientName . "/" . date("Ymd");
		if (!is_dir($clientPath)) {		
			mkdir($clientPath, 0777, true);
			chmod($clientPath, 0777);
		}
}
$clientPath = $clientPath . "/" . $coursePath;
//echo $clientPath;
//echo $clientPath . " ::: "  . "master_courses/" . $coursePath ;
full_copy($masterCoursePath . "/" . $scormVersion , $clientPath);
chmod_r($clientPath, 0777, 0755);
updateConfig($clientPath, $resellerName, $courseId, $bridgeURL, $coursePath, $description, $scormVersion);
createZip($clientPath, $coursePath);


function full_copy( $source, $target ) {
		 global $folder;
    if ( is_dir( $source ) ) {
        @mkdir( $target , 0777, true);
        $d = dir( $source );
        while ( FALSE !== ( $entry = $d->read() ) ) {
            if ( $entry == '.' || $entry == '..' ) {
                continue;
            }
            $Entry = $source . '/' . $entry; 
            if ( is_dir( $Entry ) ) {
                full_copy( $Entry, $target . '/' . $entry );
                continue;
            }
            copy( $Entry, $target . '/' . $entry );
        }
		chmod($target, 0777);
        $d->close();
    }else {
        copy( $source, $target );
    }
	chmod($target, 0777);
	//updateConfig($folder);
}

function chmod_r($dir, $dirPermissions, $filePermissions) {
      $dp = opendir($dir);
       while($file = readdir($dp)) {
         if (($file == ".") || ($file == ".."))
            continue;

        $fullPath = $dir."/".$file;

         if(is_dir($fullPath)) {
           // echo('DIR:' . $fullPath . "\n");
            chmod($fullPath, $dirPermissions);
            chmod_r($fullPath, $dirPermissions, $filePermissions);
         } else {
           // echo('FILE:' . $fullPath . "\n");
            chmod($fullPath, $filePermissions);
         }

       }
     closedir($dp);
  }

 
  
function updateConfig($path, $resellerName, $courseId, $bridgeURL, $coursePath, $description, $scormVersion){
	
	$file = $path . '/config.js';
	

	if($scormVersion == "scorm2004") {
		$coursePath = '../../courses/course_assets/' . $coursePath . '/scorm2004/imsmanifest.xml';
	} else {
		$coursePath = '../../courses/course_assets/' . $coursePath . '/imsmanifest.xml';
	}
	
	copy($coursePath, $path . '/imsmanifest.xml' );
	//echo "hai :: " . $file;
	//chmod($file,755);
	
	// Open the file to get existing content
	$current = file_get_contents($file);
	// Append a new person to the file
	//$current .= "var bridgeURL = '" . $bridgeURL . "';";
	$current .= "var resellerName = '" . $resellerName . "';";
	$current .= "var courseId = '" . $courseId . "';";
	$current .= "var downloadURL = 'https://tripletech.biz/new_interface/handbooks/" . $description . "';";
	//echo "test35345353" . realpath($file);
	if(is_writable($file)){
		// Write the contents back to the file
		file_put_contents($file, $current);
		//echo "hai";
	}
}

function createZip($sourcePath, $zipName){
	// Get real path for our folder
	$rootPath = realpath($sourcePath);
	//echo $rootPath;
	// Initialize archive object
	$zip = new ZipArchive();
	$zip->open($sourcePath . '/' . $zipName . '.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);

	// Create recursive directory iterator
	/** @var SplFileInfo[] $files */
	$files = new RecursiveIteratorIterator(
		new RecursiveDirectoryIterator(realpath($sourcePath)),
		RecursiveIteratorIterator::LEAVES_ONLY
	);

	foreach ($files as $name => $file)
	{
		// Skip directories (they would be added automatically)
		if (!$file->isDir())
		{
			// Get real and relative path for current file
			$filePath = $file->getRealPath();
			$relativePath = substr($filePath, strlen($rootPath) + 1);

			// Add current file to archive
			$zip->addFile($filePath, $relativePath);
		}
	}

	// Zip archive will be created only after closing object
	$zip->close();
	echo $sourcePath . '/' . $zipName . '.zip';
	//echo '{path:' . $sourcePath . '/' . $zipName . '.zip' . '}';
}
?>