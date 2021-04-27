function NewSubmissionTrigger(){
  ScriptApp.newTrigger('OnFormSubmission')
    .forSpreadsheet(responseSpreadsheet)
    .onFormSubmit()
    .create();
}

function OnFormSubmission(){
  var newSubmission = GetLatestSubmission();
  var eventID = CreateCalendarEvent(newSubmission);
  Logger.log(newSubmission);
  RemoveDateSelection(newSubmission); //!!! DO NOT DELETE !!! UNCOMMENT WHEN DONE SCHEDULING THE SUBMISSION
  SetAvailableChoices(); //!!! DO NOT DELETE !!! UNCOMMENT WHEN DONE SCHEDULING THE SUBMISSION
}

function GetLatestSubmission(){
  var lastRow = parseInt(responseSpreadsheet.getLastRow());
  var numCols = responseSpreadsheet.getLastColumn();
  var row = responseSpreadsheet.getSheetByName('SchedulingApp').getRange(lastRow, 1,1,numCols).getValues()[0];
  return row
}

/**
 * This will create a calendar event based on the user's submission and return the events ID
 * @param {Object[]} submission the latest form submission.
 * @returns {string} the event ID
 */
function CreateCalendarEvent(submission){
  var type = submission[1];
  var name = submission[2];
  var phoneNumber = submission[3];
  var date = String(submission[4]);
  var times = FormatDate_Calendar(date);
  var startTime = times[0];
  var endTime = times[1];
  var eventID = calendar.createEvent(type, startTime, endTime).getId();
  return eventID
}

/**
 * Will format the data in such a way that it will be used to create a calendar app
 * @param {string} date
 * @returns {Object []}
 * Example Output:
 * July 20 2021 20:00:00 EST
 */
function FormatDate_Calendar(date){
  var splitDate = date.split(' ');
  var month = splitDate[0];
  var day = splitDate[1];
  var splitTime = splitDate[2].split(':');
  var hour = splitTime[0];
  var minute = splitTime[1];
  var amPM = splitDate[3];
  var timeZone = 'EST';
  var year = String(new Date().getFullYear());

  if(amPM == 'PM' && hour != 12){
    hour = parseInt(hour) + 12;
  }

  var start = month + ' ' + day+', ' + year + ' ' +  (hour-1) + ':' + minute + ':00' + ' ' + timeZone;

  var endHour = String(parseInt(hour) + 1);
  var end = month + ' ' + day+', ' + year + ' ' +  (endHour-1) + ':' + minute + ':00' + ' ' + timeZone;

  var startTime = new Date(String(start));
  var endTime = new Date(String(end));

  return [startTime, endTime]
}


// function myFunction() {
//   //Logger.log(calendar.createEvent('Test Event', new Date(2021,3,23,15,00),new Date(2021,3,23,16,00)).getId())
//   //Logger.log(sheet.getRange('A1').getValue());
//   //ScriptProperties.setProperty('sheetID', sheetID);
//   //Logger.log(ScriptProperties.getProperties()['sheetID']);
//   //ScriptProperties.setProperty("calendarID", calendarID);

/**
 * Will remove the date that the user just selected
 * @param {Object[]} latestSubmission this is the latest user submission
 */
function RemoveDateSelection(latestSubmission){
  var date = latestSubmission[4].toString();
  var timeSlots = GetAvailableTimeSlots();
  var index = timeSlots.indexOf(date) + 2;
  settingsSpreadsheet.getSheetByName('Available').deleteRow(index);
}



//Probs don't need the code below here

/**
 * This will iterate on a script property
 * @param {string} key the key of the script property you want to access
 */
function IterateScriptProperty(key){
  var property = ScriptProperties.getProperty(key);
  if(property == null){
    Logger.log('IterateScriptProperty: the key you entered does not exist');
  } else{
    var value = parseInt(property) + 1;
    ScriptProperties.setProperty(key, value);
  } 
}

function CreateScriptProperty(){
  ScriptProperties.setProperty('lastSubmissionRow', 2);
}