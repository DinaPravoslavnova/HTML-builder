const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

const options = { encoding: 'utf8' };

const bundleWriteStream = fs.createWriteStream(bundlePath);

fs.readdir(stylesPath, (_error, files) => {
  files.forEach((file) => {
    const isCSS = path.parse(file).ext === '.css';
    if (isCSS) {
      const styleReadStream = fs.createReadStream(
        path.join(stylesPath, file),
        options,
      );
      styleReadStream.pipe(bundleWriteStream);
    }
  });
});
