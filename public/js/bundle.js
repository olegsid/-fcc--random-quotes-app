(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Publisher = function () {
	function Publisher() {
		_classCallCheck(this, Publisher);

		this.subscribers = [];
	}

	_createClass(Publisher, [{
		key: "deliver",
		value: function deliver(data) {
			this.subscribers.forEach(function (fn) {
				return fn(data);
			});
			return this;
		}
	}, {
		key: "subscribe",
		value: function subscribe(observer) {
			this.subscribers.push(observer);
		}
	}]);

	return Publisher;
}();

module.exports = Publisher;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuoteViewer = function () {
	function QuoteViewer(authorEl, qouteEl, nextQouteBtnEl, tweetBtnEl) {
		_classCallCheck(this, QuoteViewer);

		this.authorEl = document.getElementsByClassName(authorEl)[0];
		this.qouteEl = document.getElementsByClassName(qouteEl)[0];
		this.nextQouteBtnEl = document.getElementsByClassName(nextQouteBtnEl)[0];
		this.tweetBtnEl = document.getElementsByClassName(tweetBtnEl)[0];
	}

	_createClass(QuoteViewer, [{
		key: "displayNewQoute",
		value: function displayNewQoute(authorName, text) {
			this.authorEl.innerHTML = authorName;
			this.qouteEl.innerHTML = text;
		}
	}, {
		key: "setTweet",
		value: function setTweet(link) {
			this.tweetBtnEl.setAttribute('href', link);
		}
	}, {
		key: "onClick",
		value: function onClick(fn) {
			this.nextQouteBtnEl.addEventListener("click", fn);
		}
	}]);

	return QuoteViewer;
}();

module.exports = QuoteViewer;

},{}],3:[function(require,module,exports){
'use strict';

var Publisher = require('./Publisher');
var QuoteViewer = require('./QuoteViewer');

var _require = require('./utils'),
    status = _require.status,
    randomHexColor = _require.randomHexColor,
    transformToTweet = _require.transformToTweet,
    createUrl = _require.createUrl;

var clickPublisher = new Publisher();
var quoteViewer = new QuoteViewer('author-name', 'wiki-text', 'wiki-button', 'tweet-button');

var displayMessageSubscriber = function displayMessageSubscriber() {
	return fetch(createUrl()).then(status).then(function (response) {
		return response.json();
	}).then(function (data) {
		quoteViewer.displayNewQoute(data.quoteAuthor, data.quoteText);
		quoteViewer.setTweet(transformToTweet(data.quoteText));
	});
};

var changeColorSubscriber = function (selector) {
	var selected = document.querySelectorAll(selector);
	var style = void 0;
	return function () {
		style = 'background-color:' + randomHexColor() + '; transition: background-color 1s linear;';
		selected.forEach(function (item) {
			return item.style = style;
		});
	};
}('.js-colored');

var observsers = [changeColorSubscriber, displayMessageSubscriber];

observsers.forEach(function (obs) {
	return clickPublisher.subscribe(obs);
});
quoteViewer.onClick(function () {
	return clickPublisher.deliver();
});

clickPublisher.deliver();

},{"./Publisher":1,"./QuoteViewer":2,"./utils":4}],4:[function(require,module,exports){
"use strict";

function status(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function randomHexColor() {
	return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function transformToTweet(tweet) {
	var endpoint = 'https://twitter.com/intent/tweet?text=';
	var endocodedTweet = encodeURIComponent(tweet);
	return "" + endpoint + endocodedTweet;
}

function createUrl() {
	var key = Math.floor(Math.random() * 1000000 - 1);
	return "https://cors.now.sh/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?" + key;
};

module.exports = { status: status, randomHexColor: randomHexColor, transformToTweet: transformToTweet, createUrl: createUrl };

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1B1Ymxpc2hlci5qcyIsImFwcC9qcy9kZXYvUXVvdGVWaWV3ZXIuanMiLCJhcHAvanMvZGV2L21haW4uanMiLCJhcHAvanMvZGV2L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sUztBQUNMLHNCQUFjO0FBQUE7O0FBQ2IsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7MEJBRU8sSSxFQUFNO0FBQ2IsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFdBQVEsR0FBRyxJQUFILENBQVI7QUFBQSxJQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7NEJBRVMsUSxFQUFVO0FBQ25CLFFBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixRQUF0QjtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsU0FBakI7Ozs7Ozs7OztJQ2ZNLFc7QUFDTCxzQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLGNBQS9CLEVBQStDLFVBQS9DLEVBQTJEO0FBQUE7O0FBQzFELE9BQUssUUFBTCxHQUFnQixTQUFTLHNCQUFULENBQWdDLFFBQWhDLEVBQTBDLENBQTFDLENBQWhCO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsRUFBeUMsQ0FBekMsQ0FBaEI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF0QjtBQUNBLE9BQUssVUFBTCxHQUFrQixTQUFTLHNCQUFULENBQWdDLFVBQWhDLEVBQTRDLENBQTVDLENBQWxCO0FBQ0E7Ozs7a0NBQ2UsVSxFQUFZLEksRUFBTTtBQUNqQyxRQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLFVBQTFCO0FBQ0EsUUFBSyxPQUFMLENBQWEsU0FBYixHQUF5QixJQUF6QjtBQUNBOzs7MkJB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QixFQUE0QyxvQkFBNUMsRUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImNsYXNzIFB1Ymxpc2hlciB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnN1YnNjcmliZXJzID0gW107XHJcblx0fVxyXG5cclxuXHRkZWxpdmVyKGRhdGEpIHtcclxuXHRcdHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoZm4pID0+IGZuKGRhdGEpKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0c3Vic2NyaWJlKG9ic2VydmVyKSB7XHJcblx0XHR0aGlzLnN1YnNjcmliZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaXNoZXIiLCJjbGFzcyBRdW90ZVZpZXdlciB7XHJcblx0Y29uc3RydWN0b3IoYXV0aG9yRWwsIHFvdXRlRWwsIG5leHRRb3V0ZUJ0bkVsLCB0d2VldEJ0bkVsKSB7XHJcblx0XHR0aGlzLmF1dGhvckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShhdXRob3JFbClbMF07XHJcblx0XHR0aGlzLnFvdXRlRWwgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShxb3V0ZUVsKVswXTsgXHJcblx0XHR0aGlzLm5leHRRb3V0ZUJ0bkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuZXh0UW91dGVCdG5FbClbMF07XHJcblx0XHR0aGlzLnR3ZWV0QnRuRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHR3ZWV0QnRuRWwpWzBdO1xyXG5cdH1cclxuXHRkaXNwbGF5TmV3UW91dGUoYXV0aG9yTmFtZSwgdGV4dCkge1xyXG5cdFx0dGhpcy5hdXRob3JFbC5pbm5lckhUTUwgPSBhdXRob3JOYW1lO1xyXG5cdFx0dGhpcy5xb3V0ZUVsLmlubmVySFRNTCA9IHRleHQ7XHJcblx0fVxyXG5cclxuXHRzZXRUd2VldChsaW5rKXtcclxuXHRcdHRoaXMudHdlZXRCdG5FbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBsaW5rKVxyXG5cdH1cclxuXHJcblx0b25DbGljayhmbikge1xyXG5cdFx0dGhpcy5uZXh0UW91dGVCdG5FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm4pO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBRdW90ZVZpZXdlciIsImNvbnN0IFB1Ymxpc2hlciA9IHJlcXVpcmUoJy4vUHVibGlzaGVyJyk7XHJcbmNvbnN0IFF1b3RlVmlld2VyID0gcmVxdWlyZSgnLi9RdW90ZVZpZXdlcicpO1xyXG5jb25zdCB7IHN0YXR1cywgcmFuZG9tSGV4Q29sb3IsIHRyYW5zZm9ybVRvVHdlZXQsIGNyZWF0ZVVybH0gPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcblxyXG5sZXQgY2xpY2tQdWJsaXNoZXIgPSBuZXcgUHVibGlzaGVyKCk7XHJcbmxldCBxdW90ZVZpZXdlciA9IG5ldyBRdW90ZVZpZXdlcignYXV0aG9yLW5hbWUnLCAnd2lraS10ZXh0JywgJ3dpa2ktYnV0dG9uJywndHdlZXQtYnV0dG9uJyk7XHJcblxyXG5jb25zdCBkaXNwbGF5TWVzc2FnZVN1YnNjcmliZXIgPSAoKSA9PlxyXG5cdGZldGNoKGNyZWF0ZVVybCgpKVxyXG5cdFx0LnRoZW4oc3RhdHVzKVxyXG5cdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcblx0XHQudGhlbigoZGF0YSkgPT4ge1xyXG5cdFx0XHRxdW90ZVZpZXdlci5kaXNwbGF5TmV3UW91dGUoZGF0YS5xdW90ZUF1dGhvciwgZGF0YS5xdW90ZVRleHQpXHJcblx0XHRcdHF1b3RlVmlld2VyLnNldFR3ZWV0KHRyYW5zZm9ybVRvVHdlZXQoZGF0YS5xdW90ZVRleHQpKVxyXG5cdFx0fSlcclxuXHRcdFxyXG5jb25zdCBjaGFuZ2VDb2xvclN1YnNjcmliZXIgPSAoZnVuY3Rpb24oc2VsZWN0b3IpIHtcclxuXHRjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cdGxldCBzdHlsZTtcclxuXHRyZXR1cm4gKCkgPT4ge1xyXG5cdFx0c3R5bGUgPSBgYmFja2dyb3VuZC1jb2xvcjoke3JhbmRvbUhleENvbG9yKCl9OyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDFzIGxpbmVhcjtgO1xyXG5cdFx0c2VsZWN0ZWQuZm9yRWFjaCgoaXRlbSkgPT4gKGl0ZW0uc3R5bGUgPSBzdHlsZSkpO1xyXG5cdH07XHJcbn0pKCcuanMtY29sb3JlZCcpO1xyXG5cclxuY29uc3Qgb2JzZXJ2c2VycyA9IFsgY2hhbmdlQ29sb3JTdWJzY3JpYmVyLCBkaXNwbGF5TWVzc2FnZVN1YnNjcmliZXIgXTtcclxuXHJcbm9ic2VydnNlcnMuZm9yRWFjaCgob2JzKSA9PiBjbGlja1B1Ymxpc2hlci5zdWJzY3JpYmUob2JzKSk7XHJcbnF1b3RlVmlld2VyLm9uQ2xpY2soKCkgPT4gY2xpY2tQdWJsaXNoZXIuZGVsaXZlcigpKTtcclxuXHJcbmNsaWNrUHVibGlzaGVyLmRlbGl2ZXIoKTtcclxuIiwiZnVuY3Rpb24gc3RhdHVzKHJlc3BvbnNlKSB7XHJcblx0aWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByYW5kb21IZXhDb2xvcigpIHtcclxuXHRyZXR1cm4gXCIjXCIrKCgxPDwyNCkqTWF0aC5yYW5kb20oKXwwKS50b1N0cmluZygxNik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVRvVHdlZXQodHdlZXQpe1xyXG5cdGxldCBlbmRwb2ludCA9ICdodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSc7XHJcblx0bGV0IGVuZG9jb2RlZFR3ZWV0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHR3ZWV0KTtcclxuXHRyZXR1cm4gYCR7ZW5kcG9pbnR9JHtlbmRvY29kZWRUd2VldH1gXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVVybCgpIHtcclxuXHRsZXQga2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCAtIDEpO1xyXG5cdHJldHVybiBgaHR0cHM6Ly9jb3JzLm5vdy5zaC9odHRwczovL2FwaS5mb3Jpc21hdGljLmNvbS9hcGkvMS4wLz9tZXRob2Q9Z2V0UXVvdGUmZm9ybWF0PWpzb24mbGFuZz1lbiZjYWxsYmFjaz0/JHtrZXl9YFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IHN0YXR1cywgcmFuZG9tSGV4Q29sb3IsIHRyYW5zZm9ybVRvVHdlZXQsIGNyZWF0ZVVybH07XHJcblxyXG4iXX0=
