const fs = require('fs');
const path = require('path');

const stdout = process.stdout;

const textFile = 'text.txt';
const currentPath = path.join(__dirname, textFile);
const options = { encoding: 'utf8' };
const fileReaderStream = fs.createReadStream(currentPath, options);

fileReaderStream.pipe(stdout);
