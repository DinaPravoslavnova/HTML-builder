const fs = require('fs');
const path = require('path');

const stdout = process.stdout;

const secretFolderPath = path.join(__dirname, 'secret-folder');
const options = { withFileTypes: true };

fs.readdir(secretFolderPath, options, (_, files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const currentPath = path.join(secretFolderPath, file.name);
      fs.stat(currentPath, (_, stats) => {
        const [fileName, fileExtension] = file.name.split('.');
        const fileInfo = `${fileName} - ${fileExtension} - ${stats.size} bytes\n`;
        stdout.write(fileInfo);
      });
    }
  });
});
