function doGet(e) {
    return HtmlService.createTemplateFromFile('Index')
                      .evaluate()
                      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
                      .setTitle('Warcraft Chronicles DaVinci DataBoost');
}

function getData(sheetName) {
    var spreadsheetId = '1-PLRjTc3Sbzunb4wEhH72nTQp0Lm59pdg5aX4IrAsms';
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
        throw new Error('Sheet not found: ' + sheetName);
    }

    var data = sheet.getDataRange().getValues();
    return data.slice(1).map(function(row) {
        return {
            number: row[0],
            link: row[2],
            checkbox: row[3],
            emotionStreamer: row[4],
            clipTitle: row[5],
            time: row[9],
            memeFx: row[10]
        };
    });
}

function updateCheckboxAllSheets(rowIndex, isChecked) {
    var spreadsheetId = '1-PLRjTc3Sbzunb4wEhH72nTQp0Lm59pdg5aX4IrAsms';
    var sheetNames = ['EN COURS', 'A FAIRE 1', 'A FAIRE 2', 'RESERVE', 'MASTER'];
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  
    sheetNames.forEach(function(sheetName) {
        var sheet = spreadsheet.getSheetByName(sheetName);
        if (sheet) {
            sheet.getRange(rowIndex + 2, 4).setValue(isChecked); // Assuming checkbox is in column D (index 4)
        }
    });
  
    return true;
}