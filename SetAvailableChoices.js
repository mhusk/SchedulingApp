// var formApp = FormApp.openById(ScriptProperties.getProperty('formID')); 
// var responseSpreadsheet = SpreadsheetApp.openById(ScriptProperties.getProperty('responseID'));
// var settingsSpreadsheet = SpreadsheetApp.openById(ScriptProperties.getProperty('settingsID'));

function SetAvailableChoices(){
  var item = formApp.getItemById('2129281706').asMultipleChoiceItem();
  var timeSlots = GetAvailableTimeSlots();
  item.setChoiceValues(timeSlots);
}



function GetAvailableTimeSlots(){
  var availableSheet = settingsSpreadsheet.getSheetByName('Available');
  var formattedTimeSlots = [];
  if(availableSheet != 'Sheet'){
    Logger.log('GetAvailableTimeSlots: Sheet Name is incorrect');
  } else{
    var choices = availableSheet.getDataRange().getValues().slice(1);
    for(var i = 0; i < choices.length; i++){
      var timeSlot = FormatTimeSlots(choices[i])
      //Logger.log(timeSlot);
      formattedTimeSlots.push(timeSlot);
    }
  }
  //Logger.log(formattedTimeSlots);
  return formattedTimeSlots;
}

/**
 * This will format the dates for the Google Form
 * @param {Object[]} timeslot will be formatted [month, day of month, time]
 * @returns {string} 
 */
function FormatTimeSlots(timeSlot){
  var month = timeSlot[0];
  var dayOfMonth = timeSlot[1];
  var time = FormatTimeString(String(timeSlot[2]));
  var dateString = month + ' ' + dayOfMonth + ' ' + time;
  return dateString;
}

/**
 * This will convert the time string into 0:00 PM/AM time string
 * @param {string} time format it will come in as Sat Dec 30 16:00:00 GMT-05:32 1899
 */
function FormatTimeString(time){
  var justTime = time.split(' ')[4];
  var hour = parseInt(justTime.split(':')[0]);
  var minute = justTime.split(':')[1];
  if(hour > 12){
    var timeString = (hour - 12) + ":" + minute + ' PM';
    //Logger.log(timeString);
    return timeString;
  } else if(hour == 12){
      var timeString = hour + ":" + minute + ' PM';
    //Logger.log(timeString);
    return timeString;
  }else{
    var timeString = hour + ":" + minute + ' AM';
    //Logger.log(timeString);
    return timeString;
  }
}
