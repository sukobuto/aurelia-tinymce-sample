import {inject} from 'aurelia-framework'
import {Toaster} from 'resources/toaster'

@inject(Toaster)
export class LetsToast {

	types = ['info', 'success', 'warning', 'error'];
	type = 'info';
	message = "Type something!";

	constructor(toaster) {
		this.toaster = toaster
	}

	toast() {
		this.toaster.toast(this.type, this.message);
	}

}
