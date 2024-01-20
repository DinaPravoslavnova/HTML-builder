const fs = require('fs');
const path = require('path');

const { stdin, stdout, exit } = process;

const currentPath = path.join(__dirname, 'text.txt');
const options = {
  encoding: 'utf8',
  flags: 'a',
};

const newWriteStream = fs.createWriteStream(currentPath);
newWriteStream.end();

stdout.write('Hello! Please enter some text...\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    exit();
  } else {
    const fileWriteStream = fs.createWriteStream(currentPath, options);
    fileWriteStream.write(data);
    fileWriteStream.end();
  }
});

process.on('SIGINT', exit);

process.on('exit', () => stdout.write('See you again! Goodbye!\n'));
