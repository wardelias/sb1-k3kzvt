function doPost(e) {
  try {
    var spreadsheetId = '1Q80FpPSV_aVA3sqfj0MA0sm2Ogk-HQthsYhKO98bjWk';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.email,
      data.phone,
      data.investmentAmount || 'Not provided'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({ 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setStatusCode(500);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("The web app is running!");
}