export class Toaster {

	items = [];

	constructor() {
		window.toaster = this;
	}

	info(message, ttl = 3000) {
		this.items.push(new ToasterItem(message, ttl))
	}

}

class ToasterItem {

	constructor(message, ttl = 3000) {
		this.message = message;
		this.shown = true;
		setTimeout(() => this.shown = false, ttl);
	}

}