// JavaScript Document


/*var startTime = "";
var lesson_location = "";
var BookMarkList = "";
var lesson_status = "";
var score = 0;
var elapsedTime = "";*/

var Lesson_location = "";
var Lesson_status = "";
var PageVisitedStatus = "";
var Score = "";
var StudentName = "";
var StudentID = ""
var startTime = ""


var InitTries = 7;
var tempCount = 0;
var tempInterval = "";

var KeepAlive_Count = 1;
var KeepAlive_Interval = 5;


/*******************************************************************************
**
** This function is used to tell the LMS to initiate the communication session.
**
** Inputs:  None
**
** Return:  String - "true" if the initialization was successful, or
**          "false" if the initialization failed.
**
*******************************************************************************/

function initializeCommunication(){
	
	var api = getAPIHandle();

   if ( api == null )
   {
      return "false";
   }
   else
   {
      var result = api.Initialize("");
	  startTime = new Date().getTime();
      if ( result != "true" )
      {
         var errCode = retrieveLastErrorCode();

         displayErrorInfo( errCode );

         // may want to do some error handling
      }else{
			getTracking();
	  }
   }

   //return result;
   
}

/*******************************************************************************
**
** This function requests information from the LMS.
**
** Inputs:  String - Name of the data model defined category or element
**                   (e.g. cmi.core.learner_id)
**
** Return:  String - The value presently assigned to the specified data model
**                   element.
**
*******************************************************************************/
function retrieveDataValue( name )
{
   
      var api = getAPIHandle();

      if ( api == null )
      {
         return "";
      }
      else
      {
         var value = api.GetValue( name );

         var errCode = api.GetLastError();

         if ( errCode != "0" )
         {
            var errCode = retrieveLastErrorCode();

            displayErrorInfo( errCode );
         }
         else
         {
            return value;
         }
      }
   
   return;
}


/*******************************************************************************
**
** This function is used to tell the LMS to assign the value to the named data
** model element.
**
** Inputs:  String - Name of the data model defined category or element value
**
**          String - The value that the named element or category will be
**                   assigned
**
** Return:  String - "true" if successful or
**                   "false" if failed.
**
*******************************************************************************/
function storeDataValue( name, value )
{
  
      var api = getAPIHandle();

      if ( api == null )
      {
         return;
      }
      else
      {
         var result = api.SetValue( name, value );

         if ( result != "true" )
         {
            var errCode = retrieveLastErrorCode();

            displayErrorInfo( errCode );

            // may want to do some error handling
         }
      }
  
   return;
}


/*******************************************************************************
**
** This function requests that the LMS save all data to this point in the session.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function CommitValues(){
	
	var api = getAPIHandle();

    if ( api == null )
    {
        return "";
    }
    else
    {
        return api.Commit("");
    }
}


function doLMSSetValue(completion, lastVisistedPage, pageProgress, Score, progress){

	//calculateelapsedTime();
	
	storeDataValue("cmi.location", lastVisistedPage);
	storeDataValue("cmi.suspend_data", pageProgress);
	//alert("Status :: " + lesson_status.toLowerCase())
	storeDataValue("cmi.completion_status", completion);
	//storeDataValue("cmi.success_status", "passed");
	if(completion == "completed"){
		storeDataValue("cmi.success_status", "passed");
	}
	
	storeDataValue("cmi.score.min", 0);
	storeDataValue("cmi.score.max", 100);
	storeDataValue("cmi.score.raw", Score);
	storeDataValue("cmi.score.scaled", progress); 	
	storeDataValue("cmi.progress_measure", progress);
	
	//storeDataValue("cmi.session_time", elapsedTime);
	storeDataValue( "cmi.exit", "suspend" );
	//alert("In ExitSCO function after set values ");
	CommitValues();
}
function ExitSCO(){
	
	//alert("In ExitSCO function");
	
	calculateelapsedTime();
	
	/*storeDataValue("cmi.location", Lesson_location);
	storeDataValue("cmi.suspend_data", completionArray.join(","));
	//alert("Status :: " + lesson_status.toLowerCase())
	storeDataValue("cmi.completion_status", Lesson_status);
	
	storeDataValue("cmi.score.raw", Score);*/
	
	storeDataValue("cmi.session_time", elapsedTime);
	
	//alert("In ExitSCO function after set values ");
	
	storeDataValue( "cmi.exit", "suspend" );
	
	
	CommitValues();
	terminateCommunication();
	
	
	
	
	
}

