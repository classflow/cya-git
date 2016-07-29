#!/usr/bin/env node

import {install, remove} from './hook'; // @hook

const CONST = {
  INSTALL: '--i',
  INSTALL2: '-i',
  REMOVE: '--r',
  REMOVE2: '-r',
};

const flag = process.argv[2];

switch (flag) {
  case CONST.REMOVE:
  case CONST.REMOVE2:
    remove(process.cwd());
    break;
  case CONST.INSTALL:
  case CONST.INSTALL2:
  default:
    install(process.cwd());
}
