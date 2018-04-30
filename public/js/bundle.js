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
var status = require('./utils').status;
var randomHexColor = require('./utils').randomHexColor;
var transformToTweet = require('./utils').transformToTweet;

var clickPublisher = new Publisher();
var quoteViewer = new QuoteViewer('author-name', 'wiki-text', 'wiki-button', 'tweet-button');

var url = function url() {
	var key = Math.floor(Math.random() * 1000000 - 1);
	return 'https://cors.now.sh/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?' + key;
};

var displayMessageSubscriber = function displayMessageSubscriber() {
	return fetch(url()).then(status).then(function (response) {
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

module.exports = { status: status, randomHexColor: randomHexColor, transformToTweet: transformToTweet };

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1B1Ymxpc2hlci5qcyIsImFwcC9qcy9kZXYvUXVvdGVWaWV3ZXIuanMiLCJhcHAvanMvZGV2L21haW4uanMiLCJhcHAvanMvZGV2L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sUztBQUNMLHNCQUFjO0FBQUE7O0FBQ2IsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7MEJBRU8sSSxFQUFNO0FBQ2IsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFdBQVEsR0FBRyxJQUFILENBQVI7QUFBQSxJQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7NEJBRVMsUSxFQUFVO0FBQ25CLFFBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixRQUF0QjtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsU0FBakI7Ozs7Ozs7OztJQ2ZNLFc7QUFDTCxzQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLGNBQS9CLEVBQStDLFVBQS9DLEVBQTJEO0FBQUE7O0FBQzFELE9BQUssUUFBTCxHQUFnQixTQUFTLHNCQUFULENBQWdDLFFBQWhDLEVBQTBDLENBQTFDLENBQWhCO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsRUFBeUMsQ0FBekMsQ0FBaEI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF0QjtBQUNBLE9BQUssVUFBTCxHQUFrQixTQUFTLHNCQUFULENBQWdDLFVBQWhDLEVBQTRDLENBQTVDLENBQWxCO0FBQ0E7Ozs7a0NBQ2UsVSxFQUFZLEksRUFBTTtBQUNqQyxRQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLFVBQTFCO0FBQ0EsUUFBSyxPQUFMLENBQWEsU0FBYixHQUF5QixJQUF6QjtBQUNBOzs7MkJB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O0FBR0QsT0FBTyxPQUFQLEdBQWlCLEVBQUUsY0FBRixFQUFVLDhCQUFWLEVBQTBCLGtDQUExQixFQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiY2xhc3MgUHVibGlzaGVyIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuc3Vic2NyaWJlcnMgPSBbXTtcclxuXHR9XHJcblxyXG5cdGRlbGl2ZXIoZGF0YSkge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcclxuXHRcdHRoaXMuc3Vic2NyaWJlcnMucHVzaChvYnNlcnZlcik7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFB1Ymxpc2hlciIsImNsYXNzIFF1b3RlVmlld2VyIHtcclxuXHRjb25zdHJ1Y3RvcihhdXRob3JFbCwgcW91dGVFbCwgbmV4dFFvdXRlQnRuRWwsIHR3ZWV0QnRuRWwpIHtcclxuXHRcdHRoaXMuYXV0aG9yRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGF1dGhvckVsKVswXTtcclxuXHRcdHRoaXMucW91dGVFbCA9ICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHFvdXRlRWwpWzBdOyBcclxuXHRcdHRoaXMubmV4dFFvdXRlQnRuRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5leHRRb3V0ZUJ0bkVsKVswXTtcclxuXHRcdHRoaXMudHdlZXRCdG5FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodHdlZXRCdG5FbClbMF07XHJcblx0fVxyXG5cdGRpc3BsYXlOZXdRb3V0ZShhdXRob3JOYW1lLCB0ZXh0KSB7XHJcblx0XHR0aGlzLmF1dGhvckVsLmlubmVySFRNTCA9IGF1dGhvck5hbWU7XHJcblx0XHR0aGlzLnFvdXRlRWwuaW5uZXJIVE1MID0gdGV4dDtcclxuXHR9XHJcblxyXG5cdHNldFR3ZWV0KGxpbmspe1xyXG5cdFx0dGhpcy50d2VldEJ0bkVsLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxpbmspXHJcblx0fVxyXG5cclxuXHRvbkNsaWNrKGZuKSB7XHJcblx0XHR0aGlzLm5leHRRb3V0ZUJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmbik7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFF1b3RlVmlld2VyIiwiY29uc3QgUHVibGlzaGVyID0gcmVxdWlyZSgnLi9QdWJsaXNoZXInKTtcclxuY29uc3QgUXVvdGVWaWV3ZXIgPSByZXF1aXJlKCcuL1F1b3RlVmlld2VyJyk7XHJcbmNvbnN0IHN0YXR1cyA9IHJlcXVpcmUoJy4vdXRpbHMnKS5zdGF0dXM7XHJcbmNvbnN0IHJhbmRvbUhleENvbG9yID0gcmVxdWlyZSgnLi91dGlscycpLnJhbmRvbUhleENvbG9yO1xyXG5jb25zdCB0cmFuc2Zvcm1Ub1R3ZWV0ID0gcmVxdWlyZSgnLi91dGlscycpLnRyYW5zZm9ybVRvVHdlZXQ7XHJcblxyXG5sZXQgY2xpY2tQdWJsaXNoZXIgPSBuZXcgUHVibGlzaGVyKCk7XHJcbmxldCBxdW90ZVZpZXdlciA9IG5ldyBRdW90ZVZpZXdlcignYXV0aG9yLW5hbWUnLCAnd2lraS10ZXh0JywgJ3dpa2ktYnV0dG9uJywndHdlZXQtYnV0dG9uJyk7XHJcblxyXG5jb25zdCB1cmwgPSBmdW5jdGlvbigpIHtcclxuXHRsZXQga2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCAtIDEpO1xyXG5cdHJldHVybiAnaHR0cHM6Ly9jb3JzLm5vdy5zaC9odHRwczovL2FwaS5mb3Jpc21hdGljLmNvbS9hcGkvMS4wLz9tZXRob2Q9Z2V0UXVvdGUmZm9ybWF0PWpzb24mbGFuZz1lbiZjYWxsYmFjaz0/JyArIGtleVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheU1lc3NhZ2VTdWJzY3JpYmVyID0gKCkgPT5cclxuXHRmZXRjaCh1cmwoKSlcclxuXHRcdC50aGVuKHN0YXR1cylcclxuXHRcdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG5cdFx0LnRoZW4oKGRhdGEpID0+IHtcclxuXHRcdFx0cXVvdGVWaWV3ZXIuZGlzcGxheU5ld1FvdXRlKGRhdGEucXVvdGVBdXRob3IsIGRhdGEucXVvdGVUZXh0KVxyXG5cdFx0XHRxdW90ZVZpZXdlci5zZXRUd2VldCh0cmFuc2Zvcm1Ub1R3ZWV0KGRhdGEucXVvdGVUZXh0KSlcclxuXHRcdH0pXHJcblxyXG5cclxuXHJcblx0XHRcclxuY29uc3QgY2hhbmdlQ29sb3JTdWJzY3JpYmVyID0gKGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcblx0Y29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHRsZXQgc3R5bGU7XHJcblx0cmV0dXJuICgpID0+IHtcclxuXHRcdHN0eWxlID0gYGJhY2tncm91bmQtY29sb3I6JHtyYW5kb21IZXhDb2xvcigpfTsgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAxcyBsaW5lYXI7YDtcclxuXHRcdHNlbGVjdGVkLmZvckVhY2goKGl0ZW0pID0+IChpdGVtLnN0eWxlID0gc3R5bGUpKTtcclxuXHR9O1xyXG59KSgnLmpzLWNvbG9yZWQnKTtcclxuXHJcblxyXG5cclxuY29uc3Qgb2JzZXJ2c2VycyA9IFsgY2hhbmdlQ29sb3JTdWJzY3JpYmVyLCBkaXNwbGF5TWVzc2FnZVN1YnNjcmliZXIgXTtcclxuXHJcbm9ic2VydnNlcnMuZm9yRWFjaCgob2JzKSA9PiBjbGlja1B1Ymxpc2hlci5zdWJzY3JpYmUob2JzKSk7XHJcbnF1b3RlVmlld2VyLm9uQ2xpY2soKCkgPT4gY2xpY2tQdWJsaXNoZXIuZGVsaXZlcigpKTtcclxuXHJcbmNsaWNrUHVibGlzaGVyLmRlbGl2ZXIoKTtcclxuIiwiZnVuY3Rpb24gc3RhdHVzKHJlc3BvbnNlKSB7XHJcblx0aWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByYW5kb21IZXhDb2xvcigpIHtcclxuXHRyZXR1cm4gXCIjXCIrKCgxPDwyNCkqTWF0aC5yYW5kb20oKXwwKS50b1N0cmluZygxNik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRyYW5zZm9ybVRvVHdlZXQodHdlZXQpe1xyXG5cdGxldCBlbmRwb2ludCA9ICdodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSc7XHJcblx0bGV0IGVuZG9jb2RlZFR3ZWV0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHR3ZWV0KTtcclxuXHRyZXR1cm4gYCR7ZW5kcG9pbnR9JHtlbmRvY29kZWRUd2VldH1gXHJcbn1cclxuXHRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBzdGF0dXMsIHJhbmRvbUhleENvbG9yLCB0cmFuc2Zvcm1Ub1R3ZWV0fTtcclxuXHJcbiJdfQ==
