import {inject, bindable} from "aurelia-framework";
import {ObserverLocator} from "aurelia-binding";

@inject(ObserverLocator)
export class PagerUi {

	/**
	 * @type {Pager}
	 */
	@bindable pager;
	page = 1;

	constructor(observerLocator) {
		this.observerLocator = observerLocator;
	}

	attached() {
		this.page = this.pager.page;
		this.subscription = this.observerLocator
			.getObserver(this.pager, 'page')
			.subscribe(newValue => {
				if (this.page !== newValue) this.page = newValue;
			});
	}

	first() {
		this.pager.goTo(1)
	}

	prev() {
		this.pager.goTo(this.pager.page - 1)
	}

	next() {
		this.pager.goTo(this.pager.page + 1)
	}

	last() {
		this.pager.goTo(this.pager.pages)
	}

	inputted() {
		this.pager.goTo(+this.page)
	}

}