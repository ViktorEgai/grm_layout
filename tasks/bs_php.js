const bs = require('browser-sync');

module.exports = function bs_php() {
	bs.init({
		browser: ['firefox'],
		watch: true,
		proxy: '',
		logLevel: 'info',
		logPrefix: 'BS-PHP:',
		logConnections: true,
		logFileChanges: true,
	})
}