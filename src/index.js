#!/usr/bin/env node

import installHook from './installHook'; // @hook

// User will run this file through CLI to initialize a repository.

// Adds commit-msg hook to a project
export function init() {
  console.log('init');
}

function isRunningCLI() {
  return require.main === module;
}

function isInitializing() {
  return isRunningCLI()
    || (process.argv[2] && process.argv[2] === '--i');
}

if (isInitializing()) {
  installHook(process.cwd());
} else {
  console.log('check for code');
}
