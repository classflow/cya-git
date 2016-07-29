#!/usr/bin/env node

console.log('\nrunning commit-msg.js\n');

import fs from 'fs';
import path from 'path';
import jiraQuery from 'jira-query';

function getMessageFromFile(file) {
  // find git root
  // console.log();
  // const gitRoot = path.join(process.cwd(), '.git');
  // const gitRoot = path.join(__dirname, '../../..');
  // return fs.readFileSync(path.join(gitRoot, file), 'utf8');
  return fs.readFileSync(file, 'utf8');
}

function getCodeFromMessage(message) {
  const regex = /(\n)?(CF-\d{5,})/g;
  const matches = regex.exec(message);
  return matches && matches[2];
}

function handleMissingCode() {
  console.log('Your commit message is missing the issue code.');
  console.log('Aborting commit.\n');
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
    console.log(`The issue key is${isValid ? '' : ' not'} valid.`);
    process.exit(isValid ? 0 : 1);
  });
}
