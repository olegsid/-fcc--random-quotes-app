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

module.exports = { status, randomHexColor };
