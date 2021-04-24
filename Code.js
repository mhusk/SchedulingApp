var formApp = FormApp.openById('1JgSfvslqmpa8SLP25ny2PlwNbwMplRV5xJTUI6XFoag'); 
var responseSpreadsheet = SpreadsheetApp.openById('15002B7xr2Ui-PnteCws6bXt2RKjfLhcxxHW-dEj-yxU');
var settingsSpreadsheet = SpreadsheetApp.openById('1YJYilISU7lLQ4p9_KZMZApqVv3OnffrN73ahe6l9XQ4');

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
    item.createChoice('April 24 3:00 PM'),
    item.createChoice('April 25 10:00 AM'),
    item.createChoice('April 26 1:00 PM')
  ]);
}












var form = FormApp.getActiveForm();
// var sheet = SpreadsheetApp.openById('1YJYilISU7lLQ4p9_KZMZApqVv3OnffrN73ahe6l9XQ4');
// var sheetID = '1YJYilISU7lLQ4p9_KZMZApqVv3OnffrN73ahe6l9XQ4';
// var calendarID = 'ltggfh0v89ln3l0i1dnr96v8ro@group.calendar.google.com'
// var calendar = CalendarApp.getCalendarById(calendarID);


function SetAppProperites(){
  ScriptProperties.setProperty('ResponseSheet',{type: 'Sheet', id: '1YJYilISU7lLQ4p9_KZMZApqVv3OnffrN73ahe6l9XQ4'});
  ScriptProperties.setProperty('SharedCalendar', {type: 'Calendar', id: 'ltggfh0v89ln3l0i1dnr96v8ro@group.calendar.google.com'})
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
  var testObject = {
    type: 'graph',
    id: 'ltggfh0v89ln3l0i1dnr96v8ro@group.calendar.google.com',
    sheet: 'Test'
  }
  ScriptProperties.setProperty('test',testObject);
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
