import Enumerable from 'linq'
import {computedFrom, transient, inject} from 'aurelia-framework'
import {ObserverLocator} from "aurelia-binding"

export class DummyClient {

	getDummies(offset, size) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve({
					count: 10000,
					dummies: Enumerable.range(offset + 1, size, 1)
							.select(x => ({
								name: `item-${x}`,
								times_of_three: x % 3 === 0
							}))
							.toArray()
				})
			}, 200);
		});
	}

	getDummiesAll() {
		return new Promise(resolve => {
			resolve({
				dummies: Enumerable.range(1, 200, 1)
					.select(x => ({
						name: `item-${x}`,
						times_of_three: x % 3 === 0
					}))
					.toArray()
			})
		})
	}

}

@inject(ObserverLocator)
export class MultiObserver {

	constructor(observerLocator) {
		this.observerLocator = observerLocator;
	}

	/**
	 * @param {Object} defaultObject
	 * @param {Array} properties
	 * @param {Function} callback
	 * @returns {Function}
	 */
	observe(defaultObject, properties, callback) {
		var subscriptions = [], subscription, i = properties.length, object, propertyName;
		while (i--) {
			if (typeof properties[i] === 'string') {
				object = defaultObject;
				propertyName = properties[i];
			} else {
				object = properties[i][0];
				propertyName = properties[i][1];
			}
			subscription = this.observerLocator
				.getObserver(object, propertyName)
				.subscribe(callback);
			subscriptions.push(subscription);
		}
		return () => {
			while (subscriptions.length) {
				subscriptions.pop()();
			}
		}
	}

}

export class Pager {

	loading = false;
	count = 0;
	page = 1;
	_items = [];

	constructor(size = 20) {
		this.size = size;
	}

	@computedFrom('count', 'size')
	get pages() {
		let pages = Math.ceil(this.count / this.size);
		if (pages < this.page) this.page = pages || 1;
		return pages;
	}

	@computedFrom('page', 'size')
	get offset() {
		return (this.page - 1) * this.size;
	}

	get items() {
		return this._items;
	}

	set items(newItems) {
		this._items = newItems;
	}

	goTo(page) {
		if (page > this.pages) page = this.pages;
		if (page < 1) page = 1;
		this.page = page;
	}

}

export class BufferedPager extends Pager {

	constructor(size = 20, allItems) {
		super(size);
		this.allItems = allItems;
	}

	@computedFrom('offset', 'size', 'allItems')
	get items() {
		this.count = this.allItems.length;
		return Enumerable.from(this.allItems)
			.skip(this.offset)
			.take(this.size)
			.toArray();
	}

	set items(newItems) {
		throw new Error("cannot set items into BufferedItems.");
	}

}