#!/usr/bin/env node

import fs from 'fs';
import jiraQuery from 'jira-query';

console.log('\nRunning cya-git check...\n');

function getMessageFromFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function getCodeFromMessage(message) {
  const regex = /(\n)?(CF-\d{5,})/g;
  const matches = regex.exec(message);
  return matches && matches[2];
}

function handleMissingCode() {
  console.log('Your commit message is missing the issue code.');
  process.exit(1);
}

function checkCode(code) {
  return new Promise(resolve => {
    console.log(`Verifying ${code}...`);
    const jql = `key=${code} AND resolution=Unresolved`;
    jiraQuery.jql(jql).then(
      () => resolve(true),
      () => resolve(false))
    .catch(() => {
      console.log(`Issue ${code} was not found.`);
      resolve(false);
    });
  })
}

const file = process.argv[2];
const message = getMessageFromFile(file);
const code = getCodeFromMessage(message);

if (!code) {
  handleMissingCode();
} else {
  checkCode(code).then(isValid => {
    if (!isValid) {
      console.log(`${code} does not appear to be valid.`);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
}
