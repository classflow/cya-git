#!/usr/bin/env node

import fs from 'fs';
import jiraQuery from 'jira-query';
import colors from 'colors/safe';

console.log('\ncya-git');

// https://confluence.atlassian.com/adminjiraserver070/changing-the-project-key-format-779292263.html
const jiraKeyFormat = /([A-Z][A-Z_0-9]+-\d+):/g;

function getMessageFromFile(file) {
  const message = fs.readFileSync(file, 'utf8');
  const ignoredLineRegex = /(\n)?#.*/g;
  return message.replace(ignoredLineRegex, '');
}

function getKeyFromMessage(message) {
  const matches = jiraKeyFormat.exec(message);
  return matches && matches[1];
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
  bad('Your commit message is missing the issue key.\n');
  process.exit(1);
}

function logMessage(message) {
  const parts = message.split(/\n.*?/g);
  const quote = '\n\t> ';
  parts.unshift('');
  parts.pop();
  log(`${colors.grey(parts.join(quote))}\n`);
}

function validateKey(key) {
  return new Promise(resolve => {
    const jql = `key=${key}`;
    jiraQuery.jql(jql).then(
      (issues) => {

        if (issues.length) {
          good(`${key} exists.`);

          const issue = issues[0];
          const {resolution} = issue.fields;

          if (!!resolution) {
            bad(`${key} was already resolved.`);
            resolve(false);
          } else {
            good(`${key} is unresolved.`);
            resolve(true);
          }
        } else {
          bad(`${key} was not found.`);
          resolve(false);
        }
      },
      () => resolve(false)
    )
    .catch(() => {
      resolve(false);
    });
  })
}

function truncate(string, length) {
  if (string.length > length) {
    return string.substr(0, length - 3) + '...';
  } else {
    return string;
  }
}

function showOpenIssues() {
  log('Did you mean to use one of your open issues?');
  return jiraQuery.getMyOpenIssues().then(issues => {
    issues
      .sort((a, b) => {
        return a.key.localeCompare(b.key);
      })
      .map(issue => {
        const summary = truncate(issue.fields.summary, 60);
        log(`${issue.key} - ${summary}`);
      });
    console.log('\n');
  });
}

function handleInvalidKey(key) {
  bad(`${key} does not appear to be a valid key.\n`);
  function exit() {
    process.exit(1);
  }

  showOpenIssues().then(exit, exit).catch(exit);
}

const file = process.argv[2];
const message = getMessageFromFile(file);
const key = getKeyFromMessage(message);

logMessage(message);

if (!key) {
  handleMissingCode();
} else {
  good(`${key} looks like a Jira key.`);

  validateKey(key).then(isValid => {
    if (!isValid) {
      handleInvalidKey(key);
    } else {
      good('This commit message looks good.\n')
      process.exit(0);
    }
  });
}
