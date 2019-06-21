# Shortcut Value Viewer

[![GitHub release](https://img.shields.io/github/release/haykam821/Shortcut-Value-Viewer.svg?style=popout&label=github)](https://github.com/haykam821/Shortcut-Value-Viewer/releases/latest)
[![npm](https://img.shields.io/npm/v/shortcut-value-viewer.svg?style=popout&colorB=red)](https://www.npmjs.com/package/shortcut-value-viewer)
[![Travis (.com)](https://img.shields.io/travis/com/haykam821/Shortcut-Value-Viewer.svg?style=popout)](https://travis-ci.com/haykam821/Shortcut-Value-Viewer)

A RunKit value viewer for Shortcuts.js shortcuts.

## Installation

	npm install shortcut-value-viewer

## Usage

The module exports a single function. Pass a [Shortcuts.js](https://github.com/haykam821/Shortcuts.js) shortcut into the function to assign a value viewer that is viewable on [RunKit](http://npm.runkit.com/shortcut-value-viewer).

```js
const { getShortcutDetails } = require("shortcuts.js");
const shortcut = await getShortcutDetails("ccae9c09c70d4319a553415e692a8420");

const svv = require("shortcut-value-viewer");
console.log(svv(shortcut));
```