export class Toaster {

	items = [];

	constructor() {
		window.toaster = this;
		setInterval(() => {
			this.items = this.items.filter(item => item.alive);
		}, 200);
	}

	toast(type, message, ttl = 3000) {
		let item = new ToasterItem(type, message, ttl);
		this.items.unshift(item.show());
	}

}

class ToasterItem {

	constructor(type, message, ttl = 3000) {
		this.type = type;
		this.message = message;
		this.shown = false;
		this.alive = true;
		this.ttl = ttl;
	}

	show() {
		setTimeout(() => this.shown = true, 10);
		setTimeout(() => this.shown = false, this.ttl);
		setTimeout(() => this.alive = false, this.ttl + 500);
		return this;
	}

}