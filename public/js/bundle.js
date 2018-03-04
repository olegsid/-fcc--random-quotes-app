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
	function QuoteViewer(authorEl, qouteEl, nextQouteBtnEl) {
		_classCallCheck(this, QuoteViewer);

		this.authorEl = document.getElementsByClassName(authorEl)[0];
		this.qouteEl = document.getElementsByClassName(qouteEl)[0];
		this.nextQouteBtnEl = document.getElementsByClassName(nextQouteBtnEl)[0];
	}

	_createClass(QuoteViewer, [{
		key: "displayNewQute",
		value: function displayNewQute(authorName, text) {
			this.authorEl.innerHTML = authorName;
			this.qouteEl.innerHTML = text;
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

var clickPublisher = new Publisher();
var quoteViewer = new QuoteViewer('author-name', 'wiki-text', 'wiki-button');

var url = function url() {
	var key = Math.floor(Math.random() * 1000000 - 1);
	return 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?&key=' + key;
};

var displayMessage = function displayMessage(data) {
	return fetch(url()).then(status).then(function (response) {
		return response.json();
	}).then(function (jsonText) {
		return quoteViewer.displayNewQute(jsonText.quoteAuthor, jsonText.quoteText);
	});
};

var colorSubscriber = function (selector) {
	var app = document.querySelector(selector);
	return function () {
		return app.style = 'background-color:' + randomHexColor() + '; transition: background-color 1s linear;';
	};
}('body');

var observsers = [colorSubscriber, displayMessage];
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

module.exports = { status: status, randomHexColor: randomHexColor };

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1B1Ymxpc2hlci5qcyIsImFwcC9qcy9kZXYvUXVvdGVWaWV3ZXIuanMiLCJhcHAvanMvZGV2L21haW4uanMiLCJhcHAvanMvZGV2L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sUztBQUNMLHNCQUFjO0FBQUE7O0FBQ2IsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7MEJBRU8sSSxFQUFNO0FBQ2IsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFdBQVEsR0FBRyxJQUFILENBQVI7QUFBQSxJQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7NEJBRVMsUSxFQUFVO0FBQ25CLFFBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixRQUF0QjtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsU0FBakI7Ozs7Ozs7OztJQ2ZNLFc7QUFDTCxzQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLGNBQS9CLEVBQStDO0FBQUE7O0FBQzlDLE9BQUssUUFBTCxHQUFnQixTQUFTLHNCQUFULENBQWdDLFFBQWhDLEVBQTBDLENBQTFDLENBQWhCO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsRUFBeUMsQ0FBekMsQ0FBaEI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF0QjtBQUNBOzs7O2lDQUNjLFUsRUFBWSxJLEVBQU07QUFDaEMsUUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNBLFFBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsSUFBekI7QUFDQTs7OzBCQUNPLEUsRUFBSTtBQUNYLFFBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOEMsRUFBOUM7QUFDQTs7Ozs7O0FBR0YsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7OztBQ2ZBLElBQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSxlQUFSLENBQXBCO0FBQ0EsSUFBTSxTQUFTLFFBQVEsU0FBUixFQUFtQixNQUFsQztBQUNBLElBQU0saUJBQWlCLFFBQVEsU0FBUixFQUFtQixjQUExQzs7QUFFQSxJQUFJLGlCQUFpQixJQUFJLFNBQUosRUFBckI7QUFDQSxJQUFJLGNBQWMsSUFBSSxXQUFKLENBQWdCLGFBQWhCLEVBQStCLFdBQS9CLEVBQTRDLGFBQTVDLENBQWxCOztBQUVBLElBQU0sTUFBTSxTQUFOLEdBQU0sR0FBVTtBQUNyQixLQUFJLE1BQU0sS0FBSyxLQUFMLENBQVksS0FBSyxNQUFMLEtBQWMsT0FBZCxHQUFzQixDQUFsQyxDQUFWO0FBQ0EsUUFBTyw0RkFBMEYsR0FBakc7QUFDQSxDQUhEOztBQUtBLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLENBQUMsSUFBRDtBQUFBLFFBQ3RCLE1BQU0sS0FBTixFQUNFLElBREYsQ0FDTyxNQURQLEVBRUUsSUFGRixDQUVPLFVBQUMsUUFBRDtBQUFBLFNBQWMsU0FBUyxJQUFULEVBQWQ7QUFBQSxFQUZQLEVBR0UsSUFIRixDQUdPLFVBQUMsUUFBRDtBQUFBLFNBQWMsWUFBWSxjQUFaLENBQTJCLFNBQVMsV0FBcEMsRUFBaUQsU0FBUyxTQUExRCxDQUFkO0FBQUEsRUFIUCxDQURzQjtBQUFBLENBQXZCOztBQU1BLElBQU0sa0JBQW1CLFVBQVMsUUFBVCxFQUFtQjtBQUMzQyxLQUFNLE1BQU0sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVo7QUFDQSxRQUFPO0FBQUEsU0FBTSxJQUFJLEtBQUoseUJBQThCLGdCQUE5Qiw4Q0FBTjtBQUFBLEVBQVA7QUFDQSxDQUh1QixDQUdyQixNQUhxQixDQUF4Qjs7QUFLQSxJQUFNLGFBQWEsQ0FBQyxlQUFELEVBQWtCLGNBQWxCLENBQW5CO0FBQ0EsV0FBVyxPQUFYLENBQW1CLFVBQUMsR0FBRDtBQUFBLFFBQVMsZUFBZSxTQUFmLENBQXlCLEdBQXpCLENBQVQ7QUFBQSxDQUFuQjtBQUNBLFlBQVksT0FBWixDQUFvQjtBQUFBLFFBQU0sZUFBZSxPQUFmLEVBQU47QUFBQSxDQUFwQjs7QUFFQSxlQUFlLE9BQWY7Ozs7O0FDNUJBLFNBQVMsTUFBVCxDQUFnQixRQUFoQixFQUEwQjtBQUN6QixLQUFJLFNBQVMsTUFBVCxJQUFtQixHQUFuQixJQUEwQixTQUFTLE1BQVQsR0FBa0IsR0FBaEQsRUFBcUQ7QUFDcEQsU0FBTyxRQUFRLE9BQVIsQ0FBZ0IsUUFBaEIsQ0FBUDtBQUNBLEVBRkQsTUFFTztBQUNOLFNBQU8sUUFBUSxNQUFSLENBQWUsSUFBSSxLQUFKLENBQVUsU0FBUyxVQUFuQixDQUFmLENBQVA7QUFDQTtBQUNEOztBQUVELFNBQVMsY0FBVCxHQUEwQjtBQUN6QixRQUFPLE1BQUksQ0FBQyxDQUFDLEtBQUcsRUFBSixJQUFRLEtBQUssTUFBTCxFQUFSLEdBQXNCLENBQXZCLEVBQTBCLFFBQTFCLENBQW1DLEVBQW5DLENBQVg7QUFDQTs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsRUFBRSxjQUFGLEVBQVUsOEJBQVYsRUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImNsYXNzIFB1Ymxpc2hlciB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnN1YnNjcmliZXJzID0gW107XHJcblx0fVxyXG5cclxuXHRkZWxpdmVyKGRhdGEpIHtcclxuXHRcdHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgoZm4pID0+IGZuKGRhdGEpKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0c3Vic2NyaWJlKG9ic2VydmVyKSB7XHJcblx0XHR0aGlzLnN1YnNjcmliZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaXNoZXIiLCJjbGFzcyBRdW90ZVZpZXdlciB7XHJcblx0Y29uc3RydWN0b3IoYXV0aG9yRWwsIHFvdXRlRWwsIG5leHRRb3V0ZUJ0bkVsKSB7XHJcblx0XHR0aGlzLmF1dGhvckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShhdXRob3JFbClbMF07XHJcblx0XHR0aGlzLnFvdXRlRWwgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShxb3V0ZUVsKVswXTsgXHJcblx0XHR0aGlzLm5leHRRb3V0ZUJ0bkVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuZXh0UW91dGVCdG5FbClbMF07XHJcblx0fVxyXG5cdGRpc3BsYXlOZXdRdXRlKGF1dGhvck5hbWUsIHRleHQpIHtcclxuXHRcdHRoaXMuYXV0aG9yRWwuaW5uZXJIVE1MID0gYXV0aG9yTmFtZTtcclxuXHRcdHRoaXMucW91dGVFbC5pbm5lckhUTUwgPSB0ZXh0O1xyXG5cdH1cclxuXHRvbkNsaWNrKGZuKSB7XHJcblx0XHR0aGlzLm5leHRRb3V0ZUJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmbik7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFF1b3RlVmlld2VyIiwiY29uc3QgUHVibGlzaGVyID0gcmVxdWlyZSgnLi9QdWJsaXNoZXInKTtcclxuY29uc3QgUXVvdGVWaWV3ZXIgPSByZXF1aXJlKCcuL1F1b3RlVmlld2VyJyk7XHJcbmNvbnN0IHN0YXR1cyA9IHJlcXVpcmUoJy4vdXRpbHMnKS5zdGF0dXM7XHJcbmNvbnN0IHJhbmRvbUhleENvbG9yID0gcmVxdWlyZSgnLi91dGlscycpLnJhbmRvbUhleENvbG9yXHJcblxyXG5sZXQgY2xpY2tQdWJsaXNoZXIgPSBuZXcgUHVibGlzaGVyKCk7XHJcbmxldCBxdW90ZVZpZXdlciA9IG5ldyBRdW90ZVZpZXdlcignYXV0aG9yLW5hbWUnLCAnd2lraS10ZXh0JywgJ3dpa2ktYnV0dG9uJyk7XHJcblxyXG5jb25zdCB1cmwgPSBmdW5jdGlvbigpe1xyXG5cdGxldCBrZXkgPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpKjEwMDAwMDAtMSApO1xyXG5cdHJldHVybiAnaHR0cHM6Ly9hcGkuZm9yaXNtYXRpYy5jb20vYXBpLzEuMC8/bWV0aG9kPWdldFF1b3RlJmZvcm1hdD1qc29uJmxhbmc9ZW4mY2FsbGJhY2s9PyZrZXk9JytrZXk7XHJcbn1cclxuXHJcbmNvbnN0IGRpc3BsYXlNZXNzYWdlID0gKGRhdGEpID0+XHJcblx0ZmV0Y2godXJsKCkpXHJcblx0XHQudGhlbihzdGF0dXMpXHJcblx0XHQudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuXHRcdC50aGVuKChqc29uVGV4dCkgPT4gcXVvdGVWaWV3ZXIuZGlzcGxheU5ld1F1dGUoanNvblRleHQucXVvdGVBdXRob3IsIGpzb25UZXh0LnF1b3RlVGV4dCkpO1xyXG5cclxuY29uc3QgY29sb3JTdWJzY3JpYmVyID0gKGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcblx0Y29uc3QgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblx0cmV0dXJuICgpID0+IGFwcC5zdHlsZT1gYmFja2dyb3VuZC1jb2xvcjoke3JhbmRvbUhleENvbG9yKCl9OyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDFzIGxpbmVhcjtgXHJcbn0pKCdib2R5JylcclxuXHJcbmNvbnN0IG9ic2VydnNlcnMgPSBbY29sb3JTdWJzY3JpYmVyLCBkaXNwbGF5TWVzc2FnZV07XHJcbm9ic2VydnNlcnMuZm9yRWFjaCgob2JzKSA9PiBjbGlja1B1Ymxpc2hlci5zdWJzY3JpYmUob2JzKSk7XHJcbnF1b3RlVmlld2VyLm9uQ2xpY2soKCkgPT4gY2xpY2tQdWJsaXNoZXIuZGVsaXZlcigpKTtcclxuXHJcbmNsaWNrUHVibGlzaGVyLmRlbGl2ZXIoKTtcclxuIiwiZnVuY3Rpb24gc3RhdHVzKHJlc3BvbnNlKSB7XHJcblx0aWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByYW5kb21IZXhDb2xvcigpIHtcclxuXHRyZXR1cm4gXCIjXCIrKCgxPDwyNCkqTWF0aC5yYW5kb20oKXwwKS50b1N0cmluZygxNik7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBzdGF0dXMsIHJhbmRvbUhleENvbG9yIH07XHJcbiJdfQ==
