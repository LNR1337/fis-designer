var replace = require('replace-in-file');

// Get current date.
var buildDate = new Date();
const offset = buildDate.getTimezoneOffset();
buildDate = new Date(buildDate.getTime() - offset * 60 * 1000);
var buildVersion = buildDate.toISOString().split('T')[0];

const options = {
  files: 'src/environments/environment.prod.ts',
  from: /version:.*/gm,
  to: `version: '${buildVersion}',`,
  allowEmptyPaths: false,
};

try {
  let changedFiles = replace.sync(options);
  console.log('Build version set: ' + buildVersion);
} catch (error) {
  console.error('Error occurred:', error);
}
