const fs = require('fs');
function saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, notiftoggle, orangetoggle, redtoggle, epochOfPause, pauseTime, pauseTimeout) {
    var myOptions = {
    language: hypixelLanguage,
    version: preferredMcVersion,
    orange: notificationorange,
    red: notificationred,
    nToggle: notiftoggle,
    oToggle: orangetoggle,
    rToggle: redtoggle,
    pEpoch: epochOfPause,
    pTime: pauseTime,
    pTimeout: pauseTimeout
      };

var data = JSON.stringify(myOptions);

fs.writeFile(__dirname + '/settings.json', data, function (err) {
  if (err) {
    console.log('There has been an error saving your data.');
    console.log(err.message);
    return;
  }
});
}

function readAndLoadConfigData(){
    var data = fs.readFileSync('./settings.json');
    try {
      savedData = JSON.parse(data);
      var hypixelLanguage = savedData.language,
      preferredMcVersion = savedData.version,
      notificationorange = savedData.orange,
      notificationred = savedData.red,
      notiftoggle = savedData.nToggle,
      orangetoggle = savedData.oToggle,
      redtoggle = savedData.rToggle,
      epochOfPause = savedData.pEpoch,
      pauseTime = savedData.pTime,
      pauseTimeout = savedData.pTimeout;
          return {
        hypixelLanguage,
        preferredMcVersion,
        notificationorange,
        notificationred,
        notiftoggle,
        orangetoggle,
        redtoggle,
        epochOfPause,
        pauseTime,
        pauseTimeout
    };
    }
    catch (err) {
      console.log('There was an error parsing the JSON.')
      console.log(err);
}};

function pauseToHMS(pauseTime, amount, type) {
      var pauseseconds = pauseTime / 1000
			var pureDays = Math.floor((pauseseconds / (3600 * 24)));
			var pauseDays = pureDays > 0 ? pureDays + (pureDays == 1 ? ' day ' : ' days ') : '';
      var hmspause = new Date(pauseseconds * 1000).toISOString().substr(11, 8)
			return `${pauseDays}${hmspause}, or ${amount} ${type}!`;
}

function unitType(unit) {
    if (unit == 'h') {var multiple = 3600000, type = 'hour(s)'
    } else if (unit == 'm') {var multiple = 60000, type = 'minute(s)'
    } else if (unit == 's') {var multiple = 1000, type = 'second(s)'
    } else {var multiple = 1000, type = 'second(s) because you did not specify a valid unit'}
    return {multiple, type};
}

module.exports = { saveData, readAndLoadConfigData, pauseToHMS, unitType };