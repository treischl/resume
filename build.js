const fs = require('fs');
const path = require('path');

const readSection = (section) =>
  JSON.parse(fs.readFileSync(`./sections/${section}.json`, 'utf8'));
const readPrivateSection = (section) =>
  JSON.parse(fs.readFileSync(`./private/${section}.json`, 'utf8'));

const getAllSections = () =>
  fs
    .readdirSync('./sections')
    .filter((filename) => filename.endsWith('.json'))
    .map((filename) => filename.replace(/\.json$/, ''));

function ensureArray(arg, defaultValue = []) {
  return arg instanceof Array
    ? arg
    : typeof arg === 'string'
    ? [arg]
    : defaultValue;
}

function build({ include, exclude, includePrivate }) {
  const resume = {};

  include = ensureArray(include, getAllSections());

  ensureArray(exclude).forEach((section) => {
    if (include.includes(section)) {
      const index = include.indexOf(section);
      include.splice(index, 1);
    }
  });

  include.forEach((section) => {
    Object.assign(resume, readSection(section));
  });

  ensureArray(includePrivate).forEach((section) => {
    const privateJson = readPrivateSection(section);
    if (!resume[section]) {
      resume[section] = {};
    }
    Object.assign(resume[section], privateJson[section]);
  });

  if (Object.keys(resume).includes('$schema')) {
    delete resume.$schema;
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'resume.json'),
    JSON.stringify(resume, null, 2),
  );
}

module.exports = build;
