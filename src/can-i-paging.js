import {DummyClient, Pager, BufferedPager, MultiObserver} from 'resources/components'
import {computedFrom, inject, bindable} from 'aurelia-framework'

@inject(MultiObserver)
export class CanIPaging {

	constructor(multiObserver) {
		window.can_i_paging = this;	// debug
		this.client = new DummyClient();
		this.bufferedPager = new BufferedPager(10, []);
		this.pager = new Pager(10);
		multiObserver.observe(this.pager, ['offset', 'size'], () => this.load())
	}

	activate() {
		// load in size, paging with reload.
		this.load();
		(async () => {
			// load all at once, paging only browser-side.
			let res = await this.client.getDummiesAll();
			this.bufferedPager.allItems = res.dummies;
		})();
	}

	async load() {
		this.pager.loading = true;
		let res = await this.client.getDummies(this.pager.offset, this.pager.size);
		this.pager.items = res.dummies;
		this.pager.count = res.count;
		this.pager.loading = false;
	}

}