const gulp = require('gulp');
const fs = require('fs');

gulp.task('env', () => {
    const configFiles = [
        './src/components/common/Config.ts'
    ];
    const envInputKey = 'HOST_URL';
    const envReplKey = 'hostUrl:';
    const envRegExp = new RegExp(`${envReplKey}`, 'g');

    configFiles.forEach((configFile) => {
        fs.readFile(configFile, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }

            let textByLine = data.split("\n");

            textByLine.forEach((line, index) => {
                if (line.match(envRegExp)) {
                    textByLine[index] = `  ${envReplKey} \'${process.env[envInputKey]}\',`;
                }
            });

            fs.writeFile(configFile, textByLine.join('\n'), 'utf8', (err) => {
                if (err) {
                    return console.log(err);
                }
            });
        });
    });
});
