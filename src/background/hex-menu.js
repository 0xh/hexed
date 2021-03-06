/**
 * @module hex-menu
 * Module for creating the menus.
 */

import { app, BrowserWindow, Menu } from 'electron';
import * as hexed from '../main.js';

function createTemplate() {
  let command = process.platform == 'darwin' ? 'Command' : 'Ctrl';
  var template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Window',
          accelerator: command + '+N',
          click: function() { hexed.openNewWindow(); }
        },
        {
          label: 'Open...',
          accelerator: command + '+O',
          click: function() { BrowserWindow.getFocusedWindow().hexed.showOpenDialog(); }
        },
        {
          type: 'separator'
        },
        {
          label: 'Close',
          accelerator: command + '+W',
          click: function() { BrowserWindow.getFocusedWindow().hexed.closePane(); }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Jump to position',
          accelerator: command + '+J',
          click: function() { BrowserWindow.getFocusedWindow().hexed.sendMenu('jump-to'); }
        },
        /* Not implemented ... yet. {
          label: 'Run JavaScript',
          accelerator: 'Alt+' + command + '+J',
          click: function() { BrowserWindow.getFocusedWindow().hexed.sendMenu('run-javascript'); }
        },*/
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
      ]
    },
    {
      label: 'Search',
      submenu: [
        {
          label: 'Find...',
          accelerator: command + '+F',
          click: function() { BrowserWindow.getFocusedWindow().hexed.sendMenu('find'); }
        },
        {
          label: 'Strings...',
          click: function() { BrowserWindow.getFocusedWindow().hexed.sendMenu('strings'); }
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'About',
          click: function() { BrowserWindow.getFocusedWindow().hexed.sendMenu('about'); }
        }
      ]
    }
  ];
  // TODO: Only do this when not on OS X and add an approriate Quit option when
  // on OS X
  if (process.platform === 'darwin') {
    // On OS X, we need to insert the app menu as the first menu
    template.unshift({
      'label': 'Hexed',
      'submenu': [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: []},
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });
    // The Window menu is pretty much a macOS-ism, so insert it prior to the
    // last element in the template.
    template.splice(template.length - 1, 0, {
      role: 'window',
      submenu: [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    });
  } else {
    // Place the Exit/Quit menu item as appropriate:
    template[0].submenu.push(
      { type: 'separator' },
      { role: 'quit' }
    );
  }
  return template;
}

function createMenu() {
  return Menu.buildFromTemplate(createTemplate());
}

exports.createTemplate = createTemplate;
exports.createMenu = createMenu;
