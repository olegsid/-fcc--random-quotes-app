class QuoteViewer {
	constructor(authorEl, qouteEl, nextQouteBtnEl, tweetBtnEl) {
		this.authorEl = document.getElementsByClassName(authorEl)[0];
		this.qouteEl =  document.getElementsByClassName(qouteEl)[0]; 
		this.nextQouteBtnEl = document.getElementsByClassName(nextQouteBtnEl)[0];
		this.tweetBtnEl = document.getElementsByClassName(tweetBtnEl)[0];
	}
	displayNewQoute(authorName, text) {
		this.authorEl.innerHTML = authorName;
		this.qouteEl.innerHTML = text;
	}

	setTweet(link){
		this.tweetBtnEl.setAttribute('href', link)
	}

	onClick(fn) {
		this.nextQouteBtnEl.addEventListener("click", fn);
	}
}

module.exports = QuoteViewer