const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files');
const fileCopyPath = path.join(__dirname, 'files-copy');

const options = {
  rm: {
    recursive: true,
    force: true,
  },
  mkdir: {
    recursive: true,
  },
  readdir: {
    withFileTypes: true,
  },
};

fs.rm(fileCopyPath, options.rm, (_error) => {
  fs.mkdir(fileCopyPath, options.mkdir, (_error) => {
    fs.readdir(filePath, options.readdir, (_error, files) => {
      files.forEach((file) => {
        fs.copyFile(
          path.join(filePath, file.name),
          path.join(fileCopyPath, file.name),
          (_error) => {},
        );
      });
    });
  });
});
