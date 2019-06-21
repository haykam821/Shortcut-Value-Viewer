const { ValueViewerSymbol } = require("@runkit/value-viewer");
const { Shortcut } = require("shortcuts.js");

const React = require("react");
const elem = React.createElement;

const { renderToStaticMarkup } = require("react-dom/server");

const { default: styled, ServerStyleSheet } = require("styled-components");

const PrimaryButton = styled.a`
	font-family: "SF Pro Display", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
	font-size: 16px;
	font-weight: 400;

	background-color: #0169D9;
	color: white;
	text-decoration: none;
	padding: 10px;
	border-radius: 8px;
	display: block;
	text-align: center;
	cursor: pointer;
	user-select: none;

	transition-duration: .2s;
	transition-timing-function: ease-in-out;
	transition-property: transform,-webkit-transform;

	&:hover {
		background-color: rgba(1, 105, 217, 0.9);
	}
	&:active {
		transform: scale(0.95);
		background-color: #015DC0;
	}
`;

const App = styled(class extends React.Component {
	render() {
		const shortcut = this.props.shortcut;

		return elem("div", {
			className: this.props.className,
		}, [
			elem("div", {
				children: [
					elem("img", {
						src: shortcut.icon.downloadURL,
					}),
					elem("div", null, [
						elem("h1", null, shortcut.name),
						elem("h3", null, (this.props.debug && !shortcut.longDescription) ? "(long description)" : shortcut.longDescription),
					]),
				],
			}),
			elem("div", null, [
				elem(PrimaryButton, {
					children: "Import",
					href: `workflow://import-workflow/?name=${encodeURIComponent(shortcut.name)}&url=${encodeURIComponent(encodeURI(shortcut.downloadURL))})`,
					target: "_parent",
				}),
				elem(PrimaryButton, {
					children: "Download",
					href: shortcut.downloadURL.replace("${f}", shortcut.name + ".shortcut"),
					target: "_parent",
				}),
				elem(PrimaryButton, {
					children: "Preview",
					href: "https://preview.scpl.dev/?shortcut=" + encodeURIComponent(shortcut.id),
					target: "_parent",
				}),
			]),
			this.props.debug && elem("pre", {
				children: JSON.stringify(shortcut, null, "\t"),
			}),
		]);
	}
})`
	font-family: "SF Pro Display", "Helvetica Neue", "Helvetica", "Arial", sans-serif;

	img {
		width: 80px;
		height: 80px;
		background-color: #${props => props.shortcut.icon.hexColor};
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.14);
		border-radius: 10px;
	}

	div:first-child {
		display: flex;
		align-items: center;

		div:nth-child(2) {
			display: flex;
			align-items: center;
			flex-grow: 1;
			flex-wrap: wrap;

			& > * {
				margin: 2px 16px;
				width: 100%;
				text-shadow: none;
			}

			h1 {
				font-size: 34px;
				color: black;
				letter-spacing: -0.82px;
			}
			h3 {
				font-size: 17px;
				color: #36393E;
				font-weight: 400;
			}
		}
	}

	div:nth-child(2) {
		display: flex;
		padding: 8px 0px;

		& > * {
			margin: 0px 8px;
			flex-grow: 1;

			&:first-child {
				margin-left: 0;
			}
			&:last-child {
				margin-right: 0;
			}
		}
	}

	pre {
		width: 100%;
		height: 200px;
		overflow: scroll;
	}
`;

/**
 * Renders a value viewer for a shortcut.
 * @param {Shortcut} shortcut The shortcut to render a value viewer of.
 * @param {boolean} debug Whether to enable debug features for the rendered value viewer.
 * @returns {string} The rendered HTML for a shortcut's value viewer.
 */
function render(shortcut, debug) {
	const sheet = new ServerStyleSheet();

	const html = renderToStaticMarkup(sheet.collectStyles(elem(App, {
		debug,
		shortcut,
	})));
	const styleTags = sheet.getStyleTags();

	return html + styleTags;
}

/**
 * Adds a value viewer to a shortcut.
 * @param {Shortcut} shortcut The shortcut to add a value viewer to.
 * @param {boolean} debug Whether to enable debug features for the value viewer.
 * @returns {Shortcut} The shortcut with a value viewer added.
 */
function shortcutValueViewer(shortcut, debug = false) {
	if (!(shortcut instanceof Shortcut)) {
		throw new TypeError("Shortcut must be an instance of Shortcuts.js shortcut.");
	}

	shortcut[ValueViewerSymbol] = {
		HTML: render(shortcut, debug),
		title: "Shortcut",
	};
	return shortcut;
}
module.exports = shortcutValueViewer;