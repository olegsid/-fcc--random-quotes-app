const Publisher = require('./Publisher');
const QuoteViewer = require('./QuoteViewer');
const status = require('./utils').status;
const randomHexColor = require('./utils').randomHexColor

let clickPublisher = new Publisher();
let quoteViewer = new QuoteViewer('author-name', 'wiki-text', 'wiki-button');

const url = function(){
	let key = Math.floor( Math.random()*1000000-1 );
	return 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?&key='+key;
}

const displayMessage = (data) =>
	fetch(url())
		.then(status)
		.then((response) => response.json())
		.then((jsonText) => quoteViewer.displayNewQute(jsonText.quoteAuthor, jsonText.quoteText));

const colorSubscriber = (function(selector) {
	const app = document.querySelector(selector);
	return () => app.style=`background-color:${randomHexColor()}; transition: background-color 1s linear;`
})('body')

const observsers = [colorSubscriber, displayMessage];
observsers.forEach((obs) => clickPublisher.subscribe(obs));
quoteViewer.onClick(() => clickPublisher.deliver());

clickPublisher.deliver();
