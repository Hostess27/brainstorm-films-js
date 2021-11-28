import { success, error, defaults, defaultModules, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/Angeler.css';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
// import * as PNotifyAnimate from '@pnotify/animate';
import 'animate.css';

const myStack = new Stack({
  animation: 'slide',
  dir1: 'up',
  dir2: 'right',
  // notify position
  firstpos1: document.documentElement.clientHeight / 2,
  firstpos2: document.documentElement.clientWidth / 2 - 190,

  spacing1: 25,
  push: 'top',
  modal: false,
  overlayClose: false,
});
defaults.mode = 'light';
defaults.delay = 2000;
defaults.stack = myStack;
defaultModules.set(PNotifyMobile, {});
export { success, error };
defaults.styling = 'angeler';
defaults.width = '460px';
defaults.closerHover = false;
