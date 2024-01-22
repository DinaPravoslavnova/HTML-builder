const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const distAssetsPath = path.join(distPath, 'assets');
const distStylePath = path.join(distPath, 'style.css');

const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');

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
  readStream: {
    encoding: 'utf8',
  },
};

fs.rm(distPath, options.rm, (_error) => {
  fs.mkdir(distPath, options.mkdir, (_error) => {
    fs.readdir(assetsPath, options.readdir, (_error, folders) => {
      folders.forEach((folder) => {
        fs.mkdir(
          path.join(distAssetsPath, folder.name),
          options.mkdir,
          (_error) => {
            fs.readdir(
              path.join(assetsPath, folder.name),
              options.readdir,
              (_error, files) => {
                files.forEach((file) => {
                  fs.copyFile(
                    path.join(assetsPath, folder.name, file.name),
                    path.join(distAssetsPath, folder.name, file.name),
                    (_error) => {},
                  );
                });
              },
            );
          },
        );
      });
    });

    fs.readdir(stylesPath, (_error, files) => {
      const styleWriteStream = fs.createWriteStream(distStylePath);

      files.forEach((file) => {
        const isCSS = path.parse(file).ext === '.css';
        if (isCSS) {
          const styleReadStream = fs.createReadStream(
            path.join(stylesPath, file),
            options.readStream,
          );
          styleReadStream.pipe(styleWriteStream);
        }
      });
    });

  });
});
