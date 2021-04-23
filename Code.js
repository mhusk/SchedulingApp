var form = FormApp.getActiveForm();
var sheet = SpreadsheetApp.openById('1YJYilISU7lLQ4p9_KZMZApqVv3OnffrN73ahe6l9XQ4');
var sheetID = '1YJYilISU7lLQ4p9_KZMZApqVv3OnffrN73ahe6l9XQ4';
var calendarID = 'ltggfh0v89ln3l0i1dnr96v8ro@group.calendar.google.com'
var calendar = CalendarApp.getCalendarById(calendarID);


function myFunction() {
  //Logger.log(calendar.createEvent('Test Event', new Date(2021,3,23,15,00),new Date(2021,3,23,16,00)).getId())
  //Logger.log(sheet.getRange('A1').getValue());
  //ScriptProperties.setProperty('sheetID', sheetID);
  //Logger.log(ScriptProperties.getProperties()['sheetID']);
  ScriptProperties.setProperty("calendarID", calendarID);
}

function ViewScriptProperties(){
  Logger.log(ScriptProperties.getProperties());
}
