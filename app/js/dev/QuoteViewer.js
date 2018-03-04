class QuoteViewer {
	constructor(authorEl, qouteEl, nextQouteBtnEl) {
		this.authorEl = document.getElementsByClassName(authorEl)[0];
		this.qouteEl =  document.getElementsByClassName(qouteEl)[0]; 
		this.nextQouteBtnEl = document.getElementsByClassName(nextQouteBtnEl)[0];
	}
	displayNewQute(authorName, text) {
		this.authorEl.innerHTML = authorName;
		this.qouteEl.innerHTML = text;
	}
	onClick(fn) {
		this.nextQouteBtnEl.addEventListener("click", fn);
	}
}

module.exports = QuoteViewer