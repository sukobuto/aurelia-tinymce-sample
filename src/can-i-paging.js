import {DummyClient, Pager, BufferedPager, MultiObserver} from 'resources/components'
import {computedFrom, inject, bindable} from 'aurelia-framework'

@inject(MultiObserver)
export class CanIPaging {

	constructor(multiObserver) {
		window.can_i_paging = this;	// debug
		this.client = new DummyClient();
		this.multiObserver = multiObserver;
	}

	async activate() {
		// load in size, paging with reload.
		this.pager = new Pager(10);
		this.subscriptions = [
			this.multiObserver.observe(this.pager, ['offset', 'size'], () => this.load())
		];
		this.load();
		// load all at once, paging only browser-side.
		let res = await this.client.getDummiesAll();
		this.bufferedPager = new BufferedPager(10, res.dummies);
	}

	async load() {
		this.pager.loading = true;
		let res = await this.client.getDummies(this.pager.offset, this.pager.size);
		this.pager.items = res.dummies;
		this.pager.count = res.count;
		this.pager.loading = false;
	}

}