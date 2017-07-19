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
https://script.google.com/macros/s/AKfycbxnRZc6DCh8vX1A49ht5UYl6FF1SUV7nKaFn7dAT48r_rsG3IE/exec?id=1234&uvIntensity=50
*/


/* Using spreadsheet API */

function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters

  var result = 'Ok'; // assume success

  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    var id = '1JWqNzMU71Rl2hr-gGs48QXYGxdT4tbd8FEn9X_rCcAM'; // Google sheets ID
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
        case 'id': //Parameter
          rowData[1] = value; //Value in column B
          break;
        case 'uvIntensity':
          rowData[2] = value;
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
