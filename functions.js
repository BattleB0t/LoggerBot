const fs = require('fs');
function saveData(hypixelLanguage, preferredMcVersion, notificationorange, notificationred, loginTimes, whitelistedGames, blacklistedGames) {
    var myOptions = {
    language: hypixelLanguage,
    version: preferredMcVersion,
    orange: notificationorange,
    red: notificationred,
    lTime: loginTimes,
    wGames: whitelistedGames,
    bGames: blacklistedGames
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
      loginTimes = savedData.lTime,
      whitelistedGames = savedData.wGames,
      blacklistedGames = savedData.bGames;
          return {
        hypixelLanguage,
        preferredMcVersion,
        notificationorange,
        notificationred,
        loginTimes,
        whitelistedGames,
        blacklistedGames
    };
    }
    catch (err) {
      console.log('There was an error parsing the JSON.')
      console.log(err);
}};

function saveConstants(language, gametypes) {
    var constants = {
    languages: language,
    gametypes: gametypes
      };

var data = JSON.stringify(constants);

fs.writeFile(__dirname + '/constants.json', data, function (err) {
  if (err) {
    console.log('There has been an error saving your data.');
    console.log(err.message);
    return;
  }
});
}

function readConstants(){
    var data = fs.readFileSync('./constants.json');
    try {
      savedData = JSON.parse(data);
      var languages = savedData.languages,
      gametypes = savedData.gametypes;
          return {
        languages,
        gametypes
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

function gameAlreadyAdded(whitelistedGames, blacklistedGames) { //checks if whitelist and blacklist have the same values
  var combinedArrays = whitelistedGames.concat(blacklistedGames);

  return (combinedArrays.length === new Set(combinedArrays).size)

}

module.exports = { saveData, readAndLoadConfigData, saveConstants, readConstants, pauseToHMS, unitType, gameAlreadyAdded };