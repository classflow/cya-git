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
    fs.symlinkSync(source, destination);
  } catch (e) {
    if (e.code === 'EEXIST') {
      console.log('hook already exists');
    }
  }
}

export default function installHook(dir) {
  console.log('installing cya-git hook...');
  const hooksDir = getHooksDir(dir);

  if (!hooksDir) {
    hooksDirNotFound();
  } else {
    addHook(hooksDir);
  }
}
