
// depends

const fs = require('fs-extra');
const path = require('path');
const util = require('util');

// static
const LOGS_FOLDER = path.join(BASE_DIR, 'storage', 'logs');
const COMBINED_FILENAME = 'combined.log';
const DEVELOPMENT = process.env.DEVELOPMENT === 'true';

// init

fs.ensureDirSync(LOGS_FOLDER);

const logger = Object.create(console);
const combinedLogsFile = createWriteStream(COMBINED_FILENAME);

logger.console = function() {
	return console.log.apply(console, [
		timestamp(),
		...arguments
	]);
};
logger.log = logThenWriteToFile('log', DEVELOPMENT);
logger.info = logThenWriteToFile('info', DEVELOPMENT);
logger.warn = logThenWriteToFile('warn', DEVELOPMENT);
logger.error = logThenWriteToFile('error', true);
logger.debug = logThenWriteToFile('debug', DEVELOPMENT);

// impl

if(!DEVELOPMENT) {
	logger.debug = doNothing;
}

process.stderr.write = logThenWriteToFile('strerr', true);

/**
 * @TODO log each day to different file
 */
function logThenWriteToFile(consoleKey, trace) {

	const logsFile = createWriteStream(consoleKey + '.log');
	const combinedPrefix = '[' + consoleKey.toUpperCase() + ']';

	log('created log stream.');

	return log;

	function log() {
		const args = [
			// { 'colors': true },
			timestamp(),
			combinedPrefix,
			...arguments
		];

		if(trace) {
			try {
				throw Error('trace');
			}
			catch({ stack }) {
				try {
					let trace = stack.split('\n')[2].trim().slice(2);
					if(!DEVELOPMENT) {
						trace = trace.replace(BASE_DIR, '');
					}
					args.push('\x1b[36m' + '@' + trace + '\x1b[0m');
				}
				catch(err) {
					// noop
				}
			}
		}

		(console[consoleKey] || console.log).apply(console, args);

		const str = util.format.apply(util, args).replace(
			// string ansi colors and jumps
			/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
			''
		) + '\n';
		try {
			logsFile.write(str);
			combinedLogsFile.write(str);
		}
		catch(err) {
			console.error('FATAL ERROR:', err);
		}
	}
}


// export

module.exports = logger;

// misc

function doNothing() {
	// noop
}

function timestamp() {
	return '[' + new Date().toISOString().slice(0, -1).replace('T', ' ') + ']'
}

function createWriteStream(filename) {
	return fs.createWriteStream(path.join(LOGS_FOLDER, filename), {
		'flags': 'a' // add 's' for synchronous
	});
}