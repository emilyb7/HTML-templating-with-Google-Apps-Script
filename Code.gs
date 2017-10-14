var ss = SpreadsheetApp.getActiveSpreadsheet();
var devs = ss.getSheetByName("developers");

function getApplicants() {
  return devs.getRange(2, 1, devs.getLastRow() - 1)
    .getValues()
    .reduce(function (a, b) { // flatten array
      return a.concat(b[0])
  }, []);
}

function getImage (handle) {
  var img = '';
  var url = 'https://api.github.com/users/' + handle;
  var response = UrlFetchApp.fetch(url).getResponseCode();
  if (response === 200) {
    var data = JSON.parse(UrlFetchApp.fetch(url));
    img = data.avatar_url;
  }
  return img;
}

function getData (name) {
  var allData = devs.getRange(2, 1, devs.getLastRow(), devs.getLastColumn()).getValues();
  var dev = allData.filter(function (row) {
    return row[0] === name;
  })[0];
    
  return {
    name: dev[0],
    github: dev[1],
    role: dev[2],
    language: dev[3],
    img: getImage (dev[1])
  }
}

function doGet() { 
  return HtmlService
  .createTemplateFromFile('template')
  .evaluate(); 
}

