import {ToasterItem} from './toaster-item'

export class Toaster {

	items = [];

	toast(type, title, message, ttl = 3000) {
		this.items.unshift(new ToasterItem(type, title, message, ttl));
	}

	info(title, message) {
		this.toast('info', title, message);
	}

	success(title, message) {
		this.toast('success', title, message);
	}

	warning(title, message) {
		this.toast('warning', title, message);
	}

	danger(title, message) {
		this.toast('danger', title, message);
	}

	error(message) {
		this.toast('danger', 'Error', message);
	}

}
