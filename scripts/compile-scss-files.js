/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');
const sass = require('node-sass');
const mkdirp = require('mkdirp');
const lineReplace = require('line-replace');
const replace = require('replace-in-file');
const escapeStringRegexp = require('escape-string-regexp');
const getDirName = require('path').dirname;
/* eslint-enable @typescript-eslint/no-var-requires */
const srcDir = path.join('./src/lib/components');
const distDirs = [
    path.join('./dist/esm/components'),
    path.join('./dist/js/components'),
    path.join('./dist/umd/components')
];

const compileAndWriteCss = (file) => {
    const result = sass.renderSync({
                                       file: path.join(srcDir, file),
                                       outputStyle: 'compacted'
                                   });
    distDirs.forEach((distDir) => {
        mkdirp(getDirName(path.join(distDir, file)), function(err) {
            fse.writeFile(path.join(distDir, file).replace('.scss', '.css'), result.css);
        });
    });
};

const replaceScssWithCssInImports = (file) => {
    distDirs.forEach((distDir) => {
        const componentFile = path.join(distDir, file).replace('.styles.scss', '.js');
        const regex = new RegExp(escapeStringRegexp(`${path.basename(file)}`), 'g');
        const options = {
            files: componentFile,
            from: regex,
            to: path.basename(file, '.scss') + '.css',
        };
        replace(options);
    });
};

const compileScssFiles = () => {
    const files = glob.sync('**/*.styles.scss', {
        cwd: srcDir
    });
    files.forEach(file => {
        compileAndWriteCss(file);
        replaceScssWithCssInImports(file);
    });
};

compileScssFiles();
