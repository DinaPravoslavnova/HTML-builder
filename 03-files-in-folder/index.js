const fs = require('fs');
const path = require('path');

const stdout = process.stdout;

const secretFolderPath = path.join(__dirname, 'secret-folder');
const options = { withFileTypes: true };

fs.readdir(secretFolderPath, options, (_error, files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const currentPath = path.join(secretFolderPath, file.name);
      fs.stat(currentPath, (_error, stats) => {
        const fileName = path.parse(file.name).name;
        const fileExtension = path.parse(file.name).ext.slice(1);
        const fileSize = stats.size;               
        const fileInfo = `${fileName} - ${fileExtension} - ${fileSize} bytes\n`;
        stdout.write(fileInfo);
      });
    }
  });
});
