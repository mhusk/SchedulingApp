

var formApp = FormApp.openById(ScriptProperties.getProperty('formID')); 
var responseSpreadsheet = SpreadsheetApp.openById(ScriptProperties.getProperty('responseID'));
var settingsSpreadsheet = SpreadsheetApp.openById(ScriptProperties.getProperty('settingsID'));

function GetItemIDs(){
  var allItems = formApp.getItems();
  for (var i = 0; i < allItems.length; i++){
    var title = allItems[i].getTitle();
    var id = allItems[i].getId().toString();
    //Logger.log([title,id,i]);
  }
  var choices = allItems[6].asMultipleChoiceItem().getChoices();
  //Logger.log(choices[0]);
  //formApp.getItemById
  var item = formApp.getItemById('2129281706').asMultipleChoiceItem();
  item.setChoices([
    item.createChoice('April 27 3:00 PM'),
    item.createChoice('April 25 10:00 AM'),
    item.createChoice('April 26 1:00 PM')
  ]);
}

function SetScriptProperties(){
  Logger.log(ScriptProperties.getProperties());
}

function Test(){
  var formID = ScriptProperties.getProperty('formID');
  Logger.log(formID);
}



function ConnectSheet(){

}

function GetUserEmail(){
  var ui = SpreadsheetApp.getUi();
  var prompt = ui.prompt("Please enter the email you would like the Excel Sent to")
  var userInput = prompt.getResponseText();
  var buttonPress = prompt.getSelectedButton();
  
  if(buttonPress === ui.Button.CLOSE){
    ui.alert("You did not enter an email.");
    return buttonPress;
  }

  return userInput;
}

function myFunction() {
  //Logger.log(calendar.createEvent('Test Event', new Date(2021,3,23,15,00),new Date(2021,3,23,16,00)).getId())
  //Logger.log(sheet.getRange('A1').getValue());
  //ScriptProperties.setProperty('sheetID', sheetID);
  //Logger.log(ScriptProperties.getProperties()['sheetID']);
  //ScriptProperties.setProperty("calendarID", calendarID);
}

function ViewScriptProperties(){
  // //Logger.log(ScriptProperties.getProperties());
  // var testRetrievel = ScriptProperties.getProperty('test');
  // //Logger.log(testRetrievel)
  // var allProperties = ScriptProperties.getProperties();
  // //Logger.log(allProperties);
  // for (const property in allProperties){
  //   //console.log(property)
  //   Logger.log(ScriptProperties.getProperty(property));
  // }

  ScriptProperties.deleteAllProperties()
}
