const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const distAssetsPath = path.join(distPath, 'assets');
const distStylePath = path.join(distPath, 'style.css');
const distIndexPath = path.join(distPath, 'index.html');

const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

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
  encoding: {
    encoding: 'utf8',
  },
};

const copyAssets = () => {
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
};

const mergeStyles = () => {
  fs.readdir(stylesPath, (_error, files) => {
    const styleWriteStream = fs.createWriteStream(distStylePath);

    files.forEach((file) => {
      const isCSS = path.parse(file).ext === '.css';
      if (isCSS) {
        const styleReadStream = fs.createReadStream(
          path.join(stylesPath, file),
          options.encoding,
        );

        styleReadStream.pipe(styleWriteStream);
      }
    });
  });
};

const buildIndex = () => {
  fs.readFile(templatePath, options.encoding, (_error, data) => {
    let indexHTML = data;

    fs.readdir(componentsPath, options.readdir, (_error, components) => {
      components.forEach((component) => {
        fs.readFile(
          path.join(componentsPath, component.name),
          options.encoding,
          (_error, componentHTML) => {
            const componentName = component.name.split('.')[0];
            indexHTML = indexHTML.replace(
              `{{${componentName}}}`,
              componentHTML,
            );

            const indexWriteStream = fs.createWriteStream(distIndexPath);
            indexWriteStream.write(indexHTML);
          },
        );
      });
    });
  });
};

fs.rm(distPath, options.rm, (_error) => {
  fs.mkdir(distPath, options.mkdir, (_error) => {
    copyAssets();
    mergeStyles();
    buildIndex();
  });
});
