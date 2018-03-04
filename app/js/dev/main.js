const Publisher = require('./Publisher');
const QuoteViewer = require('./QuoteViewer');
const status = require('./utils').status;
const randomHexColor = require('./utils').randomHexColor;
const parseXml = require('./utils').parseXml;
const xmlToJson = require('./utils').xmlToJson;

let clickPublisher = new Publisher();
let quoteViewer = new QuoteViewer('author-name', 'wiki-text', 'wiki-button');

const url = function() {
	let key = Math.floor(Math.random() * 1000000 - 1);
	return (
		'http://cors-proxy.htmldriven.com/?url=https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&callback=?' +
		key
	);
};


const displayMessage = ( data ) =>
	fetch(url())
		.then( status )
		.then( response => response.json())
		.then( data => xmlToJson( parseXml(data.body) ) )
		.then( obj => quoteViewer.displayNewQute(obj.forismatic.quote.quoteAuthor, obj.forismatic.quote.quoteText))

const colorSubscriber = ( function( selector ) {
	const app = document.querySelector(selector);
	return () => (app.style = `background-color:${randomHexColor()}; transition: background-color 1s linear;`);
})('body');

const observsers = [ colorSubscriber, displayMessage ];
observsers.forEach((obs) => clickPublisher.subscribe(obs));
quoteViewer.onClick(() => clickPublisher.deliver());

clickPublisher.deliver();
