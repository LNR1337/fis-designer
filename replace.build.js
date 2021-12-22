const replace = require('replace-in-file');

// Get current date.
let buildDate = new Date();
const offset = buildDate.getTimezoneOffset();
buildDate = new Date(buildDate.getTime() - offset * 60 * 1000);
const buildVersion = buildDate.toISOString().split('T')[0];

const options = {
  files: 'src/environments/environment.prod.ts',
  from: /version:.*/gm,
  to: `version: '${buildVersion}',`,
  allowEmptyPaths: false,
};

try {
  replace.sync(options);
  console.log('Build version set: ' + buildVersion);
} catch (error) {
  console.error('Error occurred:', error);
}
