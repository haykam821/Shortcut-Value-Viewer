const { ValueViewerSymbol } = require("@runkit/value-viewer");
const { Shortcut } = require("shortcuts.js");

const React = require("react");
const elem = React.createElement;

const { renderToStaticMarkup } = require("react-dom/server");

class App extends React.Component {
	render() {
		return elem(React.Fragment, null, [
			elem("p", null, "TODO"),
		]);
	}
}

function shortcutValueViewer(shortcut) {
	if (!shortcut instanceof Shortcut) {
		throw new TypeError("Shortcut must be an instance of Shortcuts.js shortcut.");
	}

	shortcut[ValueViewerSymbol] = {
		title: "Shortcut",
		HTML: renderToStaticMarkup(elem(App, {
			shortcut,
		})),
	};
	return shortcut;
}
module.exports = shortcutValueViewer;
