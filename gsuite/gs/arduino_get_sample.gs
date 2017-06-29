/*
author: Richard Ciampa
date:   6/5/2015

GET request query:

https://script.google.com/macros/s/<gscript id>/exec?celData=data_here
----------------------------------------------------------------------

GScript, PushingBox and Arduino/ESP8266 Variables in order:

humidityData
celData
fehrData
hicData
hifData
----------------------------------------------------
https://script.google.com/macros/s/AKfycbzpjPiaLOq3Vd-pWlDNweVIOP3nap-C8tGdbZ7Y3peY_ApOJMYP/exec?humidityData=.9&celData=25&fehrData=75&hicData=123&hifData=456
*/


/* Using spreadsheet API */

function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters

  var result = 'Ok'; // assume success

  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    var id = '15d7uYIYGgdzmyBAqrStNJKWiUbzBF_9YEvxJBEak2es'; // Google sheets ID
    var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    //var waktu = new Date();
    rowData[0] = new Date(); // Timestamp in column A
    
    for (var param in e.parameter) {
      Logger.log('In for loop, param='+param);
      var value = stripQuotes(e.parameter[param]);
      //Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'humidityData': //Parameter
          rowData[1] = value; //Value in column B
          break;
        case 'celData':
          rowData[2] = value;
          break;
        case 'fehrData':
          rowData[3] = value;
          break;
        case 'hicData':
          rowData[4] = value;
          break;
        case 'hifData':
          rowData[5] = value;
          break;
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));

    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }

  // Return result of operation
  return ContentService.createTextOutput(result);
}

/**
* Remove leading and trailing single or double quotes
*/
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}
