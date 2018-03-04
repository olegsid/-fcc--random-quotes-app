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
		key: "displayNewQoute",
		value: function displayNewQoute(authorName, text) {
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
	return 'https://cors.now.sh/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?' + key;
};

var displayMessageSubscriber = function displayMessageSubscriber() {
	return fetch(url()).then(status).then(function (response) {
		return response.json();
	}).then(function (data) {
		return quoteViewer.displayNewQoute(data.quoteAuthor, data.quoteText);
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

module.exports = { status: status, randomHexColor: randomHexColor };

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1B1Ymxpc2hlci5qcyIsImFwcC9qcy9kZXYvUXVvdGVWaWV3ZXIuanMiLCJhcHAvanMvZGV2L21haW4uanMiLCJhcHAvanMvZGV2L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sUztBQUNMLHNCQUFjO0FBQUE7O0FBQ2IsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7MEJBRU8sSSxFQUFNO0FBQ2IsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFdBQVEsR0FBRyxJQUFILENBQVI7QUFBQSxJQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7NEJBRVMsUSxFQUFVO0FBQ25CLFFBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixRQUF0QjtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsU0FBakI7Ozs7Ozs7OztJQ2ZNLFc7QUFDTCxzQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLGNBQS9CLEVBQStDO0FBQUE7O0FBQzlDLE9BQUssUUFBTCxHQUFnQixTQUFTLHNCQUFULENBQWdDLFFBQWhDLEVBQTBDLENBQTFDLENBQWhCO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsRUFBeUMsQ0FBekMsQ0FBaEI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF0QjtBQUNBOzs7O2tDQUNlLFUsRUFBWSxJLEVBQU07QUFDakMsUUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNBLFFBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsSUFBekI7QUFDQTs7OzBCQUNPLEUsRUFBSTtBQUNYLFFBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOEMsRUFBOUM7QUFDQTs7Ozs7O0FBR0YsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7OztBQ2ZBLElBQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSxlQUFSLENBQXBCO0FBQ0EsSUFBTSxTQUFTLFFBQVEsU0FBUixFQUFtQixNQUFsQztBQUNBLElBQU0saUJBQWlCLFFBQVEsU0FBUixFQUFtQixjQUExQzs7QUFFQSxJQUFJLGlCQUFpQixJQUFJLFNBQUosRUFBckI7QUFDQSxJQUFJLGNBQWMsSUFBSSxXQUFKLENBQWdCLGFBQWhCLEVBQStCLFdBQS9CLEVBQTRDLGFBQTVDLENBQWxCOztBQUVBLElBQU0sTUFBTSxTQUFOLEdBQU0sR0FBVztBQUN0QixLQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLE9BQWhCLEdBQTBCLENBQXJDLENBQVY7QUFDQSxRQUFPLDJHQUEyRyxHQUFsSDtBQUNBLENBSEQ7O0FBS0EsSUFBTSwyQkFBMkIsU0FBM0Isd0JBQTJCO0FBQUEsUUFDaEMsTUFBTSxLQUFOLEVBQ0UsSUFERixDQUNPLE1BRFAsRUFFRSxJQUZGLENBRU8sVUFBQyxRQUFEO0FBQUEsU0FBYyxTQUFTLElBQVQsRUFBZDtBQUFBLEVBRlAsRUFHRSxJQUhGLENBR08sVUFBQyxJQUFEO0FBQUEsU0FBVSxZQUFZLGVBQVosQ0FBNEIsS0FBSyxXQUFqQyxFQUE4QyxLQUFLLFNBQW5ELENBQVY7QUFBQSxFQUhQLENBRGdDO0FBQUEsQ0FBakM7O0FBTUEsSUFBTSx3QkFBeUIsVUFBUyxRQUFULEVBQW1CO0FBQ2pELEtBQU0sV0FBVyxTQUFTLGdCQUFULENBQTBCLFFBQTFCLENBQWpCO0FBQ0EsS0FBSSxjQUFKO0FBQ0EsUUFBTyxZQUFNO0FBQ1osZ0NBQTRCLGdCQUE1QjtBQUNBLFdBQVMsT0FBVCxDQUFpQixVQUFDLElBQUQ7QUFBQSxVQUFXLEtBQUssS0FBTCxHQUFhLEtBQXhCO0FBQUEsR0FBakI7QUFDQSxFQUhEO0FBSUEsQ0FQNkIsQ0FPM0IsYUFQMkIsQ0FBOUI7O0FBU0EsSUFBTSxhQUFhLENBQUUscUJBQUYsRUFBeUIsd0JBQXpCLENBQW5COztBQUVBLFdBQVcsT0FBWCxDQUFtQixVQUFDLEdBQUQ7QUFBQSxRQUFTLGVBQWUsU0FBZixDQUF5QixHQUF6QixDQUFUO0FBQUEsQ0FBbkI7QUFDQSxZQUFZLE9BQVosQ0FBb0I7QUFBQSxRQUFNLGVBQWUsT0FBZixFQUFOO0FBQUEsQ0FBcEI7O0FBRUEsZUFBZSxPQUFmOzs7OztBQ2pDQSxTQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDekIsS0FBSSxTQUFTLE1BQVQsSUFBbUIsR0FBbkIsSUFBMEIsU0FBUyxNQUFULEdBQWtCLEdBQWhELEVBQXFEO0FBQ3BELFNBQU8sUUFBUSxPQUFSLENBQWdCLFFBQWhCLENBQVA7QUFDQSxFQUZELE1BRU87QUFDTixTQUFPLFFBQVEsTUFBUixDQUFlLElBQUksS0FBSixDQUFVLFNBQVMsVUFBbkIsQ0FBZixDQUFQO0FBQ0E7QUFDRDs7QUFFRCxTQUFTLGNBQVQsR0FBMEI7QUFDekIsUUFBTyxNQUFJLENBQUMsQ0FBQyxLQUFHLEVBQUosSUFBUSxLQUFLLE1BQUwsRUFBUixHQUFzQixDQUF2QixFQUEwQixRQUExQixDQUFtQyxFQUFuQyxDQUFYO0FBQ0E7O0FBR0QsT0FBTyxPQUFQLEdBQWlCLEVBQUUsY0FBRixFQUFVLDhCQUFWLEVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJjbGFzcyBQdWJsaXNoZXIge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycyA9IFtdO1xyXG5cdH1cclxuXHJcblx0ZGVsaXZlcihkYXRhKSB7XHJcblx0XHR0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKGZuKSA9PiBmbihkYXRhKSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdHN1YnNjcmliZShvYnNlcnZlcikge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycy5wdXNoKG9ic2VydmVyKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUHVibGlzaGVyIiwiY2xhc3MgUXVvdGVWaWV3ZXIge1xyXG5cdGNvbnN0cnVjdG9yKGF1dGhvckVsLCBxb3V0ZUVsLCBuZXh0UW91dGVCdG5FbCkge1xyXG5cdFx0dGhpcy5hdXRob3JFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYXV0aG9yRWwpWzBdO1xyXG5cdFx0dGhpcy5xb3V0ZUVsID0gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUocW91dGVFbClbMF07IFxyXG5cdFx0dGhpcy5uZXh0UW91dGVCdG5FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmV4dFFvdXRlQnRuRWwpWzBdO1xyXG5cdH1cclxuXHRkaXNwbGF5TmV3UW91dGUoYXV0aG9yTmFtZSwgdGV4dCkge1xyXG5cdFx0dGhpcy5hdXRob3JFbC5pbm5lckhUTUwgPSBhdXRob3JOYW1lO1xyXG5cdFx0dGhpcy5xb3V0ZUVsLmlubmVySFRNTCA9IHRleHQ7XHJcblx0fVxyXG5cdG9uQ2xpY2soZm4pIHtcclxuXHRcdHRoaXMubmV4dFFvdXRlQnRuRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZuKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUXVvdGVWaWV3ZXIiLCJjb25zdCBQdWJsaXNoZXIgPSByZXF1aXJlKCcuL1B1Ymxpc2hlcicpO1xyXG5jb25zdCBRdW90ZVZpZXdlciA9IHJlcXVpcmUoJy4vUXVvdGVWaWV3ZXInKTtcclxuY29uc3Qgc3RhdHVzID0gcmVxdWlyZSgnLi91dGlscycpLnN0YXR1cztcclxuY29uc3QgcmFuZG9tSGV4Q29sb3IgPSByZXF1aXJlKCcuL3V0aWxzJykucmFuZG9tSGV4Q29sb3I7XHJcblxyXG5sZXQgY2xpY2tQdWJsaXNoZXIgPSBuZXcgUHVibGlzaGVyKCk7XHJcbmxldCBxdW90ZVZpZXdlciA9IG5ldyBRdW90ZVZpZXdlcignYXV0aG9yLW5hbWUnLCAnd2lraS10ZXh0JywgJ3dpa2ktYnV0dG9uJyk7XHJcblxyXG5jb25zdCB1cmwgPSBmdW5jdGlvbigpIHtcclxuXHRsZXQga2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCAtIDEpO1xyXG5cdHJldHVybiAnaHR0cHM6Ly9jb3JzLm5vdy5zaC9odHRwczovL2FwaS5mb3Jpc21hdGljLmNvbS9hcGkvMS4wLz9tZXRob2Q9Z2V0UXVvdGUmZm9ybWF0PWpzb24mbGFuZz1lbiZjYWxsYmFjaz0/JyArIGtleVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheU1lc3NhZ2VTdWJzY3JpYmVyID0gKCkgPT5cclxuXHRmZXRjaCh1cmwoKSlcclxuXHRcdC50aGVuKHN0YXR1cylcclxuXHRcdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG5cdFx0LnRoZW4oKGRhdGEpID0+IHF1b3RlVmlld2VyLmRpc3BsYXlOZXdRb3V0ZShkYXRhLnF1b3RlQXV0aG9yLCBkYXRhLnF1b3RlVGV4dCkpO1xyXG5cclxuY29uc3QgY2hhbmdlQ29sb3JTdWJzY3JpYmVyID0gKGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcblx0Y29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHRsZXQgc3R5bGU7XHJcblx0cmV0dXJuICgpID0+IHtcclxuXHRcdHN0eWxlID0gYGJhY2tncm91bmQtY29sb3I6JHtyYW5kb21IZXhDb2xvcigpfTsgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAxcyBsaW5lYXI7YDtcclxuXHRcdHNlbGVjdGVkLmZvckVhY2goKGl0ZW0pID0+IChpdGVtLnN0eWxlID0gc3R5bGUpKTtcclxuXHR9O1xyXG59KSgnLmpzLWNvbG9yZWQnKTtcclxuXHJcbmNvbnN0IG9ic2VydnNlcnMgPSBbIGNoYW5nZUNvbG9yU3Vic2NyaWJlciwgZGlzcGxheU1lc3NhZ2VTdWJzY3JpYmVyIF07XHJcblxyXG5vYnNlcnZzZXJzLmZvckVhY2goKG9icykgPT4gY2xpY2tQdWJsaXNoZXIuc3Vic2NyaWJlKG9icykpO1xyXG5xdW90ZVZpZXdlci5vbkNsaWNrKCgpID0+IGNsaWNrUHVibGlzaGVyLmRlbGl2ZXIoKSk7XHJcblxyXG5jbGlja1B1Ymxpc2hlci5kZWxpdmVyKCk7XHJcbiIsImZ1bmN0aW9uIHN0YXR1cyhyZXNwb25zZSkge1xyXG5cdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9tSGV4Q29sb3IoKSB7XHJcblx0cmV0dXJuIFwiI1wiKygoMTw8MjQpKk1hdGgucmFuZG9tKCl8MCkudG9TdHJpbmcoMTYpO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IHN0YXR1cywgcmFuZG9tSGV4Q29sb3J9O1xyXG5cclxuIl19
