function NewSubmissionTrigger(){
  ScriptApp.newTrigger('OnFormSubmission')
    .forSpreadsheet(responseSpreadsheet)
    .onFormSubmit()
    .create();
}

function OnFormSubmission(){
  var newSubmission = GetLatestSubmission();
  //RemoveDateSelection(newSubmission); !!! DO NOT DELETE !!! UNCOMMENT WHEN DONE SCHEDULING THE SUBMISSION
  SetAvailableChoices();
}

function GetLatestSubmission(){
  var lastRow = parseInt(responseSpreadsheet.getLastRow());
  var numCols = responseSpreadsheet.getLastColumn();
  var row = responseSpreadsheet.getSheetByName('SchedulingApp').getRange(lastRow, 1,1,numCols).getValues()[0];
  return row
  

}

/**
 * Will remove the date that the user just selected
 * @param {Object[]} latestSubmission this is the latest user submission
 */
function RemoveDateSelection(date){
  var date = newSubmission[4].toString();
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