#!/usr/bin/env node

import fs from 'fs';
import jiraQuery from 'jira-query';

console.log('\nRunning cya-git check...');

function getMessageFromFile(file) {
  return fs.readFileSync(file, 'utf8');
}

function getCodeFromMessage(message) {
  const regex = /(\n)?(CF-\d{5,})/g;
  const matches = regex.exec(message);
  return matches && matches[2];
}

function handleMissingCode() {
  console.log('Your commit message is missing the issue key. :(');
  process.exit(1);
}

function validateKey(key) {
  return new Promise(resolve => {
    const jql = `key=${key} AND resolution=Unresolved`;
    jiraQuery.jql(jql).then(
      () => resolve(true),
      () => resolve(false))
    .catch(() => {
      console.log(`Issue ${key} was not found.`);
      resolve(false);
    });
  })
}

const file = process.argv[2];
const message = getMessageFromFile(file);
const key = getCodeFromMessage(message);

if (!key) {
  handleMissingCode();
} else {
  validateKey(key).then(isValid => {
    if (!isValid) {
      console.log(`${key} does not appear to be valid.`);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
}
