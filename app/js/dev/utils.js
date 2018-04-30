function status(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function randomHexColor() {
	return "#"+((1<<24)*Math.random()|0).toString(16);
}

function transformToTweet(tweet){
	let endpoint = 'https://twitter.com/intent/tweet?text=';
	let endocodedTweet = encodeURIComponent(tweet);
	return `${endpoint}${endocodedTweet}`
}
	

module.exports = { status, randomHexColor, transformToTweet};

