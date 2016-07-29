#!/usr/bin/env node

import fs from 'fs';
import jiraQuery from 'jira-query';
import colors from 'colors/safe';

console.log('\ncya-git');

function getMessageFromFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function getCodeFromMessage(message) {
  const regex = /(\n)?(CF-\d{5,})/g;
  const matches = regex.exec(message);
  return matches && matches[2];
}

function log(msg) {
  console.log(`\t${msg}`);
}

function bad(msg) {
  log(`${colors.red('✗')} ${msg}`);
}

function good(msg) {
  log(`${colors.green('✓')} ${msg}`);
}

function handleMissingCode() {
  bad('Your commit message is missing the issue key.');
  process.exit(1);
}

function logMessage(message) {
  const parts = message.split(/\n.*?/g);
  const quote = '\n\t> ';
  parts.unshift('');
  parts.pop();
  log('Validating message');
  log(`${parts.join(quote)}\n`);
}

function validateKey(key) {
  return new Promise(resolve => {
    const jql = `key=${key} AND resolution=Unresolved`;
    jiraQuery.jql(jql).then(
      () => resolve(true),
      () => resolve(false))
    .catch(() => {
      resolve(false);
    });
  })
}

const file = process.argv[2];
const message = getMessageFromFile(file);
const key = getCodeFromMessage(message);

logMessage(message);

if (!key) {
  handleMissingCode();
} else {
  good(`${key} looks like a Jira key.`);
  validateKey(key).then(isValid => {
    if (!isValid) {
      bad(`${key} does not appear to be valid.`);
      process.exit(1);
    } else {
      good('It\'s valid.')
      process.exit(0);
    }
  });
}