/*******************************************************************************
**
** This function is used to tell the LMS to terminate the communication session
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function terminateCommunication()
{
	
	
   var api = getAPIHandle();

   if ( api == null )
   {
      return "false";
   }
   else
   {
     
     // call the Terminate function that should be implemented by
     // the API
	
     var result = api.Terminate("");
     if ( result != "true" )
     {
         var errCode = retrieveLastErrorCode();
         displayErrorInfo( errCode );
          // may want to do some error handling
     }
     else  // terminate was successful
     {
        terminated = "true";
     }
   }
	
}

function calculateelapsedTime()
{
	/*
		Description: This function calculates the time elapsed in a learning unit.
	*/
	
	if ( startTime != 0 )
	{
		var currentTime = new Date().getTime();
        var totalSecondsinau = ( (currentTime - startTime) / 1000 );
		elapsedTime = formatelapsedTime(totalSecondsinau);
	}
	else
	{		
		elapsedTime = "00:00:00";
	}
  
 
}
/***************************************************************************************************************************/


/***************************************************************************************************************************/
function formatelapsedTime(totalSecondsinau)
{
	/*	
		Description: This function converts the given seconds to the format of hh:mm:ss.
	*/

	var remainder = totalSecondsinau % 3600;
	var totalHours = "" + (totalSecondsinau - remainder)/3600;                        
	remainder = remainder % 60;  
	var totalMinutes = "" +  (totalSecondsinau - totalHours*3600 - remainder) /60;    
	var totalSeconds = "" + Math.round(remainder); 
	if(totalSeconds == "60") 
	{
		totalSeconds = "00";
		totalMinutes = "" + (totalMinutes + 1);
	} 
	if (totalHours.length < 2) totalHours = "0" + totalHours;
	if (totalMinutes.length < 2) totalMinutes = "0" + totalMinutes;
	if (totalSeconds.length <2) totalSeconds = "0" + totalSeconds;
	return "PT"+totalHours+"H"+totalMinutes+"M"+totalSeconds+"S";
	//return totalHours + ":" + totalMinutes + ":" + totalSeconds;
   
}


function getTracking(){
	
	/*lesson_location = ""+retrieveDataValue("cmi.location");
	BookMarkList = ""+retrieveDataValue("cmi.suspend_data");
	lesson_status = ""+retrieveDataValue("cmi.completion_status");
	*/
	StudentName = ""+retrieveDataValue("cmi.learner_name");
	StudentID = ""+retrieveDataValue("cmi.learner_id");
	//alert(retrieveDataValue("cmi.location"));
	Lesson_location = ""+retrieveDataValue("cmi.location");
	PageVisitedStatus = ""+retrieveDataValue("cmi.suspend_data");
	Lesson_status = ""+retrieveDataValue("cmi.completion_status");
	//Score = LMSGetValue("cmi.core.score.raw");
	
	if(Lesson_location == "undefined"){
		Lesson_location =""
	}
	if(PageVisitedStatus == "undefined"){
		PageVisitedStatus =""
	}
	var progressObj = new Object();
	if(Lesson_location != ""){
		progressObj.Lesson_location = Lesson_location;
		progressObj.PageVisitedStatus = PageVisitedStatus;
	}else{
		progressObj.Lesson_location = null;
		progressObj.PageVisitedStatus = null;
	}
	//alert("Lesson_location :: " + Lesson_location);
	if(resellerName != ""){
		if(resellerName == 'trial'){
			var file = bridgeURL +'?id=' + StudentID + '&name=' + escape(StudentName) + '&course=' + courseId + '&reseller=' + resellerName +'&client=' + clientId;
		}else{
			var file = bridgeURL +'?id=' + StudentID + '&name=' + escape(StudentName) + '&course=' + courseId + '&reseller=' + resellerName;
		}
		
		$.getJSON(file, function(data) {
				//console.log(data);		
				//alert(data.result.code);
				if(data.result.code == "1"){
					data.result.structure.interfaceText = data.result.interfaceText;
					Navigation.loaStructure(data.result.structure, progressObj);
					
				}else{
					$('#info').html(data.result.message+', please contact <a href="mailto:sales@bigger-brains.com"> sales@bigger-brains.com</a>');
					$('#reseller_popup').show();
				}
				
			});
	}else{
		Navigation.navigation(obj);
	}
		
	

	
}

/*******************************************************************************
**
** This function is used to go to a next SCO
**
*******************************************************************************/

function LaunchNextSCO(){
	//alert("In next sco");
	storeDataValue("adl.nav.request","continue");
}

/*******************************************************************************
**
** This function is used to go to a previous SCO
**
*******************************************************************************/

function LaunchPrevSCO(){
	storeDataValue("adl.nav.request","previous");
}