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
	return 'http://cors-proxy.htmldriven.com/?url=https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&callback=?' + key;
};

var displayMessage = function displayMessage(data) {
	return fetch(url()).then(status).then(function (response) {
		return response.json();
	}).then(function (data) {
		return xmlToJson(parseXml(data.body));
	}).then(function (obj) {
		return quoteViewer.displayNewQute(obj.forismatic.quote.quoteAuthor, obj.forismatic.quote.quoteText);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvZGV2L1B1Ymxpc2hlci5qcyIsImFwcC9qcy9kZXYvUXVvdGVWaWV3ZXIuanMiLCJhcHAvanMvZGV2L21haW4uanMiLCJhcHAvanMvZGV2L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDQU0sUztBQUNMLHNCQUFjO0FBQUE7O0FBQ2IsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7MEJBRU8sSSxFQUFNO0FBQ2IsUUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFVBQUMsRUFBRDtBQUFBLFdBQVEsR0FBRyxJQUFILENBQVI7QUFBQSxJQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBOzs7NEJBRVMsUSxFQUFVO0FBQ25CLFFBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixRQUF0QjtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsU0FBakI7Ozs7Ozs7OztJQ2ZNLFc7QUFDTCxzQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLGNBQS9CLEVBQStDO0FBQUE7O0FBQzlDLE9BQUssUUFBTCxHQUFnQixTQUFTLHNCQUFULENBQWdDLFFBQWhDLEVBQTBDLENBQTFDLENBQWhCO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLFNBQVMsc0JBQVQsQ0FBZ0MsT0FBaEMsRUFBeUMsQ0FBekMsQ0FBaEI7QUFDQSxPQUFLLGNBQUwsR0FBc0IsU0FBUyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF0QjtBQUNBOzs7O2lDQUNjLFUsRUFBWSxJLEVBQU07QUFDaEMsUUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixVQUExQjtBQUNBLFFBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsSUFBekI7QUFDQTs7OzBCQUNPLEUsRUFBSTtBQUNYLFFBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOEMsRUFBOUM7QUFDQTs7Ozs7O0FB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QWtCLE1BQWxCLEVBQTBCO0FBQ3ZCLFFBQU8sSUFBSSxPQUFPLFNBQVgsR0FBdUIsZUFBdkIsQ0FBdUMsTUFBdkMsRUFBK0MsVUFBL0MsQ0FBUDtBQUNGOztBQUVELE9BQU8sT0FBUCxHQUFpQixFQUFFLGNBQUYsRUFBVSw4QkFBVixFQUEwQixvQkFBMUIsRUFBcUMsa0JBQXJDLEVBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJjbGFzcyBQdWJsaXNoZXIge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycyA9IFtdO1xyXG5cdH1cclxuXHJcblx0ZGVsaXZlcihkYXRhKSB7XHJcblx0XHR0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKGZuKSA9PiBmbihkYXRhKSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdHN1YnNjcmliZShvYnNlcnZlcikge1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycy5wdXNoKG9ic2VydmVyKTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUHVibGlzaGVyIiwiY2xhc3MgUXVvdGVWaWV3ZXIge1xyXG5cdGNvbnN0cnVjdG9yKGF1dGhvckVsLCBxb3V0ZUVsLCBuZXh0UW91dGVCdG5FbCkge1xyXG5cdFx0dGhpcy5hdXRob3JFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYXV0aG9yRWwpWzBdO1xyXG5cdFx0dGhpcy5xb3V0ZUVsID0gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUocW91dGVFbClbMF07IFxyXG5cdFx0dGhpcy5uZXh0UW91dGVCdG5FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmV4dFFvdXRlQnRuRWwpWzBdO1xyXG5cdH1cclxuXHRkaXNwbGF5TmV3UXV0ZShhdXRob3JOYW1lLCB0ZXh0KSB7XHJcblx0XHR0aGlzLmF1dGhvckVsLmlubmVySFRNTCA9IGF1dGhvck5hbWU7XHJcblx0XHR0aGlzLnFvdXRlRWwuaW5uZXJIVE1MID0gdGV4dDtcclxuXHR9XHJcblx0b25DbGljayhmbikge1xyXG5cdFx0dGhpcy5uZXh0UW91dGVCdG5FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm4pO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBRdW90ZVZpZXdlciIsImNvbnN0IFB1Ymxpc2hlciA9IHJlcXVpcmUoJy4vUHVibGlzaGVyJyk7XHJcbmNvbnN0IFF1b3RlVmlld2VyID0gcmVxdWlyZSgnLi9RdW90ZVZpZXdlcicpO1xyXG5jb25zdCBzdGF0dXMgPSByZXF1aXJlKCcuL3V0aWxzJykuc3RhdHVzO1xyXG5jb25zdCByYW5kb21IZXhDb2xvciA9IHJlcXVpcmUoJy4vdXRpbHMnKS5yYW5kb21IZXhDb2xvcjtcclxuY29uc3QgcGFyc2VYbWwgPSByZXF1aXJlKCcuL3V0aWxzJykucGFyc2VYbWw7XHJcbmNvbnN0IHhtbFRvSnNvbiA9IHJlcXVpcmUoJy4vdXRpbHMnKS54bWxUb0pzb247XHJcblxyXG5sZXQgY2xpY2tQdWJsaXNoZXIgPSBuZXcgUHVibGlzaGVyKCk7XHJcbmxldCBxdW90ZVZpZXdlciA9IG5ldyBRdW90ZVZpZXdlcignYXV0aG9yLW5hbWUnLCAnd2lraS10ZXh0JywgJ3dpa2ktYnV0dG9uJyk7XHJcblxyXG5jb25zdCB1cmwgPSBmdW5jdGlvbigpIHtcclxuXHRsZXQga2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCAtIDEpO1xyXG5cdHJldHVybiAoXHJcblx0XHQnaHR0cDovL2NvcnMtcHJveHkuaHRtbGRyaXZlbi5jb20vP3VybD1odHRwczovL2FwaS5mb3Jpc21hdGljLmNvbS9hcGkvMS4wLz9tZXRob2Q9Z2V0UXVvdGUmZm9ybWF0PWpzb25wJmxhbmc9ZW4mY2FsbGJhY2s9PycgK1xyXG5cdFx0a2V5XHJcblx0KTtcclxufTtcclxuXHJcblxyXG5jb25zdCBkaXNwbGF5TWVzc2FnZSA9ICggZGF0YSApID0+XHJcblx0ZmV0Y2godXJsKCkpXHJcblx0XHQudGhlbiggc3RhdHVzIClcclxuXHRcdC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcblx0XHQudGhlbiggZGF0YSA9PiB4bWxUb0pzb24oIHBhcnNlWG1sKGRhdGEuYm9keSkgKSApXHJcblx0XHQudGhlbiggb2JqID0+IHF1b3RlVmlld2VyLmRpc3BsYXlOZXdRdXRlKG9iai5mb3Jpc21hdGljLnF1b3RlLnF1b3RlQXV0aG9yLCBvYmouZm9yaXNtYXRpYy5xdW90ZS5xdW90ZVRleHQpKVxyXG5cclxuY29uc3QgY29sb3JTdWJzY3JpYmVyID0gKCBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XHJcblx0Y29uc3QgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcblx0cmV0dXJuICgpID0+IChhcHAuc3R5bGUgPSBgYmFja2dyb3VuZC1jb2xvcjoke3JhbmRvbUhleENvbG9yKCl9OyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDFzIGxpbmVhcjtgKTtcclxufSkoJ2JvZHknKTtcclxuXHJcbmNvbnN0IG9ic2VydnNlcnMgPSBbIGNvbG9yU3Vic2NyaWJlciwgZGlzcGxheU1lc3NhZ2UgXTtcclxub2JzZXJ2c2Vycy5mb3JFYWNoKChvYnMpID0+IGNsaWNrUHVibGlzaGVyLnN1YnNjcmliZShvYnMpKTtcclxucXVvdGVWaWV3ZXIub25DbGljaygoKSA9PiBjbGlja1B1Ymxpc2hlci5kZWxpdmVyKCkpO1xyXG5cclxuY2xpY2tQdWJsaXNoZXIuZGVsaXZlcigpO1xyXG4iLCJmdW5jdGlvbiBzdGF0dXMocmVzcG9uc2UpIHtcclxuXHRpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUhleENvbG9yKCkge1xyXG5cdHJldHVybiBcIiNcIisoKDE8PDI0KSpNYXRoLnJhbmRvbSgpfDApLnRvU3RyaW5nKDE2KTtcclxufVxyXG5cclxuZnVuY3Rpb24geG1sVG9Kc29uKHhtbCkge1xyXG5cclxuXHQvLyBDcmVhdGUgdGhlIHJldHVybiBvYmplY3RcclxuXHR2YXIgb2JqID0ge307XHJcblxyXG5cdGlmICh4bWwubm9kZVR5cGUgPT0gMSkgeyAvLyBlbGVtZW50XHJcblx0XHQvLyBkbyBhdHRyaWJ1dGVzXHJcblx0XHRpZiAoeG1sLmF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0b2JqW1wiQGF0dHJpYnV0ZXNcIl0gPSB7fTtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB4bWwuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHZhciBhdHRyaWJ1dGUgPSB4bWwuYXR0cmlidXRlcy5pdGVtKGopO1xyXG5cdFx0XHRcdG9ialtcIkBhdHRyaWJ1dGVzXCJdW2F0dHJpYnV0ZS5ub2RlTmFtZV0gPSBhdHRyaWJ1dGUubm9kZVZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmICh4bWwubm9kZVR5cGUgPT0gMykgeyAvLyB0ZXh0XHJcblx0XHRvYmogPSB4bWwubm9kZVZhbHVlO1xyXG5cdH1cclxuXHJcblx0Ly8gZG8gY2hpbGRyZW5cclxuXHQvLyBJZiBqdXN0IG9uZSB0ZXh0IG5vZGUgaW5zaWRlXHJcblx0aWYgKHhtbC5oYXNDaGlsZE5vZGVzKCkgJiYgeG1sLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICYmIHhtbC5jaGlsZE5vZGVzWzBdLm5vZGVUeXBlID09PSAzKSB7XHJcblx0XHRvYmogPSB4bWwuY2hpbGROb2Rlc1swXS5ub2RlVmFsdWU7XHJcblx0fVxyXG5cdGVsc2UgaWYgKHhtbC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB4bWwuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHhtbC5jaGlsZE5vZGVzLml0ZW0oaSk7XHJcblx0XHRcdHZhciBub2RlTmFtZSA9IGl0ZW0ubm9kZU5hbWU7XHJcblx0XHRcdGlmICh0eXBlb2Yob2JqW25vZGVOYW1lXSkgPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdG9ialtub2RlTmFtZV0gPSB4bWxUb0pzb24oaXRlbSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZihvYmpbbm9kZU5hbWVdLnB1c2gpID09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdHZhciBvbGQgPSBvYmpbbm9kZU5hbWVdO1xyXG5cdFx0XHRcdFx0b2JqW25vZGVOYW1lXSA9IFtdO1xyXG5cdFx0XHRcdFx0b2JqW25vZGVOYW1lXS5wdXNoKG9sZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG9ialtub2RlTmFtZV0ucHVzaCh4bWxUb0pzb24oaXRlbSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlWG1sKHhtbFN0cikge1xyXG4gICByZXR1cm4gbmV3IHdpbmRvdy5ET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoeG1sU3RyLCBcInRleHQveG1sXCIpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgc3RhdHVzLCByYW5kb21IZXhDb2xvciwgeG1sVG9Kc29uLCBwYXJzZVhtbCB9O1xyXG5cclxuIl19
