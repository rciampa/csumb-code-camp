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
https://script.google.com/macros/s/AKfycbytrw9yPMksyHvNX75IcD2RGVsGsVUN4sSpFP9B2LYWYXpLuAU/exec?id=1234&flow=50&moisture=300
*/


/* Using spreadsheet API */

function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters

  var result = 'Ok'; // assume success

  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    var id = '1_kuAP2bzyw1zizVpYS4za_FO9UepSBRAr2Q-09bF2iM'; // Google sheets ID
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
        case 'flow':
          rowData[2] = value;
          break;
        case 'moisture':
          rowData[3] = value;
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
