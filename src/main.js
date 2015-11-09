import 'bootstrap';

export function configure(aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.feature('feature-tinymce')
		.plugin('aurelia-bs-modal');

	//Uncomment the line below to enable animation.
	//aurelia.use.plugin('aurelia-animator-css');

	//Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
	//aurelia.use.plugin('aurelia-html-import-template-loader')

	Array.prototype.remove = function(valueOrPredicate) {
		let removeValues = [];
		let predicate = typeof valueOrPredicate == "function"
				? valueOrPredicate
				: value => value === valueOrPredicate;
		for (var i = 0; i < this.length; i++) {
			let value = this[i];
			if (predicate(value)) {
				removeValues.push(value);
				this.splice(i, 1);
				i--;
			}
		}
		return removeValues;
	};

	aurelia.start().then(a => a.setRoot());
}
