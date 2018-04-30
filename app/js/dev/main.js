const Publisher = require('./Publisher');
const QuoteViewer = require('./QuoteViewer');
const status = require('./utils').status;
const randomHexColor = require('./utils').randomHexColor;
const transformToTweet = require('./utils').transformToTweet;

let clickPublisher = new Publisher();
let quoteViewer = new QuoteViewer('author-name', 'wiki-text', 'wiki-button','tweet-button');

const url = function() {
	let key = Math.floor(Math.random() * 1000000 - 1);
	return 'https://cors.now.sh/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?' + key
};

const displayMessageSubscriber = () =>
	fetch(url())
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
