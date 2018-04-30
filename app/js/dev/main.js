const Publisher = require('./Publisher');
const QuoteViewer = require('./QuoteViewer');
const { status, randomHexColor, transformToTweet, createUrl} = require('./utils');

let clickPublisher = new Publisher();
let quoteViewer = new QuoteViewer('author-name', 'wiki-text', 'wiki-button','tweet-button');

const displayMessageSubscriber = () =>
	fetch(createUrl())
		.then(status)
		.then((response) => response.json())
		.then((data) => {
			quoteViewer.displayNewQoute(data.quoteAuthor, data.quoteText)
			quoteViewer.setTweet(transformToTweet(data.quoteText))
		})
		
const changeColorSubscriber = (function(selector) {
	const selected = document.querySelectorAll(selector);
	let style;
	return () => {
		style = `background-color:${randomHexColor()}; transition: background-color 1s linear;`;
		selected.forEach((item) => (item.style = style));
	};
})('.js-colored');

const observsers = [ changeColorSubscriber, displayMessageSubscriber ];

observsers.forEach((obs) => clickPublisher.subscribe(obs));
quoteViewer.onClick(() => clickPublisher.deliver());

clickPublisher.deliver();
