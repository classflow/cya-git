// @alias hook
import fs from 'fs';
import path from 'path';

const hooks = '.git/hooks';
const hookName = 'commit-msg';
const customHook = path.join(__dirname, '../lib/commit-msg.js');

function getHooksDir(projectDir) {
  const hooksDir = path.join(projectDir, hooks);
  try {
    const stat = fs.statSync(hooksDir);
    if (stat.isDirectory()) {
      return hooksDir;
    }

  } catch (e) {
    if (e.code === 'ENOENT') {
      return null;
    }
  }
}

function hooksDirNotFound() {
  console.log(`Can't find ${hooks}.  Did you \`git init\` yet?`);
}

function addHook(hooksDir) {
  const source = customHook;
  const destination = path.join(hooksDir, hookName);

  try {
    console.log(`Installing cya-git hook ${hookName}...`);
    fs.symlinkSync(source, destination);
  } catch (e) {
    if (e.code === 'EEXIST') {
      console.log(`${hookName} already exists, nevermind.`);
    }
  }
}

function removeHook(hooksDir) {
  const hook = path.join(hooksDir, hookName);

  try {
    console.log(`Removing cya-git hook ${hookName}...`);
    fs.unlinkSync(hook);
  } catch (e) {
    switch (e.code) {
      case 'ENOENT':
        console.log(`${hookName} does not exist.`);
        break;
      default:
      console.log(`Unable to remove ${hookName}\n${e}`);
    }
  }
}

export function install(dir) {
  const hooksDir = getHooksDir(dir);
  if (!hooksDir) {
    hooksDirNotFound();
  } else {
    addHook(hooksDir);
  }
}

export function remove(dir) {
  const hooksDir = getHooksDir(dir);
  if (hooksDir) {
    removeHook(hooksDir);
  }
}
