module.exports = {
	name: 'purge',
	description: 'Purges messages!',
	execute(message, args, client) {
    		const amount = args[0]

		if (isNaN(amount)) return message.reply("that doesn't seem to be a valid number.").then(async msg => {
			setTimeout(() => {msg.delete();}, 10000);}); 
            
        if (amount < 2 || amount > 1000) return message.reply('you need to input a number between 2 and 1000.').then(async msg => {
			setTimeout(() => {msg.delete();}, 5000);});

		message.channel.bulkDelete(amount, true);
	},
};