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
var parseXml = require('./utils').parseXml;
var xmlToJson = require('./utils').xmlToJson;

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

function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) {
		// element
		// do attributes
		if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) {
		// text
		obj = xml.nodeValue;
	}

	// do children
	// If just one text node inside
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	} else if (xml.hasChildNodes()) {
		for (var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof obj[nodeName] == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof obj[nodeName].push == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}

function parseXml(xmlStr) {
	return new window.DOMParser().parseFromString(xmlStr, "text/xml");
}

module.exports = { status: status, randomHexColor: randomHexColor, xmlToJson: xmlToJson, parseXml: parseXml };

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1B1Ymxpc2hlci5qcyIsImFwcC9qcy9kZXYvUXVvdGVWaWV3ZXIuanMiLCJhcHAvanMvZGV2L21haW4uanMiLCJhcHAvanMvZGV2L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sUztBQUNMLHNCQUFjO0FBQUE7O0FBQ2IsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7MEJBRU8sSSxFQUFNO0FBQ2IsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFdBQVEsR0FBRyxJQUFILENBQVI7QUFBQSxJQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7NEJBRVMsUSxFQUFVO0FBQ25CLFFBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixRQUF0QjtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsU0FBakI7Ozs7Ozs7OztJQ2ZNLFc7QUFDTCxzQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLGNBQS9CLEVBQStDO0FBQUE7O0FBQzlDLE9BQUssUUFBTCxHQUFnQixTQUFTLHNCQUFULENBQWdDLFFBQWhDLEVBQTBDLENBQTFDLENBQWhCO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsRUFBeUMsQ0FBekMsQ0FBaEI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF0QjtBQUNBOzs7O2lDQUNjLFUsRUFBWSxJLEVBQU07QUFDaEMsUUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNBLFFBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsSUFBekI7QUFDQTs7OzBCQUNPLEUsRUFBSTtBQUNYLFFBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOEMsRUFBOUM7QUFDQTs7Ozs7O0FBR0YsT0FBTyxPQUFQLEdBQWlCLFdBQWpCOzs7OztBQ2ZBLElBQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7QUFDQSxJQUFNLGNBQWMsUUFBUSxlQUFSLENBQXBCO0FBQ0EsSUFBTSxTQUFTLFFBQVEsU0FBUixFQUFtQixNQUFsQztBQUNBLElBQU0saUJBQWlCLFFBQVEsU0FBUixFQUFtQixjQUExQztBQUNBLElBQU0sV0FBVyxRQUFRLFNBQVIsRUFBbUIsUUFBcEM7QUFDQSxJQUFNLFlBQVksUUFBUSxTQUFSLEVBQW1CLFNBQXJDOztBQUVBLElBQUksaUJBQWlCLElBQUksU0FBSixFQUFyQjtBQUNBLElBQUksY0FBYyxJQUFJLFdBQUosQ0FBZ0IsYUFBaEIsRUFBK0IsV0FBL0IsRUFBNEMsYUFBNUMsQ0FBbEI7O0FBRUEsSUFBTSxNQUFNLFNBQU4sR0FBTSxHQUFXO0FBQ3RCLEtBQUksTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsT0FBaEIsR0FBMEIsQ0FBckMsQ0FBVjtBQUNBLFFBQ0MsMkdBQTJHLEdBRDVHO0FBR0EsQ0FMRDs7QUFPQSxJQUFNLDJCQUEyQixTQUEzQix3QkFBMkIsQ0FBQyxJQUFEO0FBQUEsUUFDaEMsTUFBTSxLQUFOLEVBQ0UsSUFERixDQUNPLE1BRFAsRUFFRSxJQUZGLENBRU8sVUFBQyxRQUFEO0FBQUEsU0FBYyxTQUFTLElBQVQsRUFBZDtBQUFBLEVBRlAsRUFHRSxJQUhGLENBR08sVUFBQyxJQUFEO0FBQUEsU0FBVSxZQUFZLGNBQVosQ0FBMkIsS0FBSyxXQUFoQyxFQUE2QyxLQUFLLFNBQWxELENBQVY7QUFBQSxFQUhQLENBRGdDO0FBQUEsQ0FBakM7O0FBTUEsSUFBTSx3QkFBeUIsVUFBUyxRQUFULEVBQW1CO0FBQ2pELEtBQU0sV0FBVyxTQUFTLGdCQUFULENBQTBCLFFBQTFCLENBQWpCO0FBQ0EsS0FBSSxjQUFKO0FBQ0EsUUFBTyxZQUFNO0FBQ1osZ0NBQTRCLGdCQUE1QjtBQUNBLFdBQVMsT0FBVCxDQUFpQixVQUFDLElBQUQ7QUFBQSxVQUFXLEtBQUssS0FBTCxHQUFhLEtBQXhCO0FBQUEsR0FBakI7QUFDQSxFQUhEO0FBSUEsQ0FQNkIsQ0FPM0IsYUFQMkIsQ0FBOUI7O0FBU0EsSUFBTSxhQUFhLENBQUUscUJBQUYsRUFBeUIsd0JBQXpCLENBQW5CO0FBQ0EsV0FBVyxPQUFYLENBQW1CLFVBQUMsR0FBRDtBQUFBLFFBQVMsZUFBZSxTQUFmLENBQXlCLEdBQXpCLENBQVQ7QUFBQSxDQUFuQjtBQUNBLFlBQVksT0FBWixDQUFvQjtBQUFBLFFBQU0sZUFBZSxPQUFmLEVBQU47QUFBQSxDQUFwQjs7QUFFQSxlQUFlLE9BQWY7Ozs7O0FDcENBLFNBQVMsTUFBVCxDQUFnQixRQUFoQixFQUEwQjtBQUN6QixLQUFJLFNBQVMsTUFBVCxJQUFtQixHQUFuQixJQUEwQixTQUFTLE1BQVQsR0FBa0IsR0FBaEQsRUFBcUQ7QUFDcEQsU0FBTyxRQUFRLE9BQVIsQ0FBZ0IsUUFBaEIsQ0FBUDtBQUNBLEVBRkQsTUFFTztBQUNOLFNBQU8sUUFBUSxNQUFSLENBQWUsSUFBSSxLQUFKLENBQVUsU0FBUyxVQUFuQixDQUFmLENBQVA7QUFDQTtBQUNEOztBQUVELFNBQVMsY0FBVCxHQUEwQjtBQUN6QixRQUFPLE1BQUksQ0FBQyxDQUFDLEtBQUcsRUFBSixJQUFRLEtBQUssTUFBTCxFQUFSLEdBQXNCLENBQXZCLEVBQTBCLFFBQTFCLENBQW1DLEVBQW5DLENBQVg7QUFDQTs7QUFFRCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7O0FBRXZCO0FBQ0EsS0FBSSxNQUFNLEVBQVY7O0FBRUEsS0FBSSxJQUFJLFFBQUosSUFBZ0IsQ0FBcEIsRUFBdUI7QUFBRTtBQUN4QjtBQUNBLE1BQUksSUFBSSxVQUFKLENBQWUsTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUMvQixPQUFJLGFBQUosSUFBcUIsRUFBckI7QUFDQyxRQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksSUFBSSxVQUFKLENBQWUsTUFBbkMsRUFBMkMsR0FBM0MsRUFBZ0Q7QUFDL0MsUUFBSSxZQUFZLElBQUksVUFBSixDQUFlLElBQWYsQ0FBb0IsQ0FBcEIsQ0FBaEI7QUFDQSxRQUFJLGFBQUosRUFBbUIsVUFBVSxRQUE3QixJQUF5QyxVQUFVLFNBQW5EO0FBQ0E7QUFDRDtBQUNELEVBVEQsTUFTTyxJQUFJLElBQUksUUFBSixJQUFnQixDQUFwQixFQUF1QjtBQUFFO0FBQy9CLFFBQU0sSUFBSSxTQUFWO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBLEtBQUksSUFBSSxhQUFKLE1BQXVCLElBQUksVUFBSixDQUFlLE1BQWYsS0FBMEIsQ0FBakQsSUFBc0QsSUFBSSxVQUFKLENBQWUsQ0FBZixFQUFrQixRQUFsQixLQUErQixDQUF6RixFQUE0RjtBQUMzRixRQUFNLElBQUksVUFBSixDQUFlLENBQWYsRUFBa0IsU0FBeEI7QUFDQSxFQUZELE1BR0ssSUFBSSxJQUFJLGFBQUosRUFBSixFQUF5QjtBQUM3QixPQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxJQUFJLFVBQUosQ0FBZSxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUM5QyxPQUFJLE9BQU8sSUFBSSxVQUFKLENBQWUsSUFBZixDQUFvQixDQUFwQixDQUFYO0FBQ0EsT0FBSSxXQUFXLEtBQUssUUFBcEI7QUFDQSxPQUFJLE9BQU8sSUFBSSxRQUFKLENBQVAsSUFBeUIsV0FBN0IsRUFBMEM7QUFDekMsUUFBSSxRQUFKLElBQWdCLFVBQVUsSUFBVixDQUFoQjtBQUNBLElBRkQsTUFFTztBQUNOLFFBQUksT0FBTyxJQUFJLFFBQUosRUFBYyxJQUFyQixJQUE4QixXQUFsQyxFQUErQztBQUM5QyxTQUFJLE1BQU0sSUFBSSxRQUFKLENBQVY7QUFDQSxTQUFJLFFBQUosSUFBZ0IsRUFBaEI7QUFDQSxTQUFJLFFBQUosRUFBYyxJQUFkLENBQW1CLEdBQW5CO0FBQ0E7QUFDRCxRQUFJLFFBQUosRUFBYyxJQUFkLENBQW1CLFVBQVUsSUFBVixDQUFuQjtBQUNBO0FBQ0Q7QUFDRDtBQUNELFFBQU8sR0FBUDtBQUNBOztBQUVELFNBQVMsUUFBVCxDQUFrQixNQUFsQixFQUEwQjtBQUN2QixRQUFPLElBQUksT0FBTyxTQUFYLEdBQXVCLGVBQXZCLENBQXVDLE1BQXZDLEVBQStDLFVBQS9DLENBQVA7QUFDRjs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsRUFBRSxjQUFGLEVBQVUsOEJBQVYsRUFBMEIsb0JBQTFCLEVBQXFDLGtCQUFyQyxFQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiY2xhc3MgUHVibGlzaGVyIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuc3Vic2NyaWJlcnMgPSBbXTtcclxuXHR9XHJcblxyXG5cdGRlbGl2ZXIoZGF0YSkge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcclxuXHRcdHRoaXMuc3Vic2NyaWJlcnMucHVzaChvYnNlcnZlcik7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFB1Ymxpc2hlciIsImNsYXNzIFF1b3RlVmlld2VyIHtcclxuXHRjb25zdHJ1Y3RvcihhdXRob3JFbCwgcW91dGVFbCwgbmV4dFFvdXRlQnRuRWwpIHtcclxuXHRcdHRoaXMuYXV0aG9yRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGF1dGhvckVsKVswXTtcclxuXHRcdHRoaXMucW91dGVFbCA9ICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHFvdXRlRWwpWzBdOyBcclxuXHRcdHRoaXMubmV4dFFvdXRlQnRuRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5leHRRb3V0ZUJ0bkVsKVswXTtcclxuXHR9XHJcblx0ZGlzcGxheU5ld1F1dGUoYXV0aG9yTmFtZSwgdGV4dCkge1xyXG5cdFx0dGhpcy5hdXRob3JFbC5pbm5lckhUTUwgPSBhdXRob3JOYW1lO1xyXG5cdFx0dGhpcy5xb3V0ZUVsLmlubmVySFRNTCA9IHRleHQ7XHJcblx0fVxyXG5cdG9uQ2xpY2soZm4pIHtcclxuXHRcdHRoaXMubmV4dFFvdXRlQnRuRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZuKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUXVvdGVWaWV3ZXIiLCJjb25zdCBQdWJsaXNoZXIgPSByZXF1aXJlKCcuL1B1Ymxpc2hlcicpO1xyXG5jb25zdCBRdW90ZVZpZXdlciA9IHJlcXVpcmUoJy4vUXVvdGVWaWV3ZXInKTtcclxuY29uc3Qgc3RhdHVzID0gcmVxdWlyZSgnLi91dGlscycpLnN0YXR1cztcclxuY29uc3QgcmFuZG9tSGV4Q29sb3IgPSByZXF1aXJlKCcuL3V0aWxzJykucmFuZG9tSGV4Q29sb3I7XHJcbmNvbnN0IHBhcnNlWG1sID0gcmVxdWlyZSgnLi91dGlscycpLnBhcnNlWG1sO1xyXG5jb25zdCB4bWxUb0pzb24gPSByZXF1aXJlKCcuL3V0aWxzJykueG1sVG9Kc29uO1xyXG5cclxubGV0IGNsaWNrUHVibGlzaGVyID0gbmV3IFB1Ymxpc2hlcigpO1xyXG5sZXQgcXVvdGVWaWV3ZXIgPSBuZXcgUXVvdGVWaWV3ZXIoJ2F1dGhvci1uYW1lJywgJ3dpa2ktdGV4dCcsICd3aWtpLWJ1dHRvbicpO1xyXG5cclxuY29uc3QgdXJsID0gZnVuY3Rpb24oKSB7XHJcblx0bGV0IGtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAgLSAxKTtcclxuXHRyZXR1cm4gKFxyXG5cdFx0J2h0dHBzOi8vY29ycy5ub3cuc2gvaHR0cHM6Ly9hcGkuZm9yaXNtYXRpYy5jb20vYXBpLzEuMC8/bWV0aG9kPWdldFF1b3RlJmZvcm1hdD1qc29uJmxhbmc9ZW4mY2FsbGJhY2s9PycgKyBrZXlcclxuXHQpO1xyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheU1lc3NhZ2VTdWJzY3JpYmVyID0gKGRhdGEpID0+XHJcblx0ZmV0Y2godXJsKCkpXHJcblx0XHQudGhlbihzdGF0dXMpXHJcblx0XHQudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcclxuXHRcdC50aGVuKChkYXRhKSA9PiBxdW90ZVZpZXdlci5kaXNwbGF5TmV3UXV0ZShkYXRhLnF1b3RlQXV0aG9yLCBkYXRhLnF1b3RlVGV4dCkpO1xyXG5cclxuY29uc3QgY2hhbmdlQ29sb3JTdWJzY3JpYmVyID0gKGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcblx0Y29uc3Qgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHRsZXQgc3R5bGU7XHJcblx0cmV0dXJuICgpID0+IHtcclxuXHRcdHN0eWxlID0gYGJhY2tncm91bmQtY29sb3I6JHtyYW5kb21IZXhDb2xvcigpfTsgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAxcyBsaW5lYXI7YDtcclxuXHRcdHNlbGVjdGVkLmZvckVhY2goKGl0ZW0pID0+IChpdGVtLnN0eWxlID0gc3R5bGUpKTtcclxuXHR9O1xyXG59KSgnLmpzLWNvbG9yZWQnKTtcclxuXHJcbmNvbnN0IG9ic2VydnNlcnMgPSBbIGNoYW5nZUNvbG9yU3Vic2NyaWJlciwgZGlzcGxheU1lc3NhZ2VTdWJzY3JpYmVyIF07XHJcbm9ic2VydnNlcnMuZm9yRWFjaCgob2JzKSA9PiBjbGlja1B1Ymxpc2hlci5zdWJzY3JpYmUob2JzKSk7XHJcbnF1b3RlVmlld2VyLm9uQ2xpY2soKCkgPT4gY2xpY2tQdWJsaXNoZXIuZGVsaXZlcigpKTtcclxuXHJcbmNsaWNrUHVibGlzaGVyLmRlbGl2ZXIoKTtcclxuIiwiZnVuY3Rpb24gc3RhdHVzKHJlc3BvbnNlKSB7XHJcblx0aWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByYW5kb21IZXhDb2xvcigpIHtcclxuXHRyZXR1cm4gXCIjXCIrKCgxPDwyNCkqTWF0aC5yYW5kb20oKXwwKS50b1N0cmluZygxNik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHhtbFRvSnNvbih4bWwpIHtcclxuXHJcblx0Ly8gQ3JlYXRlIHRoZSByZXR1cm4gb2JqZWN0XHJcblx0dmFyIG9iaiA9IHt9O1xyXG5cclxuXHRpZiAoeG1sLm5vZGVUeXBlID09IDEpIHsgLy8gZWxlbWVudFxyXG5cdFx0Ly8gZG8gYXR0cmlidXRlc1xyXG5cdFx0aWYgKHhtbC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuXHRcdG9ialtcIkBhdHRyaWJ1dGVzXCJdID0ge307XHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgeG1sLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHR2YXIgYXR0cmlidXRlID0geG1sLmF0dHJpYnV0ZXMuaXRlbShqKTtcclxuXHRcdFx0XHRvYmpbXCJAYXR0cmlidXRlc1wiXVthdHRyaWJ1dGUubm9kZU5hbWVdID0gYXR0cmlidXRlLm5vZGVWYWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoeG1sLm5vZGVUeXBlID09IDMpIHsgLy8gdGV4dFxyXG5cdFx0b2JqID0geG1sLm5vZGVWYWx1ZTtcclxuXHR9XHJcblxyXG5cdC8vIGRvIGNoaWxkcmVuXHJcblx0Ly8gSWYganVzdCBvbmUgdGV4dCBub2RlIGluc2lkZVxyXG5cdGlmICh4bWwuaGFzQ2hpbGROb2RlcygpICYmIHhtbC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJiB4bWwuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gMykge1xyXG5cdFx0b2JqID0geG1sLmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlO1xyXG5cdH1cclxuXHRlbHNlIGlmICh4bWwuaGFzQ2hpbGROb2RlcygpKSB7XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgeG1sLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB4bWwuY2hpbGROb2Rlcy5pdGVtKGkpO1xyXG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBpdGVtLm5vZGVOYW1lO1xyXG5cdFx0XHRpZiAodHlwZW9mKG9ialtub2RlTmFtZV0pID09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRvYmpbbm9kZU5hbWVdID0geG1sVG9Kc29uKGl0ZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh0eXBlb2Yob2JqW25vZGVOYW1lXS5wdXNoKSA9PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHR2YXIgb2xkID0gb2JqW25vZGVOYW1lXTtcclxuXHRcdFx0XHRcdG9ialtub2RlTmFtZV0gPSBbXTtcclxuXHRcdFx0XHRcdG9ialtub2RlTmFtZV0ucHVzaChvbGQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRvYmpbbm9kZU5hbWVdLnB1c2goeG1sVG9Kc29uKGl0ZW0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVhtbCh4bWxTdHIpIHtcclxuICAgcmV0dXJuIG5ldyB3aW5kb3cuRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHhtbFN0ciwgXCJ0ZXh0L3htbFwiKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IHN0YXR1cywgcmFuZG9tSGV4Q29sb3IsIHhtbFRvSnNvbiwgcGFyc2VYbWwgfTtcclxuXHJcbiJdfQ==
