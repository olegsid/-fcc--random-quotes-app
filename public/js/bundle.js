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
	return 'https://cors.now.sh/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&callback=?' + key;
};

var displayMessageSubscriber = function displayMessageSubscriber(data) {
	return fetch(url()).then(status).then(function (response) {
		return response.json();
	}).then(function (data) {
		return quoteViewer.displayNewQute(data.quoteAuthor, data.quoteText);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1B1Ymxpc2hlci5qcyIsImFwcC9qcy9kZXYvUXVvdGVWaWV3ZXIuanMiLCJhcHAvanMvZGV2L21haW4uanMiLCJhcHAvanMvZGV2L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sUztBQUNMLHNCQUFjO0FBQUE7O0FBQ2IsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7MEJBRU8sSSxFQUFNO0FBQ2IsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFdBQVEsR0FBRyxJQUFILENBQVI7QUFBQSxJQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7NEJBRVMsUSxFQUFVO0FBQ25CLFFBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixRQUF0QjtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsU0FBakI7Ozs7Ozs7OztJQ2ZNLFc7QUFDTCxzQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLGNBQS9CLEVBQStDO0FBQUE7O0FBQzlDLE9BQUssUUFBTCxHQUFnQixTQUFTLHNCQUFULENBQWdDLFFBQWhDLEVBQTBDLENBQTFDLENBQWhCO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsRUFBeUMsQ0FBekMsQ0FBaEI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF0QjtBQUNBOzs7O2lDQUNjLFUsRUFBWSxJLEVBQU07QUFDaEMsUUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNBLFFBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsSUFBekI7QUFDQTs7OzBCQUNPLEUsRUFBSTtBQUNYLFFBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOEMsRUFBOUM7QUFDQTs7Ozs7O0FBR0YsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7OztBQ2ZBLElBQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSxlQUFSLENBQXBCO0FBQ0EsSUFBTSxTQUFTLFFBQVEsU0FBUixFQUFtQixNQUFsQztBQUNBLElBQU0saUJBQWlCLFFBQVEsU0FBUixFQUFtQixjQUExQzs7QUFFQSxJQUFJLGlCQUFpQixJQUFJLFNBQUosRUFBckI7QUFDQSxJQUFJLGNBQWMsSUFBSSxXQUFKLENBQWdCLGFBQWhCLEVBQStCLFdBQS9CLEVBQTRDLGFBQTVDLENBQWxCOztBQUVBLElBQU0sTUFBTSxTQUFOLEdBQU0sR0FBVztBQUN0QixLQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLE9BQWhCLEdBQTBCLENBQXJDLENBQVY7QUFDQSxRQUNDLDJHQUEyRyxHQUQ1RztBQUdBLENBTEQ7O0FBT0EsSUFBTSwyQkFBMkIsU0FBM0Isd0JBQTJCLENBQUMsSUFBRDtBQUFBLFFBQ2hDLE1BQU0sS0FBTixFQUNFLElBREYsQ0FDTyxNQURQLEVBRUUsSUFGRixDQUVPLFVBQUMsUUFBRDtBQUFBLFNBQWMsU0FBUyxJQUFULEVBQWQ7QUFBQSxFQUZQLEVBR0UsSUFIRixDQUdPLFVBQUMsSUFBRDtBQUFBLFNBQVUsWUFBWSxjQUFaLENBQTJCLEtBQUssV0FBaEMsRUFBNkMsS0FBSyxTQUFsRCxDQUFWO0FBQUEsRUFIUCxDQURnQztBQUFBLENBQWpDOztBQU1BLElBQU0sd0JBQXlCLFVBQVMsUUFBVCxFQUFtQjtBQUNqRCxLQUFNLFdBQVcsU0FBUyxnQkFBVCxDQUEwQixRQUExQixDQUFqQjtBQUNBLEtBQUksY0FBSjtBQUNBLFFBQU8sWUFBTTtBQUNaLGdDQUE0QixnQkFBNUI7QUFDQSxXQUFTLE9BQVQsQ0FBaUIsVUFBQyxJQUFEO0FBQUEsVUFBVyxLQUFLLEtBQUwsR0FBYSxLQUF4QjtBQUFBLEdBQWpCO0FBQ0EsRUFIRDtBQUlBLENBUDZCLENBTzNCLGFBUDJCLENBQTlCOztBQVNBLElBQU0sYUFBYSxDQUFFLHFCQUFGLEVBQXlCLHdCQUF6QixDQUFuQjtBQUNBLFdBQVcsT0FBWCxDQUFtQixVQUFDLEdBQUQ7QUFBQSxRQUFTLGVBQWUsU0FBZixDQUF5QixHQUF6QixDQUFUO0FBQUEsQ0FBbkI7QUFDQSxZQUFZLE9BQVosQ0FBb0I7QUFBQSxRQUFNLGVBQWUsT0FBZixFQUFOO0FBQUEsQ0FBcEI7O0FBRUEsZUFBZSxPQUFmOzs7OztBQ2xDQSxTQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDekIsS0FBSSxTQUFTLE1BQVQsSUFBbUIsR0FBbkIsSUFBMEIsU0FBUyxNQUFULEdBQWtCLEdBQWhELEVBQXFEO0FBQ3BELFNBQU8sUUFBUSxPQUFSLENBQWdCLFFBQWhCLENBQVA7QUFDQSxFQUZELE1BRU87QUFDTixTQUFPLFFBQVEsTUFBUixDQUFlLElBQUksS0FBSixDQUFVLFNBQVMsVUFBbkIsQ0FBZixDQUFQO0FBQ0E7QUFDRDs7QUFFRCxTQUFTLGNBQVQsR0FBMEI7QUFDekIsUUFBTyxNQUFJLENBQUMsQ0FBQyxLQUFHLEVBQUosSUFBUSxLQUFLLE1BQUwsRUFBUixHQUFzQixDQUF2QixFQUEwQixRQUExQixDQUFtQyxFQUFuQyxDQUFYO0FBQ0E7O0FBR0QsT0FBTyxPQUFQLEdBQWlCLEVBQUUsY0FBRixFQUFVLDhCQUFWLEVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJjbGFzcyBQdWJsaXNoZXIge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycyA9IFtdO1xyXG5cdH1cclxuXHJcblx0ZGVsaXZlcihkYXRhKSB7XHJcblx0XHR0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKGZuKSA9PiBmbihkYXRhKSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdHN1YnNjcmliZShvYnNlcnZlcikge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycy5wdXNoKG9ic2VydmVyKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUHVibGlzaGVyIiwiY2xhc3MgUXVvdGVWaWV3ZXIge1xyXG5cdGNvbnN0cnVjdG9yKGF1dGhvckVsLCBxb3V0ZUVsLCBuZXh0UW91dGVCdG5FbCkge1xyXG5cdFx0dGhpcy5hdXRob3JFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYXV0aG9yRWwpWzBdO1xyXG5cdFx0dGhpcy5xb3V0ZUVsID0gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUocW91dGVFbClbMF07IFxyXG5cdFx0dGhpcy5uZXh0UW91dGVCdG5FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmV4dFFvdXRlQnRuRWwpWzBdO1xyXG5cdH1cclxuXHRkaXNwbGF5TmV3UXV0ZShhdXRob3JOYW1lLCB0ZXh0KSB7XHJcblx0XHR0aGlzLmF1dGhvckVsLmlubmVySFRNTCA9IGF1dGhvck5hbWU7XHJcblx0XHR0aGlzLnFvdXRlRWwuaW5uZXJIVE1MID0gdGV4dDtcclxuXHR9XHJcblx0b25DbGljayhmbikge1xyXG5cdFx0dGhpcy5uZXh0UW91dGVCdG5FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm4pO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBRdW90ZVZpZXdlciIsImNvbnN0IFB1Ymxpc2hlciA9IHJlcXVpcmUoJy4vUHVibGlzaGVyJyk7XHJcbmNvbnN0IFF1b3RlVmlld2VyID0gcmVxdWlyZSgnLi9RdW90ZVZpZXdlcicpO1xyXG5jb25zdCBzdGF0dXMgPSByZXF1aXJlKCcuL3V0aWxzJykuc3RhdHVzO1xyXG5jb25zdCByYW5kb21IZXhDb2xvciA9IHJlcXVpcmUoJy4vdXRpbHMnKS5yYW5kb21IZXhDb2xvcjtcclxuXHJcbmxldCBjbGlja1B1Ymxpc2hlciA9IG5ldyBQdWJsaXNoZXIoKTtcclxubGV0IHF1b3RlVmlld2VyID0gbmV3IFF1b3RlVmlld2VyKCdhdXRob3ItbmFtZScsICd3aWtpLXRleHQnLCAnd2lraS1idXR0b24nKTtcclxuXHJcbmNvbnN0IHVybCA9IGZ1bmN0aW9uKCkge1xyXG5cdGxldCBrZXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwIC0gMSk7XHJcblx0cmV0dXJuIChcclxuXHRcdCdodHRwczovL2NvcnMubm93LnNoL2h0dHBzOi8vYXBpLmZvcmlzbWF0aWMuY29tL2FwaS8xLjAvP21ldGhvZD1nZXRRdW90ZSZmb3JtYXQ9anNvbiZsYW5nPWVuJmNhbGxiYWNrPT8nICsga2V5XHJcblx0KTtcclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlNZXNzYWdlU3Vic2NyaWJlciA9IChkYXRhKSA9PlxyXG5cdGZldGNoKHVybCgpKVxyXG5cdFx0LnRoZW4oc3RhdHVzKVxyXG5cdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcblx0XHQudGhlbigoZGF0YSkgPT4gcXVvdGVWaWV3ZXIuZGlzcGxheU5ld1F1dGUoZGF0YS5xdW90ZUF1dGhvciwgZGF0YS5xdW90ZVRleHQpKTtcclxuXHJcbmNvbnN0IGNoYW5nZUNvbG9yU3Vic2NyaWJlciA9IChmdW5jdGlvbihzZWxlY3Rvcikge1xyXG5cdGNvbnN0IHNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblx0bGV0IHN0eWxlO1xyXG5cdHJldHVybiAoKSA9PiB7XHJcblx0XHRzdHlsZSA9IGBiYWNrZ3JvdW5kLWNvbG9yOiR7cmFuZG9tSGV4Q29sb3IoKX07IHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMXMgbGluZWFyO2A7XHJcblx0XHRzZWxlY3RlZC5mb3JFYWNoKChpdGVtKSA9PiAoaXRlbS5zdHlsZSA9IHN0eWxlKSk7XHJcblx0fTtcclxufSkoJy5qcy1jb2xvcmVkJyk7XHJcblxyXG5jb25zdCBvYnNlcnZzZXJzID0gWyBjaGFuZ2VDb2xvclN1YnNjcmliZXIsIGRpc3BsYXlNZXNzYWdlU3Vic2NyaWJlciBdO1xyXG5vYnNlcnZzZXJzLmZvckVhY2goKG9icykgPT4gY2xpY2tQdWJsaXNoZXIuc3Vic2NyaWJlKG9icykpO1xyXG5xdW90ZVZpZXdlci5vbkNsaWNrKCgpID0+IGNsaWNrUHVibGlzaGVyLmRlbGl2ZXIoKSk7XHJcblxyXG5jbGlja1B1Ymxpc2hlci5kZWxpdmVyKCk7XHJcbiIsImZ1bmN0aW9uIHN0YXR1cyhyZXNwb25zZSkge1xyXG5cdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9tSGV4Q29sb3IoKSB7XHJcblx0cmV0dXJuIFwiI1wiKygoMTw8MjQpKk1hdGgucmFuZG9tKCl8MCkudG9TdHJpbmcoMTYpO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IHN0YXR1cywgcmFuZG9tSGV4Q29sb3J9O1xyXG5cclxuIl19
