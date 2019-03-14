const { ValueViewerSymbol } = require("@runkit/value-viewer");
const { Shortcut } = require("shortcuts.js");

function buildPreview(shortcut) {
	return `<p>TODO</p>`;
}

function shortcutValueViewer(shortcut) {
	if (!shortcut instanceof Shortcut) {
		throw new TypeError("Shortcut must be an instance of Shortcuts.js shortcut.");
	}

	shortcut[ValueViewerSymbol] = {
		name: "Shortcut",
		html: buildPreview(shortcut),
	};
	return shortcut;
}
module.exports = shortcutValueViewer;
