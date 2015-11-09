export class ToasterItem {

	icons = {
		info: null,
		success: 'check-circle',
		warning: 'warning',
		danger: 'times-circle'
	};

	constructor(type, title, message, ttl = 3000, afterClose = null) {
		this.type = type;
		this.title = title;
		this.message = message;
		this.shown = false;
		this.closing = false;
		this.ttl = ttl;
		this.afterClose = afterClose;
	}

	attached() {
		setTimeout(() => this.shown = true, 10);
		setTimeout(() => this.close(), this.ttl);
	}

	close() {
		if (this.closing) return this;
		this.shown = false;
		this.closing = true;
		if (this.afterClose) setTimeout(this.afterClose, 500);
		return this;
	}

}
