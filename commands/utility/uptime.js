module.exports = {
	name: 'uptime',
	description: 'Uptime of the bot!',
	execute(message, args, client) {
		    function uptimefunc(uptimeSeconds) {
      let totalSeconds = (client.uptime / 1000);
      var roundedNumber = Math.round(totalSeconds * 10) / 10
			var pureDays = Math.floor(uptimeSeconds / (3600 * 24));
			var uptimeDays = pureDays > 0 ? pureDays + (pureDays == 1 ? ' day ' : ' days ') : ''; //checks if day or days should be used
      var hmsuptime = new Date(totalSeconds * 1000).toISOString().substr(11, 8)
			return `Current uptime is ${uptimeDays}${hmsuptime}, or ${roundedNumber} seconds.`;
			}
      message.reply(uptimefunc())
	},
};