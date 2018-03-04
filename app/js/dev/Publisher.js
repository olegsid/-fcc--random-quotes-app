class Publisher {
	constructor() {
		this.subscribers = [];
	}

	deliver(data) {
		this.subscribers.forEach((fn) => fn(data));
		return this;
	}

	subscribe(observer) {
		this.subscribers.push(observer);
	}
}

module.exports = Publisher