import { success, error, defaults, defaultModules, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

const myStack = new Stack({
  dir1: 'up',
  dir2: 'right',
  firstpos1: 25,
  spacing1: 25,
  push: 'top',
  modal: false,
  overlayClose: false,
});
defaults.mode = 'light';
defaults.delay = 1000;
defaults.stack = myStack;
defaultModules.set(PNotifyMobile, {});

export { success, error };


// error({
//   title: 'Error!',
//   text: 'Loading Error',
// })

// success({
//   title: 'Success!',
//   text: 'Loading Success',
// })